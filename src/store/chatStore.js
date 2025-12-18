import { defineStore } from 'pinia';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Types
/**
 * @typedef {Object} Message
 * @property {string|number} id
 * @property {string|number} conversation_id
 * @property {string} message
 * @property {'user'|'transporter'|'admin'} sender_role
 * @property {string} created_at
 * @property {string} [read_at]
 * @property {'sending'|'sent'|'failed'|'retrying'} [status]
 * @property {boolean} [is_temp]
 */

/**
 * @typedef {Object} Conversation
 * @property {string|number} id
 * @property {string|number} [user_id]
 * @property {string|number} [transporter_id]
 * @property {string|number} [delivery_id]
 * @property {string} [last_message_at]
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} [user_name]
 * @property {string} [transporter_name]
 */

// Load from localStorage on store creation
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('chat-master-store');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

// Calculate storage size
const getStorageSize = () => {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    total += key.length + value.length;
  }
  return total;
};

// Compress data if needed
const compressData = (data) => {
  const jsonString = JSON.stringify(data);

  // If data is large, consider compression
  if (jsonString.length > 1000000) { // 1MB
    console.warn('Chat data is large:', (jsonString.length / 1024 / 1024).toFixed(2), 'MB');

    // Simple compression: remove temporary messages older than 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const compressedData = { ...data };

    Object.keys(compressedData.messages).forEach(conversationId => {
      compressedData.messages[conversationId] = compressedData.messages[conversationId].filter(msg => {
        if (!msg.is_temp) return true;
        const msgTime = new Date(msg.created_at);
        return msgTime > oneHourAgo;
      });
    });

    return compressedData;
  }

  return data;
};

const useChatStore = defineStore('chat', {
  state: () => {
    const saved = loadFromLocalStorage();
    return {
      conversations: saved?.conversations || [],
      activeConversationId: saved?.activeConversationId || null,
      activeChatName: saved?.activeChatName || null,
      messages: saved?.messages || {},
      error: null,
      isLoading: false,
      lastSync: saved?.lastSync || null,
      lastMessageSync: saved?.lastMessageSync || {},
      lastConversationSync: saved?.lastConversationSync || null,
      optimisticMessages: saved?.optimisticMessages || {},
      offlineQueue: saved?.offlineQueue || [],
    };
  },

  actions: {
    // SAVE TO LOCALSTORAGE AUTOMATICALLY
    saveToLocalStorage() {
      try {
        const data = compressData({
          conversations: this.conversations,
          activeConversationId: this.activeConversationId,
          activeChatName: this.activeChatName,
          messages: this.messages,
          lastSync: new Date().toISOString(),
          lastMessageSync: this.lastMessageSync,
          lastConversationSync: this.lastConversationSync,
          optimisticMessages: this.optimisticMessages,
          offlineQueue: this.offlineQueue,
        });

        localStorage.setItem('chat-master-store', JSON.stringify(data));
        console.log('💾 Chat data saved to localStorage. Size:',
          (JSON.stringify(data).length / 1024).toFixed(2), 'KB');
      } catch (err) {
        console.error('Failed to save chat data:', err);
        // Try to save at least critical data
        try {
          localStorage.setItem('chat-critical', JSON.stringify({
            activeConversationId: this.activeConversationId,
            lastSync: new Date().toISOString(),
          }));
        } catch (criticalErr) {
          console.error('Failed to save critical data:', criticalErr);
        }
      }
    },

    // CLEAR STORAGE (optional)
    clearStorage() {
      localStorage.removeItem('chat-master-store');
      localStorage.removeItem('chat-critical');
      this.conversations = [];
      this.activeConversationId = null;
      this.activeChatName = null;
      this.messages = {};
      this.lastSync = null;
      this.lastMessageSync = {};
      this.lastConversationSync = null;
      this.optimisticMessages = {};
      this.offlineQueue = [];
    },

    // CREATE CONVERSATION
    async createConversation(deliveryId, transporterId) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User must be logged in to create conversations");
        }

        const res = await axios.post(
          `${API_URL}/conversation`,
          {
            delivery_id: deliveryId,
            transporter_id: transporterId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            timeout: 10000 // 10 second timeout
          }
        );

        // Add to conversations list if not already present
        if (!this.conversations.find(c => c.id === res.data.id)) {
          this.conversations.unshift(res.data);
        }

        this.saveToLocalStorage();
        return res.data;
      } catch (err) {
        this.error = err.response?.data?.error || err.message || "Failed to create conversation";

        // If offline, add to queue
        if (!navigator.onLine) {
          this.offlineQueue.push({
            type: 'create_conversation',
            data: { deliveryId, transporterId },
            timestamp: new Date().toISOString()
          });
          this.saveToLocalStorage();
        }

        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // SEND MESSAGE
    async sendMessage(conversationId, message) {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User must be logged in to send messages");
      }

      if (!conversationId || !message.trim()) {
        throw new Error("Conversation ID and message content are required");
      }

      this.error = null;

      // Check if offline
      if (!navigator.onLine) {
        // Create optimistic message for offline
        const tempId = `temp-offline-${Date.now()}`;
        const tempMessage = {
          id: tempId,
          conversation_id: conversationId,
          message: message.trim(),
          sender_role: this.getUserRole(),
          created_at: new Date().toISOString(),
          is_temp: true,
          status: 'failed',
          offline: true
        };

        this.addOptimisticMessage(conversationId, tempMessage);

        // Add to offline queue
        this.offlineQueue.push({
          type: 'send_message',
          data: { conversationId, message: message.trim() },
          tempId,
          timestamp: new Date().toISOString()
        });

        this.saveToLocalStorage();
        throw new Error("You are offline. Message will be sent when you reconnect.");
      }

      try {
        // Create optimistic message (for immediate display)
        const tempId = `temp-${Date.now()}`;
        const tempMessage = {
          id: tempId,
          conversation_id: conversationId,
          message: message.trim(),
          sender_role: this.getUserRole(),
          created_at: new Date().toISOString(),
          is_temp: true,
          status: 'sending'
        };

        // Add temp message to store immediately
        this.addOptimisticMessage(conversationId, tempMessage);

        // Send to API
        const res = await axios.post(
          `${API_URL}/message`,
          {
            conversation_id: conversationId,
            message: message.trim()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            timeout: 10000 // 10 second timeout
          }
        );

        // Replace temp message with real one
        const index = this.messages[conversationId].findIndex(m => m.id === tempId);
        if (index !== -1) {
          this.messages[conversationId][index] = {
            ...res.data,
            status: 'sent'
          };
        } else {
          this.messages[conversationId].push(res.data);
        }

        // Clear optimistic message
        this.clearOptimisticMessage(tempId);

        // Update conversation's last message
        this.updateConversationLastMessage(conversationId, res.data.created_at);
        this.saveToLocalStorage();

        return res.data;
      } catch (err) {
        // Mark temp message as failed
        const tempIndex = this.messages[conversationId]?.findIndex(m => m.id?.startsWith('temp-'));
        if (tempIndex !== -1) {
          this.updateMessageStatus(conversationId, this.messages[conversationId][tempIndex].id, 'failed');
        }

        this.error = err.response?.data?.error || err.message || "Failed to send message";

        // If network error, add to offline queue
        if (err.code === 'ERR_NETWORK' || err.message.includes('Network')) {
          this.offlineQueue.push({
            type: 'send_message',
            data: { conversationId, message: message.trim() },
            tempId: this.messages[conversationId][tempIndex]?.id,
            timestamp: new Date().toISOString()
          });
          this.saveToLocalStorage();
        }

        throw err;
      }
    },

    // PROCESS OFFLINE QUEUE
    async processOfflineQueue() {
      if (this.offlineQueue.length === 0 || !navigator.onLine) return;

      const queueCopy = [...this.offlineQueue];
      const successfulItems = [];

      for (const item of queueCopy) {
        try {
          if (item.type === 'send_message') {
            await this.retryFailedMessage(item.data.conversationId, item.tempId);
            successfulItems.push(item);
          } else if (item.type === 'create_conversation') {
            await this.createConversation(item.data.deliveryId, item.data.transporterId);
            successfulItems.push(item);
          }
        } catch (err) {
          console.error(`Failed to process offline item:`, err);
          // Keep failed items in queue for next retry
        }
      }

      // Remove successful items from queue
      this.offlineQueue = this.offlineQueue.filter(item =>
        !successfulItems.some(success => success.tempId === item.tempId)
      );

      if (successfulItems.length > 0) {
        this.saveToLocalStorage();
      }
    },

    // ADD OPTIMISTIC MESSAGE
    addOptimisticMessage(conversationId, message) {
      if (!this.messages[conversationId]) {
        this.messages[conversationId] = [];
      }

      // Don't add duplicate messages
      const exists = this.messages[conversationId].some(m => m.id === message.id);
      if (!exists) {
        this.messages[conversationId].push(message);
      }

      if (!this.optimisticMessages[conversationId]) {
        this.optimisticMessages[conversationId] = [];
      }

      if (!this.optimisticMessages[conversationId].includes(message.id)) {
        this.optimisticMessages[conversationId].push(message.id);
      }

      this.saveToLocalStorage();
    },

    // CLEAR OPTIMISTIC MESSAGE
    clearOptimisticMessage(messageId) {
      Object.keys(this.optimisticMessages).forEach(convId => {
        this.optimisticMessages[convId] = this.optimisticMessages[convId].filter(id => id !== messageId);
        if (this.optimisticMessages[convId].length === 0) {
          delete this.optimisticMessages[convId];
        }
      });
    },

    // UPDATE MESSAGE STATUS
    updateMessageStatus(conversationId, messageId, status) {
      const messages = this.messages[conversationId];
      if (messages) {
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          messages[messageIndex].status = status;
          this.saveToLocalStorage();
        }
      }
    },

    // RETRY FAILED MESSAGE
    async retryFailedMessage(conversationId, tempMessageId) {
      const tempMessage = this.messages[conversationId]?.find(m => m.id === tempMessageId);
      if (!tempMessage) {
        throw new Error("Message not found");
      }

      this.error = null;

      try {
        // Mark as retrying
        this.updateMessageStatus(conversationId, tempMessageId, 'retrying');

        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${API_URL}/message`,
          {
            conversation_id: conversationId,
            message: tempMessage.message
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            timeout: 10000
          }
        );

        // Replace temp message with real one
        const index = this.messages[conversationId].findIndex(m => m.id === tempMessageId);
        if (index !== -1) {
          this.messages[conversationId][index] = {
            ...res.data,
            status: 'sent'
          };
        }

        this.clearOptimisticMessage(tempMessageId);

        // Update conversation's last message
        this.updateConversationLastMessage(conversationId, res.data.created_at);

        // Remove from offline queue
        this.offlineQueue = this.offlineQueue.filter(item =>
          !(item.type === 'send_message' && item.tempId === tempMessageId)
        );

        this.saveToLocalStorage();
        return res.data;
      } catch (err) {
        this.updateMessageStatus(conversationId, tempMessageId, 'failed');
        this.error = err.response?.data?.error || err.message || "Failed to retry message";
        throw err;
      }
    },

    // RETRY ALL FAILED MESSAGES
    async retryAllFailedMessages() {
      const failedMessages = [];

      Object.keys(this.messages).forEach(conversationId => {
        this.messages[conversationId].forEach(msg => {
          if (msg.status === 'failed' && msg.is_temp) {
            failedMessages.push({ conversationId, messageId: msg.id });
          }
        });
      });

      const results = [];
      for (const { conversationId, messageId } of failedMessages) {
        try {
          const result = await this.retryFailedMessage(conversationId, messageId);
          results.push({ success: true, messageId, result });
        } catch (err) {
          results.push({ success: false, messageId, error: err.message });
        }
      }

      await this.processOfflineQueue();
      return results;
    },

    // GET MESSAGES WITH INCREMENTAL UPDATES
    async getMessages(conversationId, forceRefresh = false) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        // Get last message timestamp for incremental updates
        const lastSync = this.lastMessageSync[conversationId];
        let url = `${API_URL}/message/${conversationId}`;

        if (!forceRefresh && lastSync) {
          url += `?since=${lastSync}`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          timeout: 10000
        });

        // Initialize messages array if it doesn't exist
        if (!this.messages[conversationId]) {
          this.messages[conversationId] = [];
        }

        if (forceRefresh) {
          // Replace all messages (but keep optimistic ones)
          const optimisticMsgs = this.messages[conversationId].filter(m => m.is_temp);
          this.messages[conversationId] = [
            ...res.data.sort((a, b) =>
              new Date(a.created_at) - new Date(b.created_at)
            ),
            ...optimisticMsgs
          ];
        } else {
          // Merge new messages with existing
          const existingIds = new Set(this.messages[conversationId].map(m => m.id));
          const newMessages = res.data.filter(msg => !existingIds.has(msg.id));

          this.messages[conversationId] = [
            ...this.messages[conversationId],
            ...newMessages
          ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }

        // Update last sync timestamp
        if (res.data.length > 0) {
          const latestTimestamp = res.data[res.data.length - 1].created_at;
          this.lastMessageSync[conversationId] = latestTimestamp;
        }

        this.saveToLocalStorage();
        return this.messages[conversationId];
      } catch (err) {
        this.error = err.response?.data?.error || err.message || "Failed to load messages";
        // Return cached messages if available
        return this.messages[conversationId] || [];
      } finally {
        this.isLoading = false;
      }
    },

    // CHECK FOR NEW MESSAGES (lightweight version for auto-reload)
    async checkForNewMessages(conversationId) {
      if (!conversationId) return false;

      try {
        const token = localStorage.getItem("token");
        if (!token) return false;

        const lastSync = this.lastMessageSync[conversationId];

        if (!lastSync) {
          // If no last sync, do a full refresh
          await this.getMessages(conversationId);
          return true;
        }

        const res = await axios.get(
          `${API_URL}/message/${conversationId}?since=${lastSync}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 5000 // Faster timeout for auto-reload
          }
        );

        if (res.data.length === 0) return false;

        // Add new messages
        if (!this.messages[conversationId]) {
          this.messages[conversationId] = [];
        }

        const existingIds = new Set(this.messages[conversationId].map(m => m.id));
        const newMessages = res.data.filter(msg => !existingIds.has(msg.id));

        if (newMessages.length === 0) return false;

        this.messages[conversationId] = [
          ...this.messages[conversationId],
          ...newMessages
        ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        // Update last sync timestamp
        const latestTimestamp = newMessages[newMessages.length - 1].created_at;
        this.lastMessageSync[conversationId] = latestTimestamp;

        this.saveToLocalStorage();
        return true; // New messages found
      } catch (err) {
        console.error('Error checking for new messages:', err);
        return false;
      }
    },

    // GET CONVERSATIONS
    async getMyConversations() {
      this.isLoading = true;
      this.error = null;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required");
        }

        const lastSync = this.lastConversationSync;
        let url = `${API_URL}/conversations`;

        if (lastSync) {
          url += `?since=${lastSync}`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          timeout: 10000
        });

        // Update conversations list
        const newConversations = res.data || [];

        if (newConversations.length === 0) {
          this.lastConversationSync = new Date().toISOString();
          return this.conversations;
        }

        // Merge with existing conversations
        const existingMap = new Map(this.conversations.map(c => [c.id, c]));
        let hasUpdates = false;

        newConversations.forEach(conv => {
          if (existingMap.has(conv.id)) {
            // Update existing - check if there are actual changes
            const existing = existingMap.get(conv.id);
            const lastMessageChanged =
              new Date(conv.last_message_at || conv.created_at) >
              new Date(existing.last_message_at || existing.created_at);

            if (lastMessageChanged) {
              Object.assign(existing, conv);
              hasUpdates = true;
            }
          } else {
            // Add new
            this.conversations.push(conv);
            hasUpdates = true;
          }
        });

        // Sort by last message
        if (hasUpdates) {
          this.conversations.sort((a, b) => {
            const timeA = a.last_message_at || a.created_at;
            const timeB = b.last_message_at || b.created_at;
            return new Date(timeB) - new Date(timeA);
          });
        }

        this.lastConversationSync = new Date().toISOString();
        this.saveToLocalStorage();
        return this.conversations;
      } catch (err) {
        this.error = err.response?.data?.error || err.message || "Failed to load conversations";
        // Return cached conversations
        return this.conversations;
      } finally {
        this.isLoading = false;
      }
    },

    // CHECK FOR NEW CONVERSATIONS (lightweight version)
    async checkForNewConversations() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return false;

        const lastSync = this.lastConversationSync;

        if (!lastSync) {
          // If no last sync, do a full refresh
          await this.getMyConversations();
          return true;
        }

        const res = await axios.get(
          `${API_URL}/conversations?since=${lastSync}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 5000
          }
        );

        const newConversations = res.data || [];
        if (newConversations.length === 0) return false;

        let hasUpdates = false;
        const existingMap = new Map(this.conversations.map(c => [c.id, c]));

        newConversations.forEach(conv => {
          if (!existingMap.has(conv.id)) {
            // Add new conversation
            this.conversations.push(conv);
            hasUpdates = true;
          }
        });

        if (hasUpdates) {
          // Sort by last message
          this.conversations.sort((a, b) => {
            const timeA = a.last_message_at || a.created_at;
            const timeB = b.last_message_at || b.created_at;
            return new Date(timeB) - new Date(timeA);
          });

          this.lastConversationSync = new Date().toISOString();
          this.saveToLocalStorage();
          return true;
        }

        return false;
      } catch (err) {
        console.error('Error checking for new conversations:', err);
        return false;
      }
    },

    // SET ACTIVE CONVERSATION
    setActiveConversation(conversationId, chatName) {
      this.activeConversationId = conversationId;
      this.activeChatName = chatName;
      this.saveToLocalStorage();

      // Mark messages as read
      this.markMessagesAsRead(conversationId);
    },

    // MARK MESSAGES AS READ
    markMessagesAsRead(conversationId) {
      if (this.messages[conversationId]) {
        const userRole = this.getUserRole();
        let hasChanges = false;

        this.messages[conversationId].forEach(msg => {
          if (msg.sender_role !== userRole && !msg.read_at) {
            msg.read_at = new Date().toISOString();
            hasChanges = true;
          }
        });

        if (hasChanges) {
          this.saveToLocalStorage();
        }
      }
    },

    // UPDATE CONVERSATION LAST MESSAGE
    updateConversationLastMessage(conversationId, timestamp) {
      const conversation = this.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.last_message_at = timestamp;
        conversation.updated_at = new Date().toISOString();
        this.saveToLocalStorage();
      }
    },

    // GET USER ROLE FROM TOKEN
    getUserRole() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(atob(base64));
          return payload.role || "user";
        }
      } catch {
        return "user";
      }
      return "user";
    },

    // GET USER INFO FROM TOKEN
    getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(atob(base64));
          return {
            id: payload.id,
            role: payload.role,
            name: payload.name || payload.username,
            email: payload.email
          };
        }
      } catch {
        return null;
      }
      return null;
    },

    // SYNC WITH SERVER (optional - for periodic sync)
    async syncWithServer() {
      try {
        await this.getMyConversations();
        if (this.activeConversationId) {
          await this.getMessages(this.activeConversationId, true);
        }
        await this.processOfflineQueue();
        this.lastSync = new Date().toISOString();
        this.saveToLocalStorage();
        return true;
      } catch (err) {
        console.error('Sync failed:', err);
        return false;
      }
    },

    // CLEANUP OLD TEMP MESSAGES (called periodically)
    cleanupOldTempMessages() {
      const cutoffTime = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
      let cleanedCount = 0;

      Object.keys(this.messages).forEach(conversationId => {
        const originalLength = this.messages[conversationId].length;
        this.messages[conversationId] = this.messages[conversationId].filter(msg => {
          // Keep messages that are not temp, or temp messages created recently
          if (!msg.is_temp) return true;
          if (!msg.created_at) return false;

          const msgTime = new Date(msg.created_at);
          return msgTime > cutoffTime;
        });

        cleanedCount += originalLength - this.messages[conversationId].length;

        if (this.messages[conversationId].length !== originalLength) {
          // Update optimistic messages list
          if (this.optimisticMessages[conversationId]) {
            this.optimisticMessages[conversationId] = this.optimisticMessages[conversationId]
              .filter(id => this.messages[conversationId].some(m => m.id === id));

            if (this.optimisticMessages[conversationId].length === 0) {
              delete this.optimisticMessages[conversationId];
            }
          }
        }
      });

      // Clean old offline queue items
      const queueCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      const originalQueueLength = this.offlineQueue.length;
      this.offlineQueue = this.offlineQueue.filter(item =>
        new Date(item.timestamp) > queueCutoff
      );
      cleanedCount += originalQueueLength - this.offlineQueue.length;

      if (cleanedCount > 0) {
        console.log(`🧹 Cleaned ${cleanedCount} old temporary items`);
        this.saveToLocalStorage();
      }

      return cleanedCount;
    },

    // CLEANUP OLD DATA
    cleanupOldData(maxAgeDays = 30) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - maxAgeDays);
      let cleanedCount = 0;

      // Clean old conversations without messages
      const activeConversationIds = new Set(Object.keys(this.messages));
      const originalConversationCount = this.conversations.length;

      this.conversations = this.conversations.filter(conv => {
        // Keep if it has messages or is active
        if (activeConversationIds.has(conv.id.toString()) ||
          conv.id === this.activeConversationId) {
          return true;
        }
        // Keep if recent
        const convTime = new Date(conv.updated_at || conv.created_at);
        return convTime > cutoff;
      });

      cleanedCount += originalConversationCount - this.conversations.length;

      // Clean old messages
      Object.keys(this.messages).forEach(conversationId => {
        const originalLength = this.messages[conversationId].length;
        this.messages[conversationId] = this.messages[conversationId].filter(msg => {
          const msgTime = new Date(msg.created_at);
          return msgTime > cutoff;
        });
        cleanedCount += originalLength - this.messages[conversationId].length;
      });

      if (cleanedCount > 0) {
        console.log(`🗑️ Cleaned ${cleanedCount} old items (older than ${maxAgeDays} days)`);
        this.saveToLocalStorage();
      }

      return cleanedCount;
    },

    // GET STORAGE STATS
    getStorageStats() {
      const stats = {
        conversations: this.conversations.length,
        totalMessages: Object.keys(this.messages).reduce((sum, key) =>
          sum + (this.messages[key]?.length || 0), 0
        ),
        activeConversation: this.activeConversationId,
        offlineQueue: this.offlineQueue.length,
        optimisticMessages: Object.keys(this.optimisticMessages).reduce((sum, key) =>
          sum + this.optimisticMessages[key].length, 0
        ),
        lastSync: this.lastSync,
        localStorageSize: getStorageSize()
      };

      return stats;
    }
  },

  getters: {
    // Get unread count for a conversation
    unreadCount: (state) => (conversationId) => {
      const messages = state.messages[conversationId] || [];
      const userRole = state.getUserRole ? state.getUserRole() : 'user';
      return messages.filter(msg =>
        msg.sender_role !== userRole &&
        !msg.read_at &&
        !msg.is_temp // Don't count temp messages
      ).length;
    },

    // Get last message preview
    lastMessagePreview: (state) => (conversationId) => {
      const messages = state.messages[conversationId];
      if (!messages || messages.length === 0) return "No messages yet";

      // Get last non-temp message
      const nonTempMessages = messages.filter(m => !m.is_temp);
      if (nonTempMessages.length === 0) return "No messages yet";

      const lastMsg = nonTempMessages[nonTempMessages.length - 1];
      const preview = lastMsg.message.length > 30
        ? lastMsg.message.substring(0, 30) + '...'
        : lastMsg.message;

      const userRole = state.getUserRole ? state.getUserRole() : 'user';
      const prefix = lastMsg.sender_role === userRole ? 'You: ' : '';

      return `${prefix}${preview}`;
    },

    // Get active conversation messages
    activeMessages: (state) => {
      if (!state.activeConversationId) return [];
      return state.messages[state.activeConversationId] || [];
    },

    // Check if there are any optimistic messages
    hasOptimisticMessages: (state) => (conversationId) => {
      if (!conversationId) return false;
      return state.optimisticMessages[conversationId]?.length > 0 || false;
    },

    // Check for failed messages in conversation
    hasFailedMessagesInConversation: (state) => (conversationId) => {
      const messages = state.messages[conversationId] || [];
      return messages.some(msg => msg.status === 'failed' && msg.is_temp);
    },

    // Check for any failed messages
    hasFailedMessages: (state) => {
      return Object.keys(state.messages).some(convId =>
        state.messages[convId].some(msg => msg.status === 'failed' && msg.is_temp)
      );
    },

    // Get conversation by ID
    getConversationById: (state) => (conversationId) => {
      return state.conversations.find(c => c.id === conversationId);
    },

    // Get all failed messages
    getAllFailedMessages: (state) => {
      const failedMessages = [];
      Object.keys(state.messages).forEach(conversationId => {
        state.messages[conversationId].forEach(msg => {
          if (msg.status === 'failed' && msg.is_temp) {
            failedMessages.push({
              ...msg,
              conversationId,
              conversationName: state.getConversationById(conversationId)?.name
            });
          }
        });
      });
      return failedMessages;
    }
  }
});

export default useChatStore;
<template>
  <div class="flex h-screen pt-[4.5rem] justify-between">
    <!-- Sidebar -->
    <div class="w-[25%] bg-white border-r border-gray-200 flex flex-col h-full">
      <div class="flex justify-between p-4 border-b">
        <div class="flex items-center gap-2">
          <p class="font-semibold text-lg">Chat</p>
          <!-- <span class="network-status text-xs px-2 py-1 rounded"
            :class="isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ isOnline ? 'Online' : 'Offline' }}
          </span> -->
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="refreshAll"
            class="p-1 hover:bg-gray-100 rounded transition-colors"
            :disabled="isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            title="Refresh"
          >
            <svg class="w-5 h-5" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <img src="../../assets/icon/chaticon2.svg" alt="chat icon" class="w-6 h-6" />
        </div>
      </div>

      <!-- Conversations -->
      <div class="flex-1 overflow-y-auto">
        <!-- Retry failed messages button -->
        <div v-if="hasFailedMessages" class="p-3 border-b bg-red-50">
          <button 
            @click="retryAllFailedMessages"
            class="w-full flex items-center justify-center gap-2 text-red-700 hover:text-red-800 text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry failed messages
          </button>
        </div>

        <!-- Conversations list -->
        <div 
          v-for="conversation in conversations" 
          :key="conversation.id"
          @click="selectConversation(conversation)"
          class="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
          :class="{ 
            'bg-red-50 border-r-4 border-r-red-600': conversation.id === activeConversationId 
          }"
        >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span class="text-red-700 font-bold">
                {{ getInitials(getConversationName(conversation)) }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <p class="font-semibold text-black truncate">
                  {{ getConversationName(conversation) }}
                </p>
                <span class="text-xs text-gray-400 whitespace-nowrap ml-2">
                  {{ formatTime(conversation.last_message_at || conversation.created_at) }}
                </span>
              </div>
              <p class="text-sm text-gray-500 truncate mt-1">
                {{ chatStore.lastMessagePreview(conversation.id) }}
              </p>
            </div>
            <div class="flex items-center gap-1">
              <span 
                v-if="chatStore.unreadCount(conversation.id) > 0"
                class="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0"
              >
                {{ chatStore.unreadCount(conversation.id) }}
              </span>
              <span 
                v-if="chatStore.hasFailedMessagesInConversation(conversation.id)"
                class="text-red-500 text-xs"
                title="Failed messages"
              >
                ⚠
              </span>
            </div>
          </div>
        </div>
        
        <!-- Empty state -->
        <div v-if="conversations.length === 0 && !isLoading" class="p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-gray-400 text-2xl">💬</span>
          </div>
          <p class="text-gray-500">No conversations yet</p>
          <button 
            @click="refreshAll"
            class="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Refresh
          </button>
        </div>
        
        <!-- Loading state -->
        <div v-if="isLoading && conversations.length === 0" class="p-8 text-center">
          <div class="animate-pulse space-y-4">
            <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
      
      <!-- Storage info -->
      <!-- <div class="p-3 border-t text-xs text-gray-400 bg-gray-50">
        <div class="flex justify-between items-center">
          <span>Auto-saved</span>
          <span>{{ formatLastSync() }}</span>
        </div>
        <div v-if="storageUsage" class="mt-1">
          <div class="w-full bg-gray-200 rounded-full h-1">
            <div 
              class="bg-red-600 h-1 rounded-full transition-all duration-300"
              :style="{ width: storageUsage.percentage + '%' }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 mt-1 text-right">
            {{ storageUsage.used }}/{{ storageUsage.total }}
          </div>
        </div>
      </div> -->
    </div>

    <!-- Chat Area -->
    <div class="w-[74%] flex flex-col h-full">
      <!-- Chat Header -->
      <div v-if="activeConversation" class="p-4 border-b bg-white sticky top-0 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <span class="text-red-700 font-bold">
                {{ getInitials(transporterName) }}
              </span>
            </div>
            <div>
              <p class="font-semibold text-lg">{{ transporterName }}</p>
              <p class="text-sm text-gray-500 flex items-center">
                <!-- <span :class="[
                  'w-2 h-2 rounded-full mr-2',
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                ]"></span>
                {{ isOnline ? 'Online' : 'Offline' }} • {{ messages.length }} messages
                <span v-if="failedMessagesCount > 0" class="ml-2 text-red-500 text-xs">
                  ({{ failedMessagesCount }} failed)
                </span> -->
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="toggleNotifications"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              :class="{ 'text-red-600': notificationsEnabled }"
              :title="notificationsEnabled ? 'Notifications ON' : 'Notifications OFF'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button 
              @click="refreshMessages"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              :disabled="isLoading"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
              title="Refresh messages"
            >
              <svg class="w-5 h-5" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex items-center justify-center h-full bg-gray-50">
        <div class="text-center p-8">
          <div class="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-gray-400 text-3xl">👋</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Welcome to Chat</h3>
          <p class="text-gray-500 max-w-md mb-6">
            Select a conversation from the sidebar to start chatting.
            Your messages are automatically saved and will remain even after page refresh.
          </p>
          <div class="flex flex-col gap-2 text-sm text-gray-600">
            <div class="flex items-center justify-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Online: Real-time messaging</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <span class="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Offline: Messages saved locally</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-if="activeConversation" ref="messageBox" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <!-- Connection status banner -->
        <!-- <div v-if="!isOnline" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span class="text-sm text-yellow-700">You're offline. Messages will be sent when you reconnect.</span>
            </div>
            <button 
              @click="retryAllFailedMessages"
              v-if="failedMessagesCount > 0"
              class="text-sm text-yellow-700 hover:text-yellow-800 font-medium"
            >
              Retry all
            </button>
          </div>
        </div> -->

        <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="w-16 h-16 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-gray-400 text-2xl">💭</span>
            </div>
            <p class="text-gray-500">No messages yet</p>
            <p class="text-sm text-gray-400 mt-1">Start the conversation!</p>
          </div>
        </div>
        
        <div v-else>
          <!-- Messages -->
          <div 
            v-for="(msg, index) in messages" 
            :key="msg.id"
            class="mb-4 transition-all duration-200"
            :class="[
              msg.sender_role === myRole ? 'text-right' : 'text-left',
              msg.is_temp ? 'opacity-70' : ''
            ]"
          >
            <!-- Date separator -->
            <div v-if="shouldShowDateSeparator(msg, index)" class="text-center my-6">
              <span class="inline-block bg-gray-200 text-gray-600 text-xs px-4 py-1 rounded-full">
                {{ formatDate(msg.created_at) }}
              </span>
            </div>
            
            <!-- Message bubble -->
            <div class="inline-block max-w-[70%] relative">
              <!-- Retry button for failed messages -->
              <div v-if="msg.status === 'failed'" class="absolute -top-6 left-0 right-0 text-center">
                <button 
                  @click="retryFailedMessage(msg)"
                  class="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 bg-red-50 px-2 py-1 rounded-full"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              </div>
              
              <!-- Sender name (for others) -->
              <div v-if="msg.sender_role !== myRole" class="text-left mb-1">
                <span class="text-xs font-medium text-gray-600">
                  {{ getSenderName(msg) }}
                </span>
              </div>
              
              <!-- Message content -->
              <div 
                class="rounded-2xl px-4 py-3 inline-block transition-all duration-200"
                :class="[
                  msg.sender_role === myRole 
                    ? 'bg-red-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 rounded-bl-none',
                  msg.status === 'failed' ? 'border-red-300' : '',
                  msg.status === 'sending' ? 'opacity-80' : ''
                ]"
              >
                <p class="text-sm break-words whitespace-pre-wrap">{{ msg.message }}</p>
                <!-- Message status -->
                <div v-if="msg.sender_role === myRole" class="text-right mt-1">
                  <span class="text-xs opacity-75">
                    {{ formatTime(msg.created_at) }}
                    <span v-if="msg.status === 'sending'" class="ml-1 animate-pulse">🔄</span>
                    <span v-else-if="msg.status === 'failed'" class="ml-1 text-red-300">✗</span>
                    <span v-else-if="msg.status === 'retrying'" class="ml-1 animate-spin">↻</span>
                    <span v-else-if="msg.status === 'sent'" class="ml-1">✓</span>
                  </span>
                </div>
                <div v-else class="text-left mt-1">
                  <span class="text-xs text-gray-400">
                    {{ formatTime(msg.created_at) }}
                    <span v-if="msg.read_at" class="ml-1 text-blue-400">✓✓</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
            <div class="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div v-if="activeConversation" class="p-4 border-t bg-white">
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            @keyup.enter="sendMessage"
            @input="handleTyping"
            :disabled="isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          />
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim() || isLoading"
            class="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transform hover:scale-105 active:scale-95"
            title="Send message"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-2 text-center animate-pulse">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import useChatStore from "../../store/chatStore";

const chatStore = useChatStore();
const newMessage = ref("");
const messageBox = ref(null);
const myRole = ref("user");
const user = ref(null);
const isTyping = ref(false);
const error = ref("");
const isLoading = ref(false);
const notificationsEnabled = ref(false);

// Auto-reload variables
const autoReloadInterval = ref(null);
const isWindowActive = ref(true);
const isOnline = ref(navigator.onLine);
const lastAutoReloadTime = ref(0);
const reloadTimeout = ref(null);
const storageUsage = ref(null);

// AUTO-SAVE EVERYTHING
const saveEverything = () => {
  chatStore.saveToLocalStorage();
  updateStorageUsage();
};

// Initialize user
const initializeUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      // Proper JWT decoding
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      
      myRole.value = payload.role || "user";
      user.value = {
        id: payload.id,
        role: payload.role,
        name: payload.name || payload.username,
        email: payload.email
      };
    } catch (err) {
      console.error("Invalid token format", err);
      // Clear invalid token
      localStorage.removeItem("token");
    }
  }
};

// Computed properties
const conversations = computed(() => chatStore.conversations);
const activeConversationId = computed(() => chatStore.activeConversationId);
const activeConversation = computed(() => 
  conversations.value.find(c => c.id === activeConversationId.value)
);
const messages = computed(() => {
  if (!activeConversationId.value) return [];
  const msgs = chatStore.messages[activeConversationId.value] || [];
  return msgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
});
const transporterName = computed(() => chatStore.activeChatName || "User");
const hasFailedMessages = computed(() => {
  return Object.keys(chatStore.messages).some(convId =>
    chatStore.messages[convId].some(msg => msg.status === 'failed')
  );
});
const failedMessagesCount = computed(() => {
  if (!activeConversationId.value) return 0;
  const convMessages = chatStore.messages[activeConversationId.value] || [];
  return convMessages.filter(msg => msg.status === 'failed').length;
});

// Auto-reload function
const autoReloadMessages = async () => {
  // Clear any existing timeout
  if (reloadTimeout.value) {
    clearTimeout(reloadTimeout.value);
  }
  
  // Debounce to prevent too many calls
  reloadTimeout.value = setTimeout(async () => {
    const now = Date.now();
    
    // Enhanced rate limiting
    const minTimeBetweenCalls = 2000; // 2 seconds minimum
    const timeSinceLastCall = now - lastAutoReloadTime.value;
    
    if (!isWindowActive.value || 
        !isOnline.value || 
        isLoading.value || 
        timeSinceLastCall < minTimeBetweenCalls) {
      return;
    }
    
    lastAutoReloadTime.value = now;
    
    try {
      // Check for new messages
      if (activeConversationId.value) {
        const hasNewMessages = await chatStore.checkForNewMessages(activeConversationId.value);
        
        if (hasNewMessages) {
          // Update UI immediately
          saveEverything();
          scrollToBottom();
          
          // Play notification sound or show badge
          if (document.hidden && notificationsEnabled.value) {
            // Browser notification
            if (Notification.permission === 'granted') {
              new Notification('New Message', {
                body: `New message from ${transporterName.value}`,
                icon: '../../assets/icon/chaticon2.svg',
                tag: 'chat-message'
              });
            } else if (Notification.permission === 'default') {
              Notification.requestPermission();
            }
          }
        }
      }
      
      // Less frequent conversation checks
      const shouldCheckConversations = now % 45000 < 3000; // ~45 seconds
      if (shouldCheckConversations) {
        await chatStore.checkForNewConversations();
        saveEverything();
      }
    } catch (err) {
      console.error("Auto-reload error:", err);
      // If error persists, increase retry delay
      if (timeSinceLastCall < 60000) { // 1 minute
        lastAutoReloadTime.value = now - 30000; // Retry in 30 seconds
      }
    }
  }, 500); // 500ms debounce
};

// Watch for active conversation changes
watch(activeConversationId, (newId) => {
  if (newId) {
    // When conversation changes, immediately check for new messages
    autoReloadMessages();
  }
});

// Setup auto-reload interval
const setupAutoReload = () => {
  // Clear any existing interval
  if (autoReloadInterval.value) {
    clearInterval(autoReloadInterval.value);
  }
  
  // Set up new interval for auto-reload
  autoReloadInterval.value = setInterval(autoReloadMessages, 3000);
  
  // Cleanup old temp messages periodically (every 5 minutes)
  const cleanupInterval = setInterval(() => {
    chatStore.cleanupOldTempMessages();
    saveEverything();
  }, 5 * 60 * 1000);
  
  // Storage usage check (every minute)
  const storageCheckInterval = setInterval(updateStorageUsage, 60000);
  
  return () => {
    if (autoReloadInterval.value) {
      clearInterval(autoReloadInterval.value);
    }
    if (cleanupInterval) {
      clearInterval(cleanupInterval);
    }
    if (storageCheckInterval) {
      clearInterval(storageCheckInterval);
    }
  };
};

// Update storage usage
const updateStorageUsage = () => {
  try {
    let total = 0;
    let used = 0;
    
    // Calculate localStorage usage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      used += key.length + value.length;
    }
    
    // Convert to human readable format
    const formatBytes = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    storageUsage.value = {
      used: formatBytes(used),
      total: '5 MB', // localStorage limit
      percentage: Math.min((used / (5 * 1024 * 1024)) * 100, 100)
    };
  } catch (err) {
    console.error('Failed to calculate storage usage:', err);
  }
};

// Setup window visibility and online status tracking
const setupEventListeners = () => {
  // Track window visibility
  const handleVisibilityChange = () => {
    isWindowActive.value = !document.hidden;
    if (isWindowActive.value) {
      // When user comes back to tab, immediately check for new messages
      autoReloadMessages();
    }
  };
  
  // Track online status
  const handleOnline = async () => {
    isOnline.value = true;
    console.log("Back online - refreshing data...");
    // When coming back online, refresh everything
    await refreshAll();
    // Retry any failed messages
    await chatStore.retryAllFailedMessages();
  };
  
  const handleOffline = () => {
    isOnline.value = false;
    console.log("Went offline - pausing auto-reload");
  };
  
  // Network status indicator
  const updateNetworkStatus = () => {
    const statusEl = document.querySelector('.network-status');
    if (statusEl) {
      statusEl.textContent = isOnline.value ? 'Online' : 'Offline';
      statusEl.className = `network-status text-xs px-2 py-1 rounded ${isOnline.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    }
  };
  
  // Request notification permission
  const setupNotifications = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        notificationsEnabled.value = permission === 'granted';
      });
    } else if (Notification.permission === 'granted') {
      notificationsEnabled.value = true;
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('online', () => {
    handleOnline();
    updateNetworkStatus();
  });
  window.addEventListener('offline', () => {
    handleOffline();
    updateNetworkStatus();
  });
  
  // Initial setup
  updateNetworkStatus();
  setupNotifications();
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Toggle notifications
const toggleNotifications = () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications');
    return;
  }
  
  if (Notification.permission === 'granted') {
    notificationsEnabled.value = !notificationsEnabled.value;
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      notificationsEnabled.value = permission === 'granted';
    });
  }
};

// Connection health check
const checkConnectionHealth = async () => {
  try {
    // First check browser's online status
    if (!navigator.onLine) {
      isOnline.value = false;
      return false;
    }
    
    // Try a lightweight ping to server
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    // Try multiple endpoints in sequence
    const endpoints = [
      `${import.meta.env.VITE_API_URL || 'http://localhost:5173'}/health`,
      `${import.meta.env.VITE_API_URL || 'http://localhost:5173'}/`,
      'https://www.google.com/favicon.ico' // Fallback to test internet connection
    ];
    
    let isConnected = false;
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
          method: 'HEAD',
          cache: 'no-cache'
        });
        
        if (response.ok) {
          isConnected = true;
          break;
        }
      } catch {
        continue; // Try next endpoint
      }
    }
    
    clearTimeout(timeoutId);
    isOnline.value = isConnected;
    return isConnected;
  } catch {
    isOnline.value = false;
    return false;
  }
};

// Enhanced refresh functions
const refreshMessages = async () => {
  if (!activeConversationId.value) return;
  
  isLoading.value = true;
  try {
    await chatStore.getMessages(activeConversationId.value, true);
    saveEverything();
    scrollToBottom();
    console.log("Manual refresh completed");
  } catch (err) {
    error.value = "Failed to refresh messages";
    setTimeout(() => error.value = "", 3000);
  } finally {
    isLoading.value = false;
  }
};

const refreshAll = async () => {
  isLoading.value = true;
  try {
    await chatStore.getMyConversations();
    if (activeConversationId.value) {
      await chatStore.getMessages(activeConversationId.value, true);
    }
    saveEverything();
    console.log("Full refresh completed");
  } catch (err) {
    error.value = "Failed to refresh";
    setTimeout(() => error.value = "", 3000);
  } finally {
    isLoading.value = false;
  }
};

// Error handling wrapper
const safeApiCall = async (fn, context) => {
  try {
    return await fn();
  } catch (err) {
    console.error(`Error in ${context}:`, err);
    error.value = `Error: ${err.message || 'Something went wrong'}`;
    
    // Save current state before error
    saveEverything();
    
    // Auto-retry for network errors
    if (err.message.includes('Network') || err.message.includes('Failed to fetch')) {
      setTimeout(() => {
        if (context === 'sendMessage') {
          sendMessage();
        } else if (context === 'refresh') {
          refreshAll();
        }
      }, 3000);
    }
    
    // Clear error after 5 seconds
    setTimeout(() => {
      error.value = "";
    }, 5000);
    
    throw err;
  }
};

// Send message
const sendMessage = async () => {
  if (!newMessage.value.trim() || !activeConversationId.value || isLoading.value) return;
  
  error.value = "";
  isLoading.value = true;
  const messageText = newMessage.value.trim();
  newMessage.value = "";
  
  await safeApiCall(async () => {
    await chatStore.sendMessage(activeConversationId.value, messageText);
    saveEverything();
    scrollToBottom();
  }, 'sendMessage').finally(() => {
    isLoading.value = false;
  });
};

// Retry failed message
const retryFailedMessage = async (msg) => {
  if (!msg.is_temp) return;
  
  isLoading.value = true;
  try {
    await chatStore.retryFailedMessage(activeConversationId.value, msg.id);
    saveEverything();
  } catch (err) {
    error.value = "Failed to retry message";
    setTimeout(() => error.value = "", 3000);
  } finally {
    isLoading.value = false;
  }
};

// Retry all failed messages
const retryAllFailedMessages = async () => {
  isLoading.value = true;
  try {
    await chatStore.retryAllFailedMessages();
    saveEverything();
  } catch (err) {
    error.value = "Failed to retry messages";
    setTimeout(() => error.value = "", 3000);
  } finally {
    isLoading.value = false;
  }
};

// Select conversation
const selectConversation = (conversation) => {
  const chatName = getConversationName(conversation);
  chatStore.setActiveConversation(conversation.id, chatName);
  scrollToBottom();
};

// Helper functions
const getInitials = (name) => {
  if (!name) return "??";
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getConversationName = (conversation) => {
  if (!conversation) return "Unknown";
  if (user.value?.role === "user") {
    return conversations?.createdeliveries?.transporter_name || "Transporter";
  }
  return conversations?.createdeliveries?.username || "Customer";
};

const getSenderName = (msg) => {
  if (msg.sender_role === "user") {
    return msg.conversations?.createdeliveries?.username || "Customer";
  }
  return msg.conversations?.createdeliveries?.transporter_name || "Transporter";
};

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const today = new Date();
  
  if (date.toDateString() === today.toDateString()) return "Today";
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const formatLastSync = () => {
  if (!chatStore.lastSync) return "Never synced";
  const date = new Date(chatStore.lastSync);
  const diffMs = new Date() - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just saved";
  if (diffMins < 60) return `Saved ${diffMins}m ago`;
  if (diffMins < 1440) return `Saved ${Math.floor(diffMins / 60)}h ago`;
  
  return `Saved ${Math.floor(diffMins / 1440)}d ago`;
};

const shouldShowDateSeparator = (msg, index) => {
  if (index === 0) return true;
  const prevMsg = messages.value[index - 1];
  return new Date(msg.created_at).toDateString() !== 
         new Date(prevMsg.created_at).toDateString();
};

const scrollToBottom = async () => {
  await nextTick();
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight;
  }
};

const handleTyping = () => {
  // Implement typing indicator logic if needed
};

// AUTO-SAVE on various events
const setupAutoSave = () => {
  // Save on page unload
  window.addEventListener('beforeunload', saveEverything);
  
  // Save on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) saveEverything();
  });
  
  // Periodic auto-save (every 30 seconds)
  const autoSaveInterval = setInterval(saveEverything, 30000);
  
  return () => {
    window.removeEventListener('beforeunload', saveEverything);
    document.removeEventListener('visibilitychange', saveEverything);
    clearInterval(autoSaveInterval);
  };
};

// Lifecycle
onMounted(async () => {
  console.log("Chat mounted - loading saved data...");
  
  initializeUser();
  updateStorageUsage();
  
  // Setup all listeners
  const cleanupAutoSave = setupAutoSave();
  const cleanupAutoReload = setupAutoReload();
  const cleanupEventListeners = setupEventListeners();
  
  // Load conversations
  isLoading.value = true;
  try {
    await chatStore.getMyConversations();
    
    if (chatStore.activeConversationId) {
      await chatStore.getMessages(chatStore.activeConversationId);
      scrollToBottom();
    }
    
    console.log("Loaded from localStorage:", {
      conversations: chatStore.conversations.length,
      activeConversation: chatStore.activeConversationId,
      totalMessages: Object.keys(chatStore.messages).reduce((sum, key) => 
        sum + (chatStore.messages[key]?.length || 0), 0
      ),
      lastSync: chatStore.lastSync
    });
    
    // Start auto-reload immediately
    autoReloadMessages();
    
    // Check connection health
    await checkConnectionHealth();
    
    // Retry any failed messages on mount
    if (hasFailedMessages.value) {
      setTimeout(() => {
        chatStore.retryAllFailedMessages();
      }, 1000);
    }
  } catch (err) {
    console.error("Failed to load:", err);
    error.value = "Failed to load chat data";
    setTimeout(() => error.value = "", 5000);
  } finally {
    isLoading.value = false;
  }
  
  onUnmounted(() => {
    cleanupAutoSave();
    cleanupAutoReload();
    cleanupEventListeners();
    saveEverything();
    console.log("Chat unmounted - data saved");
  });
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
.message-enter-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* Typing animation */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 0.6s infinite;
}

/* Loading animation */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Scale animation */
@keyframes scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hover\:scale-105:hover {
  animation: scale 0.2s ease-out;
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
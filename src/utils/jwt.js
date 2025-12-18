import { jwtDecode } from "jwt-decode";

const getUserPayload = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedPayload = jwtDecode(token);
    return {
      userId: decodedPayload.id || decodedPayload.sub || decodedPayload.transporter_id,
      username: decodedPayload.firstname + " " + decodedPayload.lastname,
      email: decodedPayload.email,
      role: decodedPayload.role,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export default getUserPayload;

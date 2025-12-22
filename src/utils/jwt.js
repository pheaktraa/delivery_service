import { jwtDecode } from "jwt-decode";

const getUserPayload = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedPayload = jwtDecode(token);
    console.log(jwtDecode(localStorage.getItem('token')));
    
    return {
      userId: decodedPayload.id,
      username: decodedPayload.firstname + " " + decodedPayload.lastname,
      firstname: decodedPayload.firstname,
      lastname: decodedPayload.lastname,
      email: decodedPayload.email,
      role: decodedPayload.role,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};

export default getUserPayload;

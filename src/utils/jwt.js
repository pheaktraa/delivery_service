import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = "token";

export const getUserPayload = () => {
  const access_token = localStorage.getItem(TOKEN_KEY);

  if (access_token) {
    const decodedPayload = jwtDecode(access_token);

    return {
      userId: decodedPayload.sub,
      name: decodedPayload.name,
      email: decodedPayload.email,
      role: decodedPayload.role,
    };
  }

  return null;
};

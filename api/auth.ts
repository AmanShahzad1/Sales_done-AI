const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
import jwt from 'jsonwebtoken'


interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',  // This is crucial for cookies
    mode: 'cors'  // Explicitly enable CORS mode
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};



// Define token payload type
interface TokenPayload {
  userId: string;
  exp?: number;
  iat?: number;
  // Add other claims you use
}

export function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    if (!token || typeof token !== 'string') {
      reject(new Error('Invalid token format'))
      return
    }

    jwt.verify(
      token, 
      process.env.JWT_SECRET!,
      (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded as TokenPayload)
        }
      }
    )
  })
}
import { AuthRequest, AuthResponse } from "../types";
import { fetchFromAPI } from "./api";

export const login = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await fetchFromAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(request)  // ユーザー名とパスワードを送信
    });

    return response.json();
};

export const register = async (request: AuthRequest): Promise<boolean> => {
    const response = await fetchFromAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(request)  // ユーザー名とパスワードを送信
    });

    if (response.ok) return true;
    return false;
};


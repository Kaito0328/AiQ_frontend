import {fetchFromAPI} from './api';
import {User} from '../types';

export const getLoginUserid = async (): Promise<number> => {
    try {
        const response = await fetchFromAPI('/api/user/id-only', {}, true); // 認証が必要なため、authenticated: true を指定
        return response.json();
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        throw error; // エラーハンドリング
    }
};

export const getLoginUser = async (): Promise<User> => {
    try {
        const response = await fetchFromAPI('/api/user', {}, true); // 認証が必要なため、authenticated: true を指定
        return response.json();
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        throw error; // エラーハンドリング
    }
};

export const getOfficialUserId = async (): Promise<number> => {
    try {
        const response = await fetchFromAPI('/api/user/id-only/official', {}, true); // 認証が必要なため、authenticated: true を指定
        return response.json();
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        throw error; // エラーハンドリング
    }
};

export const getUserById = async (userId: number): Promise<User> => {
    try {
        const response = await fetchFromAPI(`/api/user/id/${userId}`, {}, true); // 認証が必要なため、authenticated: true を指定
        return response.json();
    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        throw error; // エラーハンドリング
    }
}

export const fetchUserList = async (): Promise<User[]> => {
    const response = await fetchFromAPI("/api/user/users", {}, true);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  };
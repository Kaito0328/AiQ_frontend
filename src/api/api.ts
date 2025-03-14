// API_BASE_URL を環境変数から取得するように変更
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://mechanical-annabel-t-tech-f1b7cf63.koyeb.app';  // ローカルデフォルト値を設定

export const fetchFromAPI = async (
    endpoint: string,
    options: RequestInit = {},
    authenticated: boolean = false
): Promise<Response> => {
    const token = authenticated ? localStorage.getItem('token') : null;
    const headers = new Headers(options.headers || {});

    // body が FormData でない場合のみ、Content-Type を application/json に設定する
    if (!options.body || !(options.body instanceof FormData)) {
        headers.append('Content-Type', 'application/json');
    }

    if (authenticated && token) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return response;
};
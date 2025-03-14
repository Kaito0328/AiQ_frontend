import {fetchFromAPI} from './api';
import {CollectionSet} from '../types';

// コレクションセット取得（汎用）
const fetchCollectionSets = async (path: string, authenticated = false): Promise<CollectionSet[]> => {
    const response = await fetchFromAPI(`/api/collection-sets${path}`, { method: 'GET' }, authenticated);
    return response.json();
};
// 特定ユーザーのコレクションセット取得
export const fetchCollectionSetsByUserId = (userId: number) => fetchCollectionSets(`/user/${userId}`, true);


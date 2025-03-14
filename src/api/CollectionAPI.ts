import {fetchFromAPI} from './api';
import {Collection} from '../types';

export const getCollectionsByUserId = async (userId: number): Promise<Collection[]> => {
    const response = await fetchFromAPI(`/api/collections/user/${userId}`, { method: 'GET' }, true);
    return response.json()
};

export const getCollectionsByCollectionSetId = async (collectionSetId: number): Promise<Collection[]> => {
    const response = await fetchFromAPI(`/api/collections/collection-sets/${collectionSetId}`, { method: 'GET' }, true);
    return response.json();
};
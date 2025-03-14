import {fetchFromAPI} from './api';
import {Question, QuestionAnswerResponse, UpdateQuestionRequest} from '../types';

export const getQuestionById = async (id: number): Promise<Question> => {
    const response = await fetchFromAPI(`/api/questions/${id}`, { method: 'GET' });
    return response.json();
};

export const getQuestionsByCollectionId = async (collectionId: number): Promise<Question[]> => {
    const response = await fetchFromAPI(`/api/questions/collections/${collectionId}`, { method: 'GET' });
    return response.json();
};

export const checkAnswer = async (id: number, userAnswer: string): Promise<QuestionAnswerResponse> => {
    const response = await fetchFromAPI(`/api/questions/${id}/check`, {
        method: 'POST',
        body: JSON.stringify({ userAnswer }),
    });
    return response.json();
};

export const getNextHint = async (questionId: number, index: number): Promise<string> => {
    const response = await fetchFromAPI(`/api/questions/hint/${questionId}?index=${index}`, { method: 'GET' });
    return response.text();
};

export const getQuestionIds = async (collectionIds: number[], order: string, limit: number): Promise<number[]> => {
    const params = new URLSearchParams();
    params.append('collectionIds', collectionIds.join(','));
    params.append('order', order); // 'asc', 'desc', 'random'
    params.append('limit', limit.toString());
  
    // クエリパラメータをURLに付加
    const url = `/api/questions?${params.toString()}`;
  
    try {
      const response = await fetchFromAPI(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('ネットワークエラー');
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return []; // エラーが発生した場合は空の配列を返す
    }
  };

export const updateQuestionsBatch = async (questions: UpdateQuestionRequest[]): Promise<void> => {
  try {
    const response = await fetchFromAPI("/api/questions/batch", {
      method: "PUT",
      body: JSON.stringify(questions),
    }, true);

    if (!response.ok) {
      throw new Error(`Failed to update questions: ${response.statusText}`);
    }

    console.log("Questions updated successfully");
  } catch (error) {
    console.error("Error updating questions:", error);
    throw error;
  }
};
  
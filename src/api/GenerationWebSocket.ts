import { QuestionGenerationResponse } from "../types";

export const connectWebSocket = (): Promise<QuestionGenerationResponse> => {
    return new Promise<QuestionGenerationResponse>((resolve, reject) => {
      const socket = new WebSocket("ws://localhost:8080/ws");
  
      socket.onopen = () => {
        console.log("Connected to WebSocket server");
      };
  
      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
  
        try {
          const data: QuestionGenerationResponse = JSON.parse(event.data);
          if (data.success && data.collectionId) {
            resolve(data); // WebSocketの応答を受け取ったらresolve
          } else {
            reject(data.message || "エラーが発生しました");
          }
        } catch (e) {
          reject("サーバーからの応答が不正です");
        } finally {
          socket.close(); // 通信完了後は WebSocket を閉じる
        }
      };
  
      socket.onclose = () => {
        console.log("Disconnected from WebSocket server");
      };
  
      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        reject("WebSocket の通信に失敗しました");
      };
    });
  };
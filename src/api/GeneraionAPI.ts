import { AiGenerationRequest, ManualGenerationRequest, CsvGenerationRequest, QuestionGenerationResponse } from "../types";
import { fetchFromAPI } from "./api";
import { connectWebSocket } from "./GenerationWebSocket";
export const aiGenerateQuestions = async (request: AiGenerationRequest): Promise<QuestionGenerationResponse> => {
    try {
              // APIリクエスト
      const response = await fetchFromAPI('/api/generate/ai', {
        method: 'POST',
        body: JSON.stringify(request),
      }, true);
  
      if (!response.ok) throw new Error("問題の生成に失敗しました");
  
      const data = await connectWebSocket();

      // WebSocketから返されたデータを返す
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("エラーが発生しました");
    }
};

export const manualGenerateQuestions = async (request: ManualGenerationRequest): Promise<QuestionGenerationResponse> => {
  try {
            // APIリクエスト
    const response = await fetchFromAPI('/api/generate/manual', {
      method: 'POST',
      body: JSON.stringify(request),
    }, true);

    if (!response.ok) throw new Error("問題の生成に失敗しました");

    const data = response.json()

    // WebSocketから返されたデータを返す
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("エラーが発生しました");
  }
};
export const csvGenerateQuestions = async (request: CsvGenerationRequest): Promise<QuestionGenerationResponse> => {
  try {
    const formData = new FormData();

    // ファイルオブジェクトに MIME タイプを明示的に指定（必要に応じて）
    // request.file が File 型であれば、通常は type プロパティにMIMEタイプが含まれていますが、
    // もし空の場合は、新しい File オブジェクトを作成する方法もあります。
    let fileToSend = request.file;
    if (!fileToSend.type || fileToSend.type === "application/octet-stream") {
      fileToSend = new File([request.file], request.file.name, { type: "text/csv" });
    }

    formData.append("file", fileToSend);
    formData.append("collectionSetName", request.collectionSetName);
    formData.append("collectionName", request.collectionName || "");
    formData.append("public", String(request.public)); // boolean を文字列に変換

    // トークンの取得（認証が必要な場合）
    const token = localStorage.getItem("token");

    // fetchFromAPIを使わず、直接fetchを使用してヘッダーのContent-Typeを設定しない
    const response = await fetchFromAPI("/api/generate/csv", {
      method: "POST",
      body: formData,
    }, true);

    if (!response.ok) throw new Error("問題の生成に失敗しました");

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("エラーが発生しました");
  }
};

export interface CollectionSet {
id: number;
name: string;
collections: Collection[];
}

export interface Collection {
    id: number;
    name: string;
}

export interface Question {
    id: number;
    questionText: string;
    correctAnswer: string;
    collectionId?: number;
    descriptionText?: string;
}

export interface UpdateQuestionRequest {
    id: number;
    questionText?: string;
    correctAnswer?: string;
    collectionId?: number;
    descriptionText?: string;
}

export interface QuestionAnswerResponse {
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
}

export interface QuestionRequest {
    questionText: string;
    correctAnswer: string;
    collectionId?: number;
}

export interface AiGenerationRequest {
    collectionSetName: string;  // コレクションセットの名前
    theme: string;              // テーマ
    question_format: string;    // 質問のフォーマット
    answer_format: string;      // 答えのフォーマット
    question_example: string;   // 質問の例
    answer_example: string;     // 答えの例
    public: boolean;          // 公開設定
}

export interface QuestionGenerationResponse {
    success: boolean;           // 成功かどうか
    collectionId: number;       // 作成されたコレクションID
    message?: string;           // エラーメッセージ（失敗時）
}

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;  // JWT トークン
}

export interface UserAnswerRequest {
    questionId: number;   // 質問ID
    userAnswer: string;   // ユーザーの回答
}

export interface User {
    id: number;
    username: string;
    official: boolean;
    self: boolean
}

export interface CsvGenerationRequest {
    file: File; // MultipartFileに対応するため、HTMLのFile型を使用
    collectionSetName: string;
    collectionName: string;
    public: boolean;
}

export interface ManualGenerationRequest {
    collectionSetName: string; // コレクションセット名
    collectionName: string; // コレクション名
    questions: QuestionRequest[]; // 問題のリスト
    public: boolean;
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { aiGenerateQuestions } from "../api/GeneraionAPI";
import { AiGenerationRequest } from "../types";
import { getLoginUserid } from "../api/UserAPI";

const QuizGenerator = () => {
  const [requestData, setRequestData] = useState<AiGenerationRequest>({
    collectionSetName: "",
    theme: "",
    question_format: "",
    answer_format: "",
    question_example: "",
    answer_example: "",
    public: false, // 公開設定（デフォルトはfalse）
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [collectionId, setCollectionId] = useState<number | null>(null); // コレクションID
  const navigate = useNavigate();

    const [loginUserId, setLoginUserId] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const loginUserId = await getLoginUserid();
          setLoginUserId(loginUserId);
        } catch (error) {
          console.error("ユーザーIDの取得に失敗しました", error);
        }
      };
      fetchUserId();
    }, []);

  const generateQuestions = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    setCollectionId(null);

    try {
      const response = await aiGenerateQuestions(requestData);

      // Handle the response from the WebSocket connection
      if (response.success && response.collectionId) {
        setCollectionId(response.collectionId);
        setMessage("問題の保存が完了しました！");
      } else {
        setError(response.message || "エラーが発生しました");
      }
    } catch (err) {
      setError("エラーが発生しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">AI 問題生成</h1>

      <div className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">テーマ:</label>
          <input
            type="text"
            name="theme"
            value={requestData.theme}
            onChange={handleInputChange}
            placeholder="例: 数学、歴史"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block font-medium text-gray-700">コレクションセット名:</label>
          <input
            type="text"
            name="collectionSetName"
            value={requestData.collectionSetName}
            onChange={handleInputChange}
            placeholder="例: 数学の基本問題"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label className="block font-medium text-gray-700">公開設定:</label>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            name="public"
            checked={requestData.public}
            onChange={(e) =>
              setRequestData({
                ...requestData,
                public: e.target.checked,
              })
            }
            className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="ml-2 text-gray-700">公開にする</span>
        </div>

        <div>
          <label className="block font-medium text-gray-700">出力形式 (問題):</label>
          <input
            type="text"
            name="question_format"
            value={requestData.question_format}
            onChange={handleInputChange}
            placeholder="例: 問題形式: 問題文"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">出力形式 (解答):</label>
          <input
            type="text"
            name="answer_format"
            value={requestData.answer_format}
            onChange={handleInputChange}
            placeholder="例: 解答形式: 答え"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">例 (問題):</label>
          <input
            type="text"
            name="question_example"
            value={requestData.question_example}
            onChange={handleInputChange}
            placeholder="例: 5 + 3 は何ですか？"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">例 (解答):</label>
          <input
            type="text"
            name="answer_example"
            value={requestData.answer_example}
            onChange={handleInputChange}
            placeholder="例: 8"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={generateQuestions}
          disabled={loading}
          className="w-64 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition duration-300"
        >
          {loading ? "生成中..." : "問題を生成"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-blue-500 text-center mt-4">{message}</p>}

      {collectionId && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`user/${loginUserId}/collections/${collectionId}/questions`)}
            className="w-64 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition duration-300"
          >
            問題一覧を見る
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;

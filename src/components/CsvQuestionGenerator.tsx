import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { csvGenerateQuestions } from "../api/GeneraionAPI";
import { CsvGenerationRequest } from "../types";
import { getLoginUserid } from "../api/UserAPI";
import { login } from "../api/AuthAPI";

const CsvQuestionGenerator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [collectionSetName, setCollectionSetName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [collectionId, setCollectionId] = useState<number | null>(null);
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
  


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("CSVファイルを選択してください。");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    setCollectionId(null);

    try {
      const request: CsvGenerationRequest = {
        file: file,
        collectionSetName: collectionSetName,
        collectionName: collectionName,
        public: isPublic,
      };

      console.log(request.file);

      const response = await csvGenerateQuestions(request);

      if (response.success && response.collectionId) {
        setCollectionId(response.collectionId);
        setMessage("CSVのアップロードが完了しました！");
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        CSVから問題を生成
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">
            コレクションセット名:
          </label>
          <input
            type="text"
            value={collectionSetName}
            onChange={(e) => setCollectionSetName(e.target.value)}
            placeholder="例: 数学の基本問題"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            コレクション名:
          </label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="例: 基本演習"
            className="w-full p-3 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <label className="block font-medium text-gray-700">公開設定:</label>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="ml-2 text-gray-700">公開にする</span>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            CSVファイル:
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-2 mt-2 border rounded-md border-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-64 py-3 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-200 transition duration-300"
        >
          {loading ? "アップロード中..." : "CSVをアップロード"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-blue-500 text-center mt-4">{message}</p>}

      {collectionId && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/user/${loginUserId}/collections/${collectionId}/questions`)}
            className="w-64 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition duration-300"
          >
            問題一覧を見る
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvQuestionGenerator;

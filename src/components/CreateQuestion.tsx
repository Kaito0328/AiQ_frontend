import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaPencilAlt, FaFileUpload } from "react-icons/fa";

const CreateQuestion: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* タイトル */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">問題作成</h1>

      {/* ボタンコンテナ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] max-w-4xl">
        {/* AI に作成してもらう */}
        <button
          onClick={() => navigate("/create/ai_create")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-blue-600 hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <FaRobot className="text-4xl mb-2" />
          <span>AI に作ってもらう</span>
        </button>

        {/* 手動で作成 */}
        <button
          onClick={() => navigate("/create/user_create")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-green-600 hover:text-white hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <FaPencilAlt className="text-4xl mb-2" />
          <span>手動で作成</span>
        </button>

        {/* ファイルをアップロード */}
        <button
          onClick={() => navigate("/create/file_create")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-yellow-600 hover:text-white hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <FaFileUpload className="text-4xl mb-2" />
          <span>ファイルをアップロード</span>
        </button>
      </div>
    </div>
  );
};

export default CreateQuestion;

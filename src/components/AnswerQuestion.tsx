import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginUserid, getOfficialUserId } from "../api/UserAPI";
import { FaBook, FaUser, FaUsers } from "react-icons/fa"; // アイコンを追加

const AnswerQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [loginUserId, setLoginUserId] = useState<number | null>(null);
  const [officialUserId, setOfficialUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const loginUser = await getLoginUserid();
        setLoginUserId(loginUser);

        const officialUser = await getOfficialUserId();
        setOfficialUserId(officialUser);
      } catch (error) {
        console.error("ユーザーIDの取得に失敗しました", error);
      }
    };
    fetchUserIds();
  }, []);

  const handleNavigate = (type: "official" | "self" | "user") => {
    let userId: number | null = null;

    if (type === "user") {
      navigate("/user-list");
    } else {
      if (type === "official") {
        userId = officialUserId;
      } else if (type === "self") {
        userId = loginUserId;
      }

      if (userId !== null) {
        navigate(`/user/${userId}/collection-sets`);
      } else {
        console.error("ユーザーIDが取得できていません");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* タイトル */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">問題解答</h1>

      {/* ボタンコンテナ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] max-w-4xl">
        {/* 公式の問題 */}
        <button
          onClick={() => handleNavigate("official")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-blue-600 hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          disabled={officialUserId === null}
        >
          <FaBook className="text-4xl mb-2" />
          <span>公式の問題解答</span>
        </button>

        {/* 自分の問題 */}
        <button
          onClick={() => handleNavigate("self")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-green-600 hover:text-white hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          disabled={loginUserId === null}
        >
          <FaUser className="text-4xl mb-2" />
          <span>自分の問題解答</span>
        </button>

        {/* 他ユーザーの問題 */}
        <button
          onClick={() => handleNavigate("user")}
          className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl text-xl font-semibold text-yellow-600 hover:text-white hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <FaUsers className="text-4xl mb-2" />
          <span>他ユーザーの問題解答</span>
        </button>
      </div>
    </div>
  );
};

export default AnswerQuestion;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/UserAPI"; // ユーザー情報を取得
import { User } from "../types";
import { FaEdit, FaPlay } from "react-icons/fa"; // アイコン追加

interface UserHeaderProps {
  userId: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-200 animate-pulse rounded-lg shadow-md">
        <p className="text-gray-500">ユーザー情報を読み込み中...</p>
      </div>
    );
  }

  const handleNavigateToQuizOption = () => {
    navigate(`/quiz-option/${user.id}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-3 bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-200">
      {/* ユーザー情報 */}
      <div className="flex items-center space-x-4">
        {/* <img
          src={user.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-blue-400"
        /> */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {user.official ? "✅ 公式ユーザー" : user.username}
          </h1>
          {/* <p className="text-gray-500 text-sm">{user.bio || "自己紹介が未設定です"}</p> */}
        </div>
      </div>

      {/* ボタン群 */}
      <div className="mt-6 flex space-x-4">
        {user.self && (
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition">
            <FaEdit className="mr-2" /> プロフィール編集
          </button>
        )}
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-110"
          onClick={handleNavigateToQuizOption}
        >
          <FaPlay className="mr-2" /> クイズを開始
        </button>
      </div>
    </div>
  );
};

export default UserHeader;

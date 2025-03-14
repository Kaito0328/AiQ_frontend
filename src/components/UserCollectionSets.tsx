import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader"; // ヘッダーコンポーネント
import { fetchCollectionSetsByUserId } from "../api/CollectionSetAPI";
import { FaBook } from "react-icons/fa"; // 書籍アイコン追加

const UserCollectionSets: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [collectionSets, setCollectionSets] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchCollectionSets = async () => {
      try {
        const data = await fetchCollectionSetsByUserId(Number(userId));
        setCollectionSets(data);
      } catch (error) {
        console.error("コレクションセットの取得に失敗しました:", error);
      }
    };

    fetchCollectionSets();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ユーザー情報を共通ヘッダーに表示 */}
      <UserHeader userId={Number(userId)} />

      {/* コレクションセットの表示 */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3"> ユーザーのコレクションセット</h2>
        
        {collectionSets.length === 0 ? (
          <p className="text-gray-500 text-center">コレクションセットがありません。</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {collectionSets.map((set) => (
              <li
                key={set.id}
                className="p-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md flex items-center space-x-4 cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                onClick={() => navigate(`/user/${userId}/collection-sets/${set.id}/collections`)}
              >
                <FaBook className="text-3xl" />
                <span className="text-lg font-medium">{set.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserCollectionSets;

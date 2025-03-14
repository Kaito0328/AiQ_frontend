import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader"; // ヘッダーコンポーネント
import { getCollectionsByCollectionSetId } from "../api/CollectionAPI";
import { FaFolderOpen } from "react-icons/fa"; // フォルダアイコン追加

const UserCollections: React.FC = () => {
  const { userId, collectionSetId } = useParams<{ userId: string; collectionSetId: string }>();
  const [collections, setCollections] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      if (!collectionSetId) return;

      try {
        const data = await getCollectionsByCollectionSetId(Number(collectionSetId));
        setCollections(data);
      } catch (error) {
        console.error("コレクションの取得に失敗しました:", error);
      }
    };

    fetchCollections();
  }, [collectionSetId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ユーザー情報を共通ヘッダーに表示 */}
      <UserHeader userId={Number(userId)} />

      {/* コレクションリストの表示 */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">コレクションリスト</h2>

        {collections.length === 0 ? (
          <p className="text-gray-500 text-center">コレクションがありません。</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <li
                key={collection.id}
                className="p-5 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-md flex items-center space-x-4 cursor-pointer transform transition hover:scale-105 hover:shadow-xl"
                onClick={() => navigate(`/user/${userId}/collections/${collection.id}/questions`)}
              >
                <FaFolderOpen className="text-3xl" />
                <span className="text-lg font-medium">{collection.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserCollections;

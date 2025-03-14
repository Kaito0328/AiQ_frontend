import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserList } from "../api/UserAPI";
import { User } from "../types";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUserList();
        setUsers(data);
      } catch (error) {
        console.error("ユーザー一覧の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSelectUser = (userId: number) => {
    navigate(`/user/${userId}/collection-sets`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-3 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 ユーザー一覧</h1>

      {loading ? (
        <p className="text-gray-500 text-center">🔄 ロード中...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">あなたが一番乗りです！</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-100 transition flex justify-between items-center"
              onClick={() => handleSelectUser(user.id)}
            >
              <span className="text-gray-800 font-medium">{user.username}</span>
              <span className="text-gray-500 text-sm">▶</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;

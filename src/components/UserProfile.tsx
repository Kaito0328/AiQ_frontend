import React from 'react';
import useUser from './useUser'; // useUser フックをインポート

const UserProfile: React.FC = () => {
  const { user, loading, error } = useUser(); // useUser フックを使用

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-xl mx-auto mt-16">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">ユーザー情報</h1>
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          <span className="text-2xl text-white">{user?.username[0]}</span> {/* 仮のユーザーアイコン */}
        </div>
      </div>

      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-700">ユーザーID:</p>
          <p className="text-lg text-gray-900">{user?.id}</p>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-700">ユーザー名:</p>
          <p className="text-lg text-gray-900">{user?.username}</p>
        </div>
      </div>

      {/* 他のユーザー情報を表示することができます */}
    </div>
  );
};

export default UserProfile;

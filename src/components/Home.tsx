import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaBook } from 'react-icons/fa';
import { getCollectionsByUserId } from '../api/CollectionAPI';
import { getLoginUser } from '../api/UserAPI';
import { Collection, User } from '../types';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [collections, setCollections] = useState<Collection[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const loginUser: User = await getLoginUser();
                setUser(loginUser);
            }

            if (user) {
                try {
                    const userCollections = await getCollectionsByUserId(user.id);
                    setCollections(userCollections);
                } catch (err) {
                    console.error("コレクションの取得に失敗しました", err);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 font-sans">
            {/* ヒーローセクション */}
            <div className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-b from-gray-50 to-gray-200 shadow-md text-gray-800">
                <h1 className="text-2xl font-bold">
                    {user ? `${user.username} さん、ようこそ！` : 'ゲストさん、ようこそ！'}
                </h1>

                {!user && (
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 px-5 py-2 border border-gray-600 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 transition"
                    >
                        ログイン
                    </button>
                )}
            </div>

            {/* アクションボタン */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] max-w-4xl mt-10">
                <div
                    onClick={() => navigate('/create')}
                    className="flex flex-col items-center justify-center p-8 bg-white hover:bg-blue-500 hover:text-white text-blue-600 rounded-xl text-2xl transition duration-300 cursor-pointer shadow-xl h-48 transform hover:-translate-y-2 hover:scale-105"
                >
                    <FaPlus className="text-6xl mb-3 animate-bounce" />
                    <span>問題作成</span>
                </div>
                <div
                    onClick={() => navigate('/answer')}
                    className="flex flex-col items-center justify-center p-8 bg-white hover:bg-green-500 hover:text-white text-green-600 rounded-xl text-2xl transition duration-300 cursor-pointer shadow-xl h-48 transform hover:-translate-y-2 hover:scale-105"
                >
                    <FaEdit className="text-6xl mb-3 animate-bounce" />
                    <span>問題解答</span>
                </div>
            </div>

            {/* コレクション一覧 */}
            {user && (
                <div className="mt-16 w-full px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        あなたのコレクション
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] max-w-5xl mx-auto">
                        {collections.length > 0 ? (
                            collections.map((collection) => (
                                <div
                                    key={collection.id}
                                    className="relative flex flex-col justify-between p-6 bg-white shadow-2xl rounded-xl hover:shadow-3xl transition cursor-pointer transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                                    onClick={() => navigate(`/user/${user.id}/collections/${collection.id}`)}
                                >
                                    {/* 背景アニメーション */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-20"></div>

                                    <FaBook className="text-4xl text-purple-500 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900">{collection.name}</h3>
                                    <p className="text-gray-600 mt-2 text-sm">作成日: 2025/03/12</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center w-full">
                                まだコレクションがありません
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import { getQuestionsByCollectionId, updateQuestionsBatch } from "../api/QuestionAPI";
import { getLoginUser } from "../api/UserAPI";
import { Question } from "../types";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";

const UserQuestions: React.FC = () => {
  const { userId, collectionId } = useParams<{ userId: string; collectionId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editedQuestions, setEditedQuestions] = useState<{ [key: number]: Partial<Question> }>({});
  const [showAnswers, setShowAnswers] = useState<boolean[]>([]);
  const [allAnswersVisible, setAllAnswersVisible] = useState(false);
  const [loginUserId, setLoginUserId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // 編集モードの管理
  const [isSelfUser, setIsSelfUser] = useState<boolean>(false); // 自分のユーザーか判定
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
        const loginUser = await getLoginUser();
        setLoginUserId(loginUser.id);
        setIsSelfUser(loginUser.id === Number(userId)); // 自分のユーザーかどうか
      } catch (error) {
        console.error("Failed to get login user", error);
      }
    };
    fetchLoginUser();
  }, [userId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!collectionId) return;
      try {
        const data = await getQuestionsByCollectionId(Number(collectionId));
        setQuestions(data);
        setShowAnswers(new Array(data.length).fill(false));
      } catch (error) {
        console.error("問題の取得に失敗しました:", error);
      }
    };
    fetchQuestions();
  }, [collectionId]);

  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => prev.map((val, i) => (i === index ? !val : val)));
  };

  const toggleAllAnswers = () => {
    const newState = !allAnswersVisible;
    setShowAnswers(new Array(questions.length).fill(newState));
    setAllAnswersVisible(newState);
  };

  const handleSolve = () => {
    navigate("/questions", {
      state: { 
        selectedCollections: [Number(collectionId)], 
        questionOrder: "asc", 
        questionCount: questions.length 
      },
    });
  };

  // 入力値をステートに保存（変更があった場合のみ記録）
  const handleInputChange = (questionId: number, field: keyof Question, value: string) => {
    setEditedQuestions(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async () => {
    const updates = Object.entries(editedQuestions).map(([id, changes]) => ({
      id: Number(id),
      ...changes,
    }));
  
    if (updates.length === 0) return; // 変更がなければ実行しない
  
    try {
      await updateQuestionsBatch(updates);
      alert("変更が保存されました！");
    } catch (error) {
      console.error("保存に失敗しました", error);
      alert("保存に失敗しました");
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev); // 編集モードを切り替え
  };

  return (
    <div className="min-h-screen ">
      <UserHeader userId={Number(userId)} />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Questions in Collection</h2>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={handleSolve}
          >
            この問題を解く 🚀
          </button>
        </div>

        {/* 保存ボタンを「すべての答えを表示」の左側に配置 */}

        <div className="flex justify-between mb-4">
          {isEditMode && isSelfUser && (
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center space-x-2"
              onClick={handleSaveChanges}
            >
              <FaSave />
              <span>変更を保存</span>
            </button>
          )}
          {questions.length > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              onClick={toggleAllAnswers}
            >
              {allAnswersVisible ? "すべての答えを隠す" : "すべての答えを表示"}
            </button>
          )}
        </div>


        {questions.length === 0 ? (
          <p className="text-gray-500 text-center w-full">問題がありません</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={question.id} className="p-5 bg-white rounded-lg shadow-md border-l-4 border-blue-500 relative">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    className="border p-2 w-full rounded-lg text-lg"
                    value={editedQuestions[question.id]?.questionText ?? question.questionText}
                    onChange={(e) => handleInputChange(question.id, "questionText", e.target.value)}
                    disabled={!isSelfUser || !isEditMode} // 編集許可
                  />
                </div>

                {/* questionIdの表示 */}
                <span className="absolute bottom-2 right-2 text-xs text-gray-500 z-10">
                  ID: {question.id}
                </span>

                <button
                  className="mt-2 text-blue-500 flex items-center space-x-2 hover:text-blue-700 transition"
                  onClick={() => toggleAnswer(index)}
                >
                  {showAnswers[index] ? <FaEyeSlash /> : <FaEye />}
                  <span>{showAnswers[index] ? "答えを隠す" : "答えを見る"}</span>
                </button>

                {showAnswers[index] && (
                  <input
                    type="text"
                    className="border p-2 w-full rounded-lg text-lg mt-3 bg-green-100 text-green-700"
                    value={editedQuestions[question.id]?.correctAnswer ?? question.correctAnswer}
                    onChange={(e) => handleInputChange(question.id, "correctAnswer", e.target.value)}
                    disabled={!isSelfUser || !isEditMode} // 編集許可
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {/* 編集モードボタンは下部に配置 */}
        {!isEditMode && isSelfUser && (
          <div className="fixed bottom-10 right-10 space-y-2">
            <button
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition"
              onClick={toggleEditMode}
            >
              編集モードに切替
            </button>
          </div>
        )}
        {/* 編集モード解除ボタン */}
        {isEditMode && isSelfUser && (
          <div className="fixed bottom-10 right-10 space-y-2">
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
              onClick={toggleEditMode}
            >
              編集モードを終了
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuestions;

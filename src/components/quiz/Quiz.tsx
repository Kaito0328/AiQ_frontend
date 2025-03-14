import React, { useState, useEffect } from 'react';
import Result from './Result';
import { useLocation } from 'react-router-dom';
import  Score  from './Score';
import QuizQuestion from './QuizQuestion';
import { getQuestionIds, getQuestionById, checkAnswer, getNextHint } from '../../api/QuestionAPI';
import { Question, QuestionAnswerResponse,  } from '../../types';


interface LocationState {
  selectedCollections: number[];
  questionOrder: 'random' | 'sequential';
  questionCount: number;
}

const Quiz: React.FC = () => {
  const location = useLocation();
  const { selectedCollections, questionOrder, questionCount } = location.state as LocationState;

  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [result, setResult] = useState<QuestionAnswerResponse | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [hint, setHint] = useState('');

  const fetchQuestionIdsList = async () => {
    try {
      const ids = await getQuestionIds(selectedCollections, questionOrder, questionCount);
      setQuestionIds(ids);
    } catch (error) {
      console.error('Error fetching question IDs:', error);
    }
  };

  const fetchNextQuestion = async () => {
    if (questionIds.length === 0) return;

    try {
      const data = await getQuestionById(questionIds[currentQuestionIndex]);
      if (data) {
        setQuestion(data);
        setResult(null);
        setHint('');
      }
    } catch (error) {
      console.error('Error fetching next question:', error);
    }
  };

  const handleAnswerSubmit = async (userAnswer: string) => {
    try {
      const response = await checkAnswer(questionIds[currentQuestionIndex], userAnswer);
      setResult(response);
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  };

  const getNextHintText = async () => {
    try {
      const nextChar = await getNextHint(questionId, hint.length);
      setHint((prevHint) => prevHint + nextChar);
    } catch (error) {
      console.error('Error fetching hint:', error);
    }
  };

  useEffect(() => {
    fetchQuestionIdsList();
  }, []);

  useEffect(() => {
    if (questionIds.length > 0) {
      setQuestionId(questionIds[currentQuestionIndex]);
    }
  }, [questionIds]);

  useEffect(() => {
    if (questionIds.length <= 0) return;
    if (currentQuestionIndex < questionIds.length) setQuestionId(questionIds[currentQuestionIndex]);
    else setIsEnd(true);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questionId) {
      fetchNextQuestion();
    }
  }, [questionId]);

  useEffect(() => {
    if (result?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  }, [result]);

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && result !== null) {
        handleNext(); // エンターキーで次の問題
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // クリーンアップ
  }, [result]);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {!isEnd && question ? (
        result ? (
          <Result
            isCorrect={result.isCorrect}
            correctAnswer={result.correctAnswer}
            description={result.explanation}
            onNext={handleNext}
          />
        ) : (
          <QuizQuestion
            question={question.questionText}
            questionId={questionId}
            hint={hint}
            getNextHint={getNextHintText}
            onAnswerSubmit={handleAnswerSubmit}
          />
        )
      ) : (
        <Score score={score} total={questionIds.length} />
      )}
    </div>
  );
};

export default Quiz;

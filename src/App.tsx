import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Quiz from './components/quiz/Quiz';
import QuizOption from './components/quiz/QuizOption';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import AnswerQuestion from './components/AnswerQuestion';
import QuizGenerator from './components/QuizGenerator';
import CollectionSets from "./components/User/CollectionSets";
import UserCollections from "./components/UserCollections";
import UserQuestions from "./components/UserQuestions";
import CreateQuestion from './components/CreateQuestion';
import UserList from './components/UserList';
import UserCollectionSets from './components/UserCollectionSets';
import ManualQuestionGenerator from './components/ManualQuestionGenerator';
import CsvQuestionGenerator from './components/CsvQuestionGenerator';

const App: React.FC = () => {
  return (
<Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/quiz-option/:userId" element={<QuizOption />} />
          <Route path="/questions" element={<Quiz />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/answer' element={<AnswerQuestion />} />
          <Route path='/create/ai_create' element={<QuizGenerator />} /> 
          <Route path="/collection_sets" element={<CollectionSets />} />
          <Route path="/user/:userId/collection-sets/:collectionSetId/collections" element={<UserCollections />} />
          <Route path="/user/:userId/collections/:collectionId/questions" element={<UserQuestions />} />
          <Route path="/create" element={<CreateQuestion />} />
          <Route path="/create/user_create" element={<ManualQuestionGenerator />} />
          <Route path="/create/file_create" element={<CsvQuestionGenerator />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user/:userId/collection-sets" element={<UserCollectionSets />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

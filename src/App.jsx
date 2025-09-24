import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Games from './pages/Games'
import Quizzes from './pages/Quizzes'
import Blog from './pages/Blog'
import Content from './pages/Content'
import AboutGames from './pages/AboutGames'
import BlogPostPage from './pages/BlogPostPage'
import About from './pages/About'
import Train from './pages/Train'
import TrainContent from './pages/TrainContent'
import CTFL100Quiz from './pages/CTFL100Quiz'
import CertificatePage from './pages/CertificatePage'
import { ThemeProvider } from './contexts/ThemeContext'

// Jogos da aba Treinar
import CTFLGamePage from './pages/CTFLGamePage'
import SDLCGamePage from './pages/SDLCGamePage'
import AutomationGamePage from './pages/AutomationGamePage'
import AgileGamePage from './pages/AgileGamePage'
import SpecificTestsGamePage from './pages/SpecificTestsGamePage'

import AutomationMasterGame from './games/AutomationMasterGame'

import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="conteudos" element={<Content />} />
            <Route path="jogos" element={<Games />} />
            <Route path="quizzes" element={<Quizzes />} />

            <Route path="jogos/ctfl-100-quiz" element={<CTFL100Quiz />} />
            <Route path="jogos/automation-master" element={<AutomationMasterGame />} />
            <Route path="treinar" element={<Train />} />
            <Route path="treinar/exercicios" element={<TrainContent />} />
            <Route path="treinar/jogo/fundamentos-ctfl" element={<CTFLGamePage />} />
            <Route path="treinar/jogo/sdlc-stlc" element={<SDLCGamePage />} />
            <Route path="treinar/jogo/automacao-frameworks" element={<AutomationGamePage />} />
            <Route path="treinar/jogo/metodologias-ageis" element={<AgileGamePage />} />
            <Route path="treinar/jogo/testes-especificos" element={<SpecificTestsGamePage />} />

            <Route path="/sobre-jogos" element={<AboutGames />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/certificado/:id" element={<CertificatePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App



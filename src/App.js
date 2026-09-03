import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import FloatingParticles from './components/FloatingParticles/FloatingParticles';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import CVPage from './pages/CVPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <FloatingParticles />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/project/:id" element={<ProjectDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
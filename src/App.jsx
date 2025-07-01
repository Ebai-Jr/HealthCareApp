import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportSymptoms from './pages/ReportSymptoms';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/Register' Component={Register} />
          <Route path='/Dashboard' Component={Dashboard} />
          <Route path='/reports' Component={ReportSymptoms} />
          <Route path='/profile' Component={Profile} />
        </Routes>
      </Router>
    </>
  )
}

export default App

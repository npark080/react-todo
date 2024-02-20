import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import NotFound from './components/NotFound/NotFound';
import ToDos from './components/ToDos/ToDos';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Categories from './components/Categories/Categories';
import About from './components/About/About';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='/todos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

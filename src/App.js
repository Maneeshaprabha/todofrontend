import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import EditTodo from './pages/EditTodo'; // Import the updated EditTodo page
import ViewTodo from './pages/ViewTodo '; // Import the updated ViewTodo page

function App() {
    const { user } = useAuthContext();

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
                        <Route path="/edit-todo/:id" element={user ? <EditTodo /> : <Navigate to="/login" />} /> {/* Updated route path */}
                        <Route path="/view-todo/:id" element={user ? <ViewTodo /> : <Navigate to="/login" />} /> {/* Updated route path */}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

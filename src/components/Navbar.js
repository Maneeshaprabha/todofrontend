import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
    const { user, dispatch } = useAuthContext();

    // Handle logout
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Todo Application</h1>
                </Link>
                <nav>
               
                    {user ? (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

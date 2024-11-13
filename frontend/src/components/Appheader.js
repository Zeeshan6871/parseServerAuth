import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleParseLogout } from "../services/parse.services";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forget-password') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }
    }, [location]);

    const handleLogout = async () => {
        try {
            handleParseLogout();
            sessionStorage.clear(); 
            usenavigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div>
            {showmenu && (
                <div className="d-flex justify-content-between align-items-center w-100 p-3 bg-warning">

                    <Link className="btn btn-info" to="/">Home</Link>

                    <div className="d-flex align-items-center">
                        <span className="me-3">Welcome <b>{displayusername}</b></span>
                        <Link className="btn btn-danger" to="/login" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>

                    
                </div>
            )}

            
        </div>
    );
};

export default Appheader;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

    }, [location])

    function handleLogout(){
        sessionStorage.clear(); 
    }

    return (
        <div>
            {showmenu &&
                <div className="header bg-warning p-3">
                    <Link className="btn btn-info" to={'/'}>Home</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    <Link className="btn btn-danger" style={{ float: 'right' }} to={'/login'} onClick={handleLogout}>Logout</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;
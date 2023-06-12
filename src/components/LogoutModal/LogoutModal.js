import React from 'react';
import './LogoutModal.css';

const LogOutModal = () => {

    const LogOut = () => {
        localStorage.removeItem("token");
    }

    return(
        <div className='form-container'>
            <form className='form' style={{gap: 0}}>
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <div className='button-group'>
                    <button onClick={LogOut}>Logout</button>
                    <button>Cancel</button>
                </div>
            </form>    
        </div>
    )
}

export default LogOutModal;

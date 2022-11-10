import React, { useEffect } from 'react'
import HMAC  from './components/customHash';
import Button3d from '../../util/Button3d';
import './secure.css';

const Secure = (props) => {
    const [isAuth, setIsAuth] = React.useState(false);
    const [password, setPassword] = React.useState("");

    function onEnter(){
        if(HMAC(password,window.BigInt("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")) == "4246301330546530076d74206d41284d"){
            setIsAuth(true);
        }
    }

    return (
        <>
            {isAuth && props.children}
            {!isAuth && (
                <div className='password-container'>
                    <div className='password-box'>
                        <div className='password-title'>Enter Password</div>
                        <input className="password" type="password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <Button3d onClick={onEnter} className='password-btn'>Enter</Button3d>
                </div>
            )}
        </>
    )
}

export default Secure
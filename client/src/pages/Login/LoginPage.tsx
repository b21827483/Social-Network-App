import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import '../../../styles/Login-Signup.scss'
import {AuthContext} from "../../context/AuthContext";

function LoginPage() {
    
    const {login} = useContext(AuthContext);

    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });
    const [err, setErr] = useState<String>(null);

    const navigator = useNavigate();

    function loginInputHandler(e) {
        setLoginCredentials(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    async function loginFormHandler(e) {
        e.preventDefault();

        try {
            await login(loginCredentials);
            navigator('/');
        }
        catch (e) {
            setErr(e.response.data)
        }
    }

    return (
        <div className='auth-container'>
            <div className='card'>
                <div className='leftside'>
                    <h1>Hello</h1>
                    <p>
                        Welcome to our social network app! Unlock a world of connections and creativity by logging in
                        to your personalized account. Whether you're here to reconnect with friends, share your latest
                        adventures, or discover new passions, our platform is your gateway to a vibrant community.
                    </p>
                    <span>You don't have an account?
                        <Link to='/signup'>
                            <button> Sign Up</button>
                        </Link>
                    </span>
                </div>
                <div className='rightside'>
                    <h1>Login</h1>
                    <form>
                        <div className='input-field'>
                            <input id='username' type='text' name='username' placeholder='Username' onChange={loginInputHandler}/>
                        </div>
                        <div className='input-field'>
                            <input id='password' type='password' name='password' placeholder='Password' onChange={loginInputHandler}/>
                        </div>
                        {err && err}
                        <div className='actions'>
                            <button onClick={loginFormHandler}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
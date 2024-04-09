import {useState} from "react";

import axios from "axios";
import '../../../styles/Login-Signup.scss'
import background from '../../assets/signup-background.jfif'
import {Link} from "react-router-dom";


function SignUpPage() {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });
    const [err, setErr] = useState<String>(null);

    function credentialHandler(event) {
        setCredentials(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    async function signupFormHandler(event) {
        event.preventDefault();
        console.log(credentials)

        try {
            await axios.post('http://localhost:8800/api/auth/signup', credentials);
        }
        catch (e) {
            setErr(e.response.data);
        }

    }

    return (
        <div className='auth-container' style={{background: "cadetblue"}}>
            <div className='card'>
                <div className='rightside'>
                    <h1>Sign Up</h1>
                    <form>
                        <div className='input-field'>
                            <input id='name' type='text' name='name' placeholder='Name - Surname' onChange={credentialHandler}/>
                        </div>
                        <div className='input-field'>
                            <input id='email' type='email' name='email' placeholder='Email' onChange={credentialHandler}/>
                        </div>
                        <div className='input-field'>
                            <input id='username' placeholder='Username' name='username' onChange={credentialHandler}/>
                        </div>
                        <div className='input-field'>
                            <input id='password' type='password' name='password' placeholder='Password' onChange={credentialHandler}/>
                        </div>
                        {err && err}
                        <div className='actions'>
                            <button onClick={signupFormHandler}>Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className='leftside' style={{backgroundImage: `url(${background})`}}>
                    <h1>Welcome</h1>
                    <p>
                        Customize your profile with a photo and personal bio to let others know more about you. Whether
                        you're here to network professionally, find like-minded individuals, or simply stay connected
                        with loved ones, our platform offers a welcoming space for all.
                    </p>
                    <span>You already have an account?
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage


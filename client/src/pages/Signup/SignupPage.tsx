import '../../../styles/Login-Signup.scss'
import background from '../../assets/signup-background.jfif'
import {Link} from "react-router-dom";

function SignUpPage() {
    return (
        <div className='auth-container' style={{background: "cadetblue"}}>
            <div className='card'>
                <div className='rightside'>
                    <h1>Sign Up</h1>
                    <form>
                        <div className='input-field'>
                            <input id='name' type='text' placeholder='Name - Surname'/>
                        </div>
                        <div className='input-field'>
                            <input id='email' type='email' placeholder='Email'/>
                        </div>
                        <div className='input-field'>
                            <input id='username' placeholder='Username'/>
                        </div>
                        <div className='input-field'>
                            <input id='password' type='password' placeholder='Password'/>
                        </div>
                        <div className='actions'>
                            <button>Sign Up</button>
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


import './LoginPage.scss'

function LoginPage() {
    return (
        <div className='root'>
            <div className='card'>
                <div className='leftside'>
                    <h1>Hello</h1>
                    <p>
                        Welcome to our social network app! Unlock a world of connections and creativity by logging in
                        to your personalized account. Whether you're here to reconnect with friends, share your latest
                        adventures, or discover new passions, our platform is your gateway to a vibrant community.
                    </p>
                    <span>You don't have an account?<button> Sign Up</button></span>
                </div>
                <div className='rightside'>
                    <h1>Login</h1>
                    <form>
                        <div className='input-field'>
                            <input id='username' placeholder='Username'/>
                        </div>
                        <div className='input-field'>
                            <input id='password' type='password' placeholder='Password'/>
                        </div>
                        <div className='actions'>
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
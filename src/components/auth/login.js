import React, {useState} from "react";
import loginImage from "../../assets/images/login.svg"
import './auth.scss'
import { Link } from "react-router-dom";

import {useDispatch} from 'react-redux'
import {login} from '../../store/actions/auth'

const Login = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()



    const submitForm = (e) => {
        e.preventDefault()

        dispatch(login({email,password}, history))

        //AuthService.login({email, password})
        // axios.post('http://localhost:3000/login', {email, password})
        //     .then(res => {
        //         console.log(res)
        //     }).catch(e => {
        //         console.log(e)
        //     })
    }

    return (
        <div id = "auth-container">
            <div id = "auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={loginImage} alt="Login" />
                    </div>
                    <br/>
                    <div id="form-section">
                        <h2>Welcome</h2>

                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input onChange={e => setEmail(e.target.value)} value={email} required="required" type="text" placeholder='Email'></input>
                            </div>

                            <div className='input-field mb-2'>
                                <input onChange={e => setPassword(e.target.value)} value={password} required="required" type="password" placeholder='Password'></input>
                            </div>

                            <button>LOGIN</button>

                            <p>Don't have an account? <Link to='/register'>Register</Link></p>

                        </form>
                    </div>
                </div>
            </div>
        </div> 
        
    );
}

export default Login
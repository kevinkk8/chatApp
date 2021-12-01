import React, {useState} from "react";
import regImage from "../../assets/images/register.svg"
import './auth.scss'
import { Link } from "react-router-dom";

import {useDispatch} from 'react-redux'
import {register} from '../../store/actions/auth'

const Register = ({history}) => {

    const [firstName, setfirstName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState('')
    const [registration, setRegistration] = useState(localStorage.getItem('registration'))
    const dispatch = useDispatch()

    const reg = () => {
        if(registration){
            setRegistration(false)
            alert("Registration was successful. Please login to continue")
        }
    }

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(register({firstName,email,gender,password}, history))
        localStorage.setItem('registration', true)
        reg()
    }

    return (
        <div id = "auth-container">
            <div id = "auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={regImage} alt="Register" />
                    </div>
                    <br/>
                    <div id="form-section">
                        <h2>Create an account</h2>

                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input onChange={e => setfirstName(e.target.value)} value={firstName} required="required" type="text" placeholder='Username'></input>
                            </div>

                            <div className="input-field mb-1">
                                <input onChange={e => setEmail(e.target.value)} value={email} required="required" type="text" placeholder='Email'></input>
                            </div>

                            <div className="input-field mb-1">
                                <select onChange={e => setGender(e.target.value)} value={gender} required="required">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className='input-field mb-2'>
                                <input onChange={e => setPassword(e.target.value)} value={password} required="required" type="password" placeholder='Password'></input>
                            </div>

                            <button>Register</button>

                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register
import React, {useState, Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { logout } from "../../../../store/actions/auth";
import Modal from "../../modal/modal";
import { updateProfile } from "../../../../store/actions/auth";
import './navbar.scss'

const Navbar = ()=> {
    const dispatch = useDispatch()
    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const user = useSelector(state => state.authReducer.user)

    const [firstName, setfirstName] = useState(user.firstName)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        const form = {firstName, email, gender, avatar}
        if(password.length > 0) form.password = password

        const formData = new FormData()

        for(const key in form ){
            formData.append(key, form[key])
        }

        dispatch(updateProfile(formData)).then(() => {setShowProfileModal(false)}) 
    }

    return (
        <div id="navbar" className="card-shadow">
            <h2>ChatApp</h2>  
            <div onClick={()=> setShowProfileOptions(!showProfileOptions)} id="profile-menu">
                <img width = "40" height = "40" src={user.avatar} alt='Avatar' />
                <p>{user.firstName}</p>
                <FontAwesomeIcon icon='caret-down' className="fa-icons"/>

                {    
                    showProfileOptions &&
                    <div id="profile-options">
                        <p onClick={() => setShowProfileModal(true)}>Update_Profile</p>
                        <p onClick={()=> dispatch(logout()) }> Logout</p>
                    </div>
                }

                {
                    showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}> 
                        
                        <Fragment key="header">
                            <h3 className="mb-0">Update Profile</h3>

                        </Fragment>

                        <Fragment key="body">
                            <form>
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

                                <div className='input-field mb-2'>
                                    <input onChange={e => setAvatar(e.target.files[0])} type="file"></input>
                                </div>
                            </form>
                        </Fragment >

                        <Fragment key="footer">
                            <button className="btn-success" onClick={submitForm}>Update</button>
                        </Fragment>

                    </Modal>
                }
            </div>
        </div>
    );
}

export default Navbar
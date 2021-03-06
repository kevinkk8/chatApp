import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useSocket from "./hooks/socketConnect";
import Navbar from "./components/Navbar/navbar";
import FriendList from "./components/FriendList/FriendList";
import Messenger from "./components/Messenger/Messenger";
import './chat.scss'

const Chat = () => {

    const dispatch = useDispatch()
    const user = useSelector(state=>state.authReducer.user)

    useSocket(user, dispatch)
    
    return (
        <div id='chat-container'>
            <Navbar />
            <div id='chat-wrap'>
                <FriendList />
                <Messenger />
            </div>
        </div>
    );
}

export default Chat
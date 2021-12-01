import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Friend from '../Friend/Friends'
import { setCurrentChat } from '../../../../store/actions/chat'
import Modal from '../../modal/modal'
import './FriendList.scss'
import ChatService from '../../../../services/chatService'

const FriendList = () => {

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats)
    const socket = useSelector(state => state.chatReducer.socket)

    const [showFriendsModal, setShowFriendsModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat))
    }

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
            .then(res => setSuggestions(res))
    }

    const addNewFriend = (id) => {
        ChatService.createChat(id)
            .then(chats => {
                socket.emit('add-friend', chats)
                setShowFriendsModal(false)
            }).catch(err => console.log(err))
    }

    return (
        <div id = "friends" className="card-shadow">
            <div id="title">
                <h3 className="m-0">Friends</h3>
                <button onClick={()=> setShowFriendsModal(true)}>ADD</button>
            </div>

            <hr/>

            <div id='friends-box'>
                {
                    chats.length > 0 ? chats.map( chat => {
                        return <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
                    }) : <p id='no-chat'>No friends added</p>
                }
            </div>
            {
                showFriendsModal && 
                <Modal click={()=> setShowFriendsModal(false)}>
                    <Fragment key='header'>
                        <h3 className='m-0'>Create new chat</h3>
                    </Fragment>

                    <Fragment key='body'>
                        <p>Enter username</p>
                        <input onInput={e => searchFriends(e)} type='text' placeholder='Search...' />
                        <div id='suggestions'>
                            {
                                suggestions.map(user => {
                                    return <div key={user.id} className='suggestion'>
                                        <p className='m-0'>{user.firstName}</p>
                                        <button onClick={() => addNewFriend(user.id)}>Add</button>
                                    </div>
                                })
                            }
                        </div>
                </Fragment>
                </Modal>

            }
        </div>
    )
}

export default FriendList
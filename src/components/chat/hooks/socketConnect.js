import {useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {fetchChats, 
        onlineFriend, 
        onlineFriends, 
        offlineFriend, 
        setSocket, 
        receivedMessage, 
        senderTyping, 
        createChat, 
        addUserToGroup,
        leaveCurrentChat,
        deleteCurrentChat} from '../../../store/actions/chat'

function useSocket (user, dispatch) {
    useEffect (() => {

        dispatch(fetchChats())
            .then(res => {

            const socket = socketIOClient.connect('http://127.0.0.1:3000', {
                transports: [ 'websocket' ],
                upgrade: false
            })

            dispatch(setSocket(socket))

            socket.emit('join', user)

            socket.on('typing', (sender) => {
                dispatch(senderTyping(sender))
            })

            socket.on('friends', (friends) => {
                dispatch(onlineFriends(friends))
            })
            
            socket.on('online', (user) => {
                dispatch(onlineFriend(user))
            })

            socket.on('offline', (user) => {
                dispatch(offlineFriend(user))
            })

            socket.on('recieved', (message)=>{
                dispatch(receivedMessage(message, user.id))
            })

            socket.on('new-chat', (chat)=>{
                dispatch(createChat(chat))
            })

            socket.on('added-user-to-group', (group)=>{
                dispatch(addUserToGroup(group))
            })

            socket.on('remove-user-from-chat', (data)=>{
                data.currentUserId = user.id
                dispatch(leaveCurrentChat(data))
            })

            socket.on('delete-chat', (chatId) => {
                dispatch(deleteCurrentChat(chatId))
            })

        })
        .catch(err => console.log(err))    
    }, [dispatch, user])
}

export default useSocket
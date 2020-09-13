import React, { useEffect, useState } from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
export default function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user} , dispatch] = useStateValue();
    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().Name)));
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map((doc) => doc.data()))));
        }
    },[roomId])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chatHeader">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chatHeaderInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[0]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chatHeaderRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chatBody">
                {messages.map(message => (
                <p className={`chatMessage ${message.name === user.displayName && "chatReciever"}`}>
                <span className="chatName">{message.name}</span>
                    {message.message}
                <span className="chatTimestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
            </div>
            <div className="chatFooter">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat"
import db from './firebase';
function Sidebar() {
    const [seed, setSeed] = useState('');
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => setRooms(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))));
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidenarHeaderRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text"/>
                </div>
            </div>
            <div className="sidebarChats">
                <SidebarChat addNewChat/>
                {rooms.map((room) => (<SidebarChat key={room.id} id={room.id} name={room.data.Name} />))}
            </div>
        </div>
    );
};
export default Sidebar;
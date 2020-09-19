import React, { useState, useEffect } from 'react';
import './SidebarChat.scss';

import { Avatar, CardActionArea } from '@material-ui/core';

import db from '../../firebase';

import { useHistory } from 'react-router-dom';

const SidebarChat = ({ addNewChat, roomName, id, lastMessage }) => {
  const [seed, setSeed] = useState();
  const history = useHistory();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snap) => {
          setMessages(snap.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  const createChat = () => {
    const name = prompt('Please enter a new room name');
    if (!name.trim()) return;

    db.collection('rooms')
      .where('name', '==', name)
      .get()
      .then((doc) => {
        if (!doc.empty) return alert('Room already exists');
        db.collection('rooms').add({
          name,
        });
      });
  };

  return (
    <CardActionArea>
      {addNewChat ? (
        <div className='sidebarChat' onClick={createChat}>
          <h1>Add new Chat</h1>
        </div>
      ) : (
        <div
          className='sidebarChat'
          onClick={() => history.push(`/room/${id}`)}
        >
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='sidebarChat__info'>
            <h2>{roomName}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      )}
    </CardActionArea>
  );
};

export default SidebarChat;

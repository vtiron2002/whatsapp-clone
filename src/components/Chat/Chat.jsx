import React, { useState, useEffect, useRef } from 'react';
import './Chat.scss';

import { Avatar, IconButton } from '@material-ui/core';
import {
  MoreVert,
  SearchOutlined,
  AttachFile,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons';
import ChatMessage from '../ChatMessage/ChatMessage';

import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

const Chat = () => {
  const messagesBodyRef = useRef();
  const { roomId } = useParams();
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snap) => {
          if (snap.exists) {
            setRoom(snap.data().name);
          }
        });

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snap) => {
          setMessages(snap.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        name: user.displayName,
        message: messageInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    const el = messagesBodyRef.current;
    el.scrollTo({ left: 0, top: el.scrollHeight, behavior: "smooth" });

    setMessageInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar />
        <div className='chat__header__info'>
          <h2>{room}</h2>
          <p>Last seen {new Date().toLocaleString()}</p>
        </div>
        <IconButton children={<SearchOutlined />} />
        <IconButton children={<AttachFile />} />
        <IconButton children={<MoreVert />} />
      </div>

      <div className='chat__body' ref={messagesBodyRef}>
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            reciever={m.name === user.displayName}
            name={m.name}
            time={new Date(m.timestamp?.toDate()).toLocaleTimeString()}
            message={m.message}
          />
        ))}
      </div>

      <footer className='chat__footer'>
        <IconButton children={<InsertEmoticon />} />
        <form onSubmit={sendMessage}>
          <input
            type='text'
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder='Type a message'
          />
        </form>
        <IconButton children={<Mic />} />
      </footer>
    </div>
  );
};

export default Chat;

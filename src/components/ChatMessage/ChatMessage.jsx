import React from 'react';
import './ChatMessage.scss';

const ChatMessage = ({ name, time, message, reciever }) => {
  return (
    <p className={`chat__message ${reciever ? 'chat__reciever' : ''}`}>
      <span className='chat__name'>{name}</span>
      {message}
      <span className='chat__timestamp'>{time}</span>
    </p>
  );
};

export default ChatMessage;

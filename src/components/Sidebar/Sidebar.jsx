import React, { useEffect, useState } from 'react';
import './Sidebar.scss';

import { Avatar, IconButton } from '@material-ui/core';
import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
  ArrowBackIos,
} from '@material-ui/icons';
import SidebarChat from '../SidebarChat/SidebarChat';

import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

import { actionTypes } from '../../reducer';

const Sidebar = () => {
  const [{ user, sidebar }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot((snap) => {
      setRooms(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const closeSidebar = () => dispatch({ type: actionTypes.CLOSE_SIDEBAR });

  return (
    <div className={`sidebar ${sidebar ? 'open' : ''}`}>
      <div className='sidebar__header'>
        <Avatar src={user?.photoURL} />

        <div className='sidebar__headerRight'>
          <IconButton children={<DonutLarge />} />
          <IconButton children={<Chat />} />
          <IconButton className='options' children={<MoreVert />} />
          <IconButton
            onClick={closeSidebar}
            className='arrow'
            children={<ArrowBackIos />}
          />
        </div>
      </div>

      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>

      <div className='sidebar__chats'>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            roomName={room.data.name}
            lastMessage={''}
            closeSidebar={closeSidebar}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

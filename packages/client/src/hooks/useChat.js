import { useReducer, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
import useSocket from './useSocket';

const INIT_STATE = {};
const reducer = (state, [type, payload]) => {
  switch (type) {
    case 'ADD_ROOM':
      return { ...state, [payload._id]: { ...payload } };
    case 'FETCH_ROOMS':
      return { ...state, ...payload };
    case 'RESET':
      return { ...INIT_STATE };
    case 'ADD_MESSAGE': {
      const { roomId } = payload;
      const messages = state[roomId].messages
        ? [...state[roomId].messages, payload]
        : [payload];
      const room = { ...state[roomId], messages };
      return { ...state, [roomId]: room };
    }
    case 'FETCH_MESSAGE': {
      const { chats, roomId } = payload;
      const room = { ...state[roomId], messages: [...chats] };
      return { ...state, [roomId]: room };
    }
    default:
      throw new Error('No action');
  }
};
export default (token, userId) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const socket = useSocket(token);

  useEffect(() => {
    if (!socket) return () => {};
    socket.on('connect', () => {
      socket.emit('rooms-fetch', null, rooms => {
        const roomsData = rooms.reduce((p, c) => ({ ...p, [c._id]: c }), {});
        dispatch(['FETCH_ROOMS', roomsData]);
      });
    });
    socket.on('new-message', ({ chat }) => {
      dispatch(['ADD_MESSAGE', chat]);
    });

    socket.on('fetch-message', data => {
      dispatch(['FETCH_MESSAGE', data]);
    });
    // socket.on('room-message-create', ({ data }) => {
    //   setMessages(prevState => [...prevState, data]);
    // });

    // socket.on('reconnect', attemptNumber => {
    //   console.log(attemptNumber);
    // });
    socket.on('connect_error', err => console.log('connect_error', err));
    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const joinRoom = useCallback(
    roomId => {
      if (!socket) return;
      socket.emit('join-room', roomId, err => {
        if (err) {
          navigate('/');
        }
      });
    },
    [socket],
  );

  const sendMessage = (message, roomId) => {
    socket.emit('send-message', { message, roomId }, err => {
      if (err) {
        navigate('/');
      }
    });
  };

  const newGroup = () => {
    socket.emit('new-group', null, (err, room) => {
      if (err) console.log(err);
      if (room) dispatch(['ADD_ROOM', room]);
    });
  };

  const findFriend = (inviteCode) => {
    socket.emit('find-friend-code', { inviteCode }, (err, room) => {
      if (err) console.log(err);
      if (room) dispatch(['ADD_ROOM', room]);
      console.log(room);
    });
  };

  const addFriendToGroup = (roomId, inviteCode) => {
    socket.emit('add-to-group', { inviteCode, roomId }, (err, room) => {
      if (err) console.log(err);
      if (room) dispatch(['ADD_ROOM', room]);
      console.log(room);
    });
  };

  // useEffect(() => {
  //   if (!socket) return () => {};
  //   const connectHandler = async (room) => {
  //     try {
  //       setErrorSocket(null);
  //       setLoadingMessage(true);
  //       const { data } = await api(`message?roomId=${room._id}`, { token });
  //       setMessages(data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoadingMessage(false);
  //     }
  //   };
  //   socket.emit('join', { roomId }, (err) => {
  //     if (err) {
  //       console.log(err);
  //       navigate('/');
  //     }
  //   });
  //   socket.on('room-connect', connectHandler);
  //   return () => {
  //     socket.emit('leave', { roomId }, err => {
  //       console.log(err);
  //     });
  //   };
  // }, [socket, roomId, token]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on('typing-user', ({ data }) => {
  //     setTypingUsers(data.filter(u => u !== userId));
  //   });
  // }, [socket, userId]);

  return {
    socket,
    state,
    dispatch,
    joinRoom,
    sendMessage,
    newGroup,
    findFriend,
    addFriendToGroup,
  };
};

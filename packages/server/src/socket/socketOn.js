const typingUsers = new Set();

export const socketDisconnect = (socket, username) => (reason) => {
  const message = `${username} has disconnected`;
  socket.broadcast.emit('new-disconnect', {
    message,
    reason,
    data: {
      username,
    },
  });
  if (typingUsers.has(username)) {
    typingUsers.delete(username);
    socket.broadcast.emit('typing-user', {
      data: new Array(...typingUsers),
    });
  }
};

export const socketTyping = (socket) => ({ username, stop }) => {
  if (stop) {
    typingUsers.delete(username);
  } else {
    typingUsers.add(username);
  }
  socket.broadcast.emit('typing-user', {
    data: new Array(...typingUsers),
  });
};

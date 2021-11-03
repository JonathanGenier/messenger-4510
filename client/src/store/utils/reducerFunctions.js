export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;

  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unread: 1
    };

    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      let convoCopy = { ...convo }
      convoCopy.latestMessageText = message.text
      convoCopy.messages.push(message)
      
      // If the current user is the recipient
      if (message.senderId === convo.otherUser.id) {
        convoCopy.unread++
      } else {
        convoCopy.otherUser.unread++
      }
      
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateMessagesToStore = (state, payload) => {
  const { conversation } = payload;

  return state.map((convo) => {
    if (convo.id === conversation.id) {
      let convoCopy = { ...convo }  
      convoCopy.messages = conversation.messages

      // If this is true, then the updates comes from the other client (from socket).
      if (conversation.otherUser.id !== convo.otherUser.id) {
        convoCopy.otherUser.unread = 0
      } else {
        convoCopy.unread = 0 
        convoCopy.messages.forEach(message => {
          message.read = true
        })
      }

      return convoCopy  
    }
    
    return convo
  })
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      let convoCopy = { ...convo }
      convoCopy.id = message.conversationId
      convoCopy.latestMessageText = message.text
      convoCopy.messages.push(message)
      convoCopy.unread = 0
      convoCopy.otherUser.unread = 1
      return convoCopy;
    } else {

      return convo;
    }
  });
};

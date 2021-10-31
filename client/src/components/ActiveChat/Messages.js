import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { putMessages } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { conversation, userId, putMessages } = props;
  const { messages, otherUser } = conversation

  const handlePut = async (unreadMessages) => {
    let reqBody = { 
      messages, 
      messagesToUpdate: unreadMessages, 
      conversationId: conversation.id 
    }

    await putMessages(reqBody);
  }

  let unreadMessages = []
  messages.forEach(message => {
    if (message.senderId !== userId && !message.read) {
      unreadMessages.push(message)
      unreadMessages[unreadMessages.length - 1].read = true
    }
  });

  if (unreadMessages.length > 0) {
    handlePut(unreadMessages)
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putMessages: (reqBody) => {
      dispatch(putMessages(reqBody));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
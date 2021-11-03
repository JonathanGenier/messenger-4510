import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import AvatarNotification from './AvatarNotification'

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, isLastMessage } = props;

  const renderAvatarNotification = () => {
    if(isLastMessage && otherUser.unread === 0) {
      return <AvatarNotification username={otherUser.username} photoUrl={otherUser.photoUrl} online={true} />
    }

    return <></>
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {renderAvatarNotification()}
    </Box>
  );
};

export default SenderBubble;

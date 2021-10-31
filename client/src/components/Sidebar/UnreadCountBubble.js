import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    margin: "0 20px 0 0"
  },
  text: {
    fontSize: 14,
    color: "white",
    letterSpacing: -0.2,
    padding: "3px 10px",
    fontWeight: "bold"
  },
  bubble: {
    background: " #3A8DFF",
    borderRadius: "25px"
  }
}));

const UnreadCountBubble = (props) => {
  const classes = useStyles();
  const { messages, otherUser } = props

  let unreadCount = 0
  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].read && messages[i].senderId === otherUser.id) {
      unreadCount++
    }
  }

  if (unreadCount === 0)
    return (<></>)

  return (
    <Box className={classes.root}>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{unreadCount}</Typography>
      </Box>
    </Box>
  );
};

export default UnreadCountBubble;
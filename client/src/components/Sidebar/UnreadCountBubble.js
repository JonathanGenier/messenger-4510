import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { theme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
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
  const { conversation } = props

  return (
    conversation.unread !== undefined && conversation.unread !== 0 && 
    <Box className={classes.root}>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{conversation.unread}</Typography>
      </Box>
    </Box>
  );
};

export default UnreadCountBubble;
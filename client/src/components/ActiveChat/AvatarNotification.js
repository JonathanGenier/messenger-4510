import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 15,
    width: 15
  },
}));

const UserAvatar = (props) => {
  const classes = useStyles();
  const { username, photoUrl } = props;

  return (
    <Avatar alt={username} src={photoUrl} className={classes.profilePic}></Avatar>
  );
};

export default UserAvatar;
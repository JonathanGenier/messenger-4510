const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, read, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, read });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// Update a message's text OR a message's read status.
router.put("/read-status", async (req, res, next) => {
  try {
    if (!req.body.conversationId || !req.body.usersId) {
      return res.sendStatus(400)
    }

    const {conversationId, usersId} = req.body
    let convo = await Conversation.findConversation(
      usersId.currentUser,
      usersId.otherUser
    );

    if (!convo || convo.dataValues.id !== conversationId) {
      return res.sendStatus(403)
    }

    await Message.update({
      read: true
    }, 
    { where: 
      { 
        conversationId,
        senderId: usersId.otherUser
      },
      returning: true
    });

    return res.sendStatus(204)
  } catch (error) {
    next(error);
  }
})

module.exports = router;

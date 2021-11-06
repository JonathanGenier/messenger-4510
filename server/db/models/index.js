const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Status = require("./status")

// associations

User.belongsToMany(Conversation, { through: 'conversation_users'});
Conversation.belongsToMany(User, {through: 'conversation_users'});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.hasMany(Status)
Message.hasMany(Status)

module.exports = {
  User,
  Conversation,
  Message
};

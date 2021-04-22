const connection = require('../../models/connection');

const getAllMessages = async (email) => {
  const messages = await connection()
    .then((db) => db.collection('messages')
    .find({ email })
    .toArray());
  return messages;
};

const createMessage = async (email, message, date) => {
  const newMessage = await connection()
    .then((db) => db.collection('messages').insertOne({ email, message, date }));
  return (newMessage.ops[0]);
};

module.exports = {
  getAllMessages,
  createMessage,
};
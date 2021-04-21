const { users } = require('../models/sql/models');
const { generateToken } = require('../security');
const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const create = async (body) => {
  const data = { ...body };
  const { name, email } = data;

  const isEmailAvailable = await users.findOne({ where: { email } });
  authRegisterUser(data, isEmailAvailable);

  data.role = (data.isVendor) ? 'administrator' : 'client';
  const { dataValues: { id: newUserId } } = await users.create(data);
  console.log('novo user: ', newUserId);

  const token = generateToken(newUserId, data.role);
  const { role } = data;
  return { name, email, token, role };
};

const updateName = async (name, id) => {
  validateUserName(name);
  return users.update({ name }, { where: { id } });
};

module.exports = {
  create,
  updateName,
};

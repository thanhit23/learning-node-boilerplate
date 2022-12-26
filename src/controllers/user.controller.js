const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async ({ body }, res) => {
  const user = await userService.createUser(body);
  res.success(user);
});

const getUsers = catchAsync(async ({ query }, res) => {
  const filter = pick(query, ['name', 'role']);
  const options = pick(query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.success(result);
});

const getUser = catchAsync(async ({ params: { id } }, res) => {
  const user = await userService.getUserById(id);
  res.success(user);
});

const updateUser = catchAsync(async ({ params: { id }, body }, res) => {
  const user = await userService.updateUserById(id, body);
  res.success(user);
});

const deleteUser = catchAsync(async ({ params: { id } }, res) => {
  await userService.deleteUserById(id);
  res.success();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

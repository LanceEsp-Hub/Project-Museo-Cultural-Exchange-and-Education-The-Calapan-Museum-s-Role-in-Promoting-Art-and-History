const { Users } = require('../models/userModel'); // Users model

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.json({
      success: true,
      message: 'Users fetched successfully!',
      users: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users.',
      error: error.message,
    });
  }
};

// Controller to update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.updateUser(req.params.id, req.body);
    res.json({
      success: true,
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update the user.',
      error: error.message,
    });
  }
};
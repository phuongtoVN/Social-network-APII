const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Thought = require('../../models/thought');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a single user by _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = new User({ username, email });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT to update a user by _id
router.put('/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE to remove a user by _id
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ username: deletedUser.username });
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
      const { userId, friendId } = req.params;
  
      // Check if the userId and friendId exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      // Add friendId to the user's friends array
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Check if the userId and friendId exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }

    // Remove friendId from the user's friends array
    const friendIndex = user.friends.indexOf(friendId);
    if (friendIndex !== -1) {
      user.friends.splice(friendIndex, 1);
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
  

module.exports = router;
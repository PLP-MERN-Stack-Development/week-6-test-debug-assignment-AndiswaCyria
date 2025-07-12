const Bug = require('../models/bugModel');

// Create bug
const createBug = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const bug = await Bug.create({ title, description });
    res.status(201).json(bug);
  } catch (error) {
    console.error('Error creating bug:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Get all bugs
const getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.status(200).json(bugs);
};

// Update bug
const updateBug = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const bug = await Bug.findById(id);
  if (!bug) return res.status(404).json({ message: 'Bug not found' });

  bug.status = status;
  const updatedBug = await bug.save();
  res.status(200).json(updatedBug);
};

// Delete bug
const deleteBug = async (req, res) => {
  const { id } = req.params;

  const bug = await Bug.findByIdAndDelete(id);
  if (!bug) return res.status(404).json({ message: 'Bug not found' });

  res.status(200).json({ message: 'Bug deleted' });
};

// ✅ Export all defined functions
module.exports = {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
};

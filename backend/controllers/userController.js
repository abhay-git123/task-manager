const User = require("../models/User");

const updateProfile = async (
  req,
  res
) => {
  try {

    const user =
      await User.findByIdAndUpdate(
        req.userId,
        {
          name: req.body.name
        },
        {
          new: true
        }
      ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  updateProfile
};
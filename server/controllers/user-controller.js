const { User, Journal } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {
    async getUser({ user = null, params }, res) {
      // Find user based on id or username
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.userId }, { username: params.username }],
        }).populate("journals");
    
        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
        res.json(foundUser);
      },
    async getAllUsers(req, res){
      // Return all users, without journals populated.
        const allUsers = await User.find()
        if (!allUsers) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
          }
        res.json(allUsers);
    },
    async createUser({ body }, res) {
      // Creating a user
        const user = await User.create(body);
    
        if (!user) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }
        // Creating a daily journal for the user. 
        const dailyJournal = await Journal.create({
            authorName: body.username,
            journalName: "ψ Daily Journal ж",
            desc: `A Daily Journal by @${body.username}`,
            isDaily: true,
            isPublic: true,
        })

        if (!dailyJournal) {
            return res.status(400).json({ message: 'Daily Journal not created!' });
        }
        // Appending the created journal to the users document.
        const updatedUser = await User.findOneAndUpdate(
            {_id: user._id},
            {$addToSet: {journals: dailyJournal._id}},
            { runValidators: true, new: true }
        )

        const token = signToken(updatedUser);
        res.json({ token, updatedUser, dailyJournal });
      },
    async login({ body }, res) {
      // Login controller
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
          return res.status(400).json({ message: "Can't find this user!" });
        }
    
        const correctPw = await user.isCorrectPassword(body.password);
    
        if (!correctPw) {
          return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
      },
    async updateUser({user, body}, res) {
      // Updating user information.
        const updatedUser = await User.findOneAndUpdate(
            {_id: user._id},
            { $set: body },
            { runValidators: true, new: true }
        );
        if (!updatedUser) {
          return res.status(400).json({ message: 'User was not updated!' });
        }
        // Updating the author name in each journal to match the updated user info.
        for (let i = 0; i < updatedUser.journals.length; i++) {
          const journal = await Journal.findOneAndUpdate(
            { _id: updatedUser.journals[i]._id },
            { $set: {authorName: updatedUser.username} },
            { runValidators: true, new: true }
          )
          if (!journal) {
            return res.status(400).json({ message: 'Journal was not updated!' });
          }
        }
        return res.json(updatedUser);
    },
    async addJournal({user, params}, res) {
      // Create a new journal
      const journal = await Journal.findById(params.journalId)
      if (!journal) {
        return res.status(400).json({ message: 'No journal to add!' });
      }
      // Add the journal to the user that is logged in.
      const updatedUser = await User.findOneAndUpdate(
          {_id: user._id},
          {$addToSet: {journals: params.journalId}},
          { runValidators: true, new: true }
      )
      if (!updatedUser) {
        return res.status(400).json({ message: 'Journal was not added' });
      }
      return res.json(updatedUser)
    }
}
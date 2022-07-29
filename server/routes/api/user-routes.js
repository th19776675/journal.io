const router = require('express').Router();

const {
    createUser,
    updateUser,
    getUser,
    getUsername,
    getAllUsers,
    login,
    addJournal,
    getJournalUser,
    addFriend,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).get(getAllUsers).put(authMiddleware, updateUser);

router.route('/login').post(login);

router.route('/journal/:journalId').put(addJournal).get(getJournalUser);

router.route('/:userId').get(getUser);

router.route('/add/:username').post(authMiddleware, addFriend)

router.route('/username/:username').get(getUsername)

module.exports = router;




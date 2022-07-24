const router = require('express').Router();

const {
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    login,
    addJournal
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).get(getAllUsers).put(authMiddleware, updateUser);

router.route('/login').post(login);

router.route('/journal/:journalId').put(addJournal);

router.route('/:userId').get(getUser);

module.exports = router;




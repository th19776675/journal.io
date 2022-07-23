const router = require('express').Router();

const {
    createUser,
    updateUser,
    getUser,
    login,
    addJournal
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, updateUser);

router.route('/login').post(login);

router.route('/journal/:journalId').post(addJournal);

router.route('/:userId').get(getUser);



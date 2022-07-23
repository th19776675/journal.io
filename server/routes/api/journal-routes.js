const router = require('express').Router();

const {
    createJournal,
    updateJournal
} = require('../../controllers/journal-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createJournal);

router.route('/:journalId').get(authMiddleware, getJournal).put(authMiddleware, updateJournal).delete(authMiddleware, deleteJournal);

router.route('/page').post(authMiddleware, addPage)

router.route('/page/:pageId').get(authMiddleware, getPage);




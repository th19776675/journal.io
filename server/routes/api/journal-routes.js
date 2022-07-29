const router = require('express').Router();

const {
    createJournal,
    getAllJournals, 
    getDailyJournal,
    getJournal,
    updateJournal,
    deleteJournal,
    createPage,
    getPage,
    addPage,
} = require('../../controllers/journal-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(authMiddleware, createJournal).get(getAllJournals);

router.route("/daily").get(authMiddleware, getDailyJournal)

router.route('/:journalId').get(authMiddleware, getJournal).put(authMiddleware, updateJournal).delete(authMiddleware, deleteJournal);

router.route('/:journalId/page').post(authMiddleware, createPage)

router.route('/page/:pageId').get(getPage).post(authMiddleware, addPage);

module.exports = router;




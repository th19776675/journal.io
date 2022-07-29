const router = require('express').Router();

const {
    createJournal,
    getAllJournals, 
    getDailyJournal,
    getJournal,
    getCleanJournal,
    updateJournal,
    deleteJournal,
    createPage,
    getPage,
    addPage,
    getDailyPages,
} = require('../../controllers/journal-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(authMiddleware, createJournal).get(getAllJournals);

router.route("/daily").get(authMiddleware, getDailyJournal)

router.route("/daily/pages").get(authMiddleware, getDailyPages)

router.route('/:journalId').get(authMiddleware, getJournal).put(authMiddleware, updateJournal).delete(authMiddleware, deleteJournal);

router.route('/clean/:journalId').get(authMiddleware, getCleanJournal)

router.route('/:journalId/page').post(authMiddleware, createPage)

router.route('/page/:pageId').get(authMiddleware, getPage).post(authMiddleware, addPage);

module.exports = router;




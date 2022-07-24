const router = require('express').Router();
const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');

router.use('/user', userRoutes);
router.use('/journal', journalRoutes);
// router.use('/template', templateRoutes);

module.exports = router;

const router = require('express').Router();
const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');

router.use('/users', userRoutes);
router.use('/journals', journalRoutes);
// router.use('/templates', templateRoutes);

module.exports = router;

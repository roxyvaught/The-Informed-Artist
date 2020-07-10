const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const picRoutes = require('./pic-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/pics', picRoutes);

module.exports = router;
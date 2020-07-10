const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const editRoutes = require('./edit-routes.js');

const apiRoutes = require('./api');

router.use('/edit', editRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
   res.status(404).end();
});

module.exports = router;
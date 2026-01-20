const {Router} = require('express'); 
const fetchSizes = require('../controllers/Size');
const router = Router() 
router.get('/',fetchSizes)

module.exports = router;
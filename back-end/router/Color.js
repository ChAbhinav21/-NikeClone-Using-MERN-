const {Router} = require('express');
const { fetchColors } = require('../controllers/Color'); 
const router = Router() 
router.get('/',fetchColors)

module.exports = router;
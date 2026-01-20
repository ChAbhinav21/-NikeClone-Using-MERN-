const {Router} = require('express');  
const fetchCategory = require('../controllers/Category');
const router = Router() 
router.get('/',fetchCategory)

module.exports = router;
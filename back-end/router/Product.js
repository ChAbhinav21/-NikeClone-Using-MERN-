// back-end/router/Product.js 
const {Router} = require('express')
const {createProduct,fetchProducts,updateProductById,deleteProductById} = require('../controllers/Product')
const router = Router();

router.post('/',createProduct)
.get('/',fetchProducts)
.patch('/:id',updateProductById)
.delete('/:id',deleteProductById)

module.exports = router
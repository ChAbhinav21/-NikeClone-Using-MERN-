// back-end/router/Product.js 
const {Router} = require('express')
const {createProduct,fetchProducts,updateProductById,deleteProductById, fetchProductById} = require('../controllers/Product')
const router = Router();

router.post('/',createProduct)
.get('/',fetchProducts)
.get('/:id',fetchProductById)
.patch('/:id',updateProductById)
.delete('/:id',deleteProductById)

module.exports = router
// back-end/controllers/Product.js
const { Product } = require('../model/Product');
const createProduct = async (req, res) => {

    const product = new Product(req.body);
    if (!product.title || !product.price) {
        return res.status(400).json({ message: "Missing required fields" });
    } 
    console.log(product)
    try {
        const docs = await product.save();
        return res.status(201).send(docs);
    } catch (err) {
        console.error("SAVE ERROR:", err.message);
        return res.status(400).json({
            message: err.message,
            errors: err.errors
        });
    }

}

const fetchProducts = async (req, res) => {
    try {
        let query = Product.find({});
        console.log(req.query)
 if(req.query.colors){
    query = query.find({colors:{$elemMatch:{name:{$in:req.query.colors.split(",") }}}})  
}
if(req.query.kids){
    query = query.find({kids:{$in:req.query.kids.split(",")}})
}
if(req.query.gender){
    query = query.find({gender:{$in:req.query.gender.split(",")}})
}
if(req.query.category){ 
    query = query.find({category:{$in:req.query.category.split(",")}})
}
if(req.query.size){
   query = query.find({sizes:{$in:req.query.size.split(",")}})
}
if(req.query._sort && req.query._order){
   query = query.sort({
    [req.query._sort]:req.query._order
   })
}
        const docs = await query.exec();
        return res.status(200).json(docs);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true })
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const deleteProductById = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id );
        if(!product)return res.status(404).send("Product does not Exist");
        res.status(200).json(`Product ${product.title} deleted sucessfully `)
    }catch(err){
        return res.status(500).send(err);
    }
}

module.exports = { createProduct, fetchProducts, updateProductById,deleteProductById }


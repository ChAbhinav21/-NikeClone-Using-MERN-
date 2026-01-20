const Category = require('../model/Category')

const fetchCategory = async (req,res)=>{
    try{
        const category = await Category.find({}).exec();
        if(!category)return res.status(404).json({'msg':'no category found'})
        return res.status(200).json(category)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports=fetchCategory;
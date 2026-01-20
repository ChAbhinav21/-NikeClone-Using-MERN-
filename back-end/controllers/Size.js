const Size = require('../model/Size')

const fetchSizes = async (req,res)=>{
      try{
        const sizes = await Size.find({}).exec();
        if (!sizes.length) {
  return res.status(404).json({ message: 'No sizes found' });
}

        res.status(200).json(sizes)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
}
module.exports =fetchSizes
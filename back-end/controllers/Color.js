const Color = require('../model/Color')

const fetchColors = async (req,res)=>{
      try{
        const colors = await Color.find({}).exec();
        if (!colors.length) {
  return res.status(404).json({ message: 'No colors found' });
}

        res.status(200).json(colors)
      }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
}
module.exports ={fetchColors}
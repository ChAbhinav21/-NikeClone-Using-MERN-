// back-end/service/auth.js
const User  =  require('../model/user')
const jwt = require('jsonwebtoken')
const secret = "nikeclone@2026"

function setToken(user){
  const payload = {
    _id:user._id,
    email:user.email,
    role:user.role
    }
    
   return jwt.sign(payload,secret,{expiresIn:'7d'})
}

async function getUser(token){
  if(!token) return null;
  try{
      const decode = jwt.verify(token,secret)
      const user = await User.findById(decode._id)
      return user||null
  }catch(err){
    return null;
  }
}

module.exports = {setToken,getUser}

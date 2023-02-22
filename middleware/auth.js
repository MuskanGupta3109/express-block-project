const jwt=require('jsonwebtoken')
const AdminModel= require('../models/admin')

const admin_auth=async(req,res,next)=>{
    try{
        //console.log('hello admin')
        const{token }=req.cookies
        //console.log(token)
        const verify_token=jwt.verify(token,'muskanshanu123')
        console.log(verify_token)
        const admin_data=await AdminModel.findOne({_id:verify_token.id})
        //console(admin_data)
        req.admin=admin_data

        next()

    }
    catch(error){
        res.redirect('/login')
    }
    

}



module.exports=admin_auth
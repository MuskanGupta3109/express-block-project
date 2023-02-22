const { findById } = require('../../models/contact');
const ContactModel=require('../../models/contact')

class ContactController{
    static contact_display=async(req,res)=>{
        const data=await ContactModel.find()
        // console.log(data)
        res.render('admin/contact/contact_display',{d:data})
    }
    static contactinsert=async(req,res)=>{
         console.log('hello')
        //console.log(req.body)
        //console.log(imagefile)
        // const imagefile=req.files.blog_image
        // console.log(imagefile)
        // const myCloud=await cloudinary.uploader.upload(imagefile.tempFilePath,{
        //     folder:'blogimage',
            //width:400,
       // })
       
        try{
             const result=new ContactModel({
                 name:req.body.name,
                 email:req.body.email,
                 phone:req.body.phone,
                 message:req.body.message,
                 //image:myCloud.secure_url
                    // image:{
                    //     public_id:myCloud.public_id,
                    //     url:myCloud.secure_url,
                    // },
             })
             await result.save()
             //route url(app.js) in redirect
             res.redirect('/admin/contact_display')
         }catch(err){
             console.log(err)
         }
    };
    static contactview=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await ContactModel.findById(req.params.id)
             //console.log(result)
             res.render('admin/contact/contactview',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };
     static contactedit=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await ContactModel.findById(req.params.id)
             //console.log(result)
             res.render('admin/contact/contactedit',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };
     static contactupdate=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             
            //console.log(req.params.id)
            //console.log(req.body)

            // below are for previous image delete when update
            const contactdata=await ContactModel.findById(req.params.id)
            //console.log(blogdata)
           
            const result=await ContactModel.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
            })
            await result.save();
            res.redirect('/admin/contact_display');
        }
        catch(err){
            console.log(err);
        
        }
     }
     static contactdelete=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await ContactModel.findByIdAndDelete(req.params.id)
             //console.log(result)
             //res.render('admin/blog/blogedit',{b:result})
             res.redirect('/admin/contact_display');

        }
        catch(err){
         console.log(err);
        }
     }



};
module.exports=ContactController
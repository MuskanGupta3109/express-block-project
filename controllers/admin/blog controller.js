var cloudinary = require('cloudinary').v2;
const { findById } = require('../../models/Blog');
const BlogModel=require('../../models/Blog')


cloudinary.config({ 
    cloud_name:'dex2jplfd', 
    api_key: '526239736128397', 
    api_secret: 'vpQyR5T_1T7UQyRtQ02WM2BDM90',
    
  })


class Blogcontroller{
    static blogdisplay=async(req,res)=>{
        const data=await BlogModel.find()
        // console.log(data)
        res.render('admin/blog/blogdisplay',{d:data})
    }
    static bloginsert=async(req,res)=>{
        // console.log('hello')
        //console.log(req.body)
        //console.log(imagefile)
        const imagefile=req.files.image
        console.log(imagefile)
        const myCloud=await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:'blogimage',
            //width:400,
        })
       
        try{
             const result=new BlogModel({
                 title:req.body.title,
                 description:req.body.description,
                 //image:myCloud.secure_url
                    image:{
                        public_id:myCloud.public_id,
                        url:myCloud.secure_url,
                    },
             })
             await result.save()
             //route url(app.js) in redirect
             res.redirect('/admin/blogdisplay')
         }catch(err){
             console.log(err)
         }
    };
    static blogview=async(req,res)=>{
       // console.log(req.params.id)  //id get by params
       try{
            const result=await BlogModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/blog/blogview',{b:result})
       }
       catch(err){
        console.log(err);
       }
    }
    static blogedit=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await BlogModel.findById(req.params.id)
             //console.log(result)
             res.render('admin/blog/blogedit',{b:result})
        }
        catch(err){
         console.log(err);
        }
     }
     static blogupdate=async(req,res)=>{
            // console.log(req.params.id)  //id get by params
        try{
             
            //console.log(req.params.id)
            //console.log(req.body)

            // below are for previous image delete when update
            const blogdata=await BlogModel.findById(req.params.id)
            //console.log(blogdata)
            const imageid=blogdata.image.public_id
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            //below code for update the image
            const imagefile=req.files.image;
            //console.log(imagefile)
            const myCloud=await cloudinary.uploader.upload(imagefile.tempFilePath,{
                folder:'blogimage',
                //width:400,
            });

           


            const result=await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            })
            await result.save();
            //route url(app.js) in redirect
            res.redirect('/admin/blogdisplay');
             
        } catch(err){
         console.log(err);
        }
     }
     static blogdelete=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await BlogModel.findByIdAndDelete(req.params.id)
             //console.log(result)
             //res.render('admin/blog/blogedit',{b:result})
             res.redirect('/admin/blogdisplay');

        }
        catch(err){
         console.log(err);
        }
     }
};
module.exports=Blogcontroller
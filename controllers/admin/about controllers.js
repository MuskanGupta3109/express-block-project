const { findById } = require('../../models/about');
const AboutModel=require('../../models/about')


class AboutController{
    static aboutdisplay=async(req,res)=>{
        const data=await AboutModel.find()
        console.log(data)
        res.render('admin/about/aboutdisplay',{d:data})
    }
    static aboutinsert=async(req,res)=>{
        try{
            const result=new AboutModel({
                about:req.body.about,
               

            })
            await result.save()
            res.redirect('/admin/aboutdisplay')
        }catch(err){
            console.log(err)
        }
    };

    static aboutview=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await AboutModel.findById(req.params.id)
             //console.log(result)
             res.render('admin/about/aboutview',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };

     static aboutedit=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await AboutModel.findById(req.params.id)
             //console.log(result)
             res.render('admin/about/aboutedit',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };

     static aboutupdate=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             
            //console.log(req.params.id)
            //console.log(req.body)

            // below are for previous image delete when update
            const aboutdata=await AboutModel.findById(req.params.id)
            //console.log(blogdata)
           
            const result=await AboutModel.findByIdAndUpdate(req.params.id,{
                about:req.body.about,
                // description:req.body.description
            })
            await result.save();
            res.redirect('/admin/aboutdisplay');
        }
        catch(err){
            console.log(err);
        
        }
     }

     static aboutdelete=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await AboutModel.findByIdAndDelete(req.params.id)
             //console.log(result)
             //res.render('admin/blog/blogedit',{b:result})
             res.redirect('/admin/aboutdisplay');

        }
        catch(err){
         console.log(err);
        }
     }

            

};

module.exports=AboutController
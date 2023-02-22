const { findById } = require('../../models/category');
const Categorymodel=require('../../models/category')






class Categorycontroller{
    static categorydisplay=async(req,res)=>{
        const data=await Categorymodel.find()
        console.log(data)
        res.render('admin/category/categorydisplay',{d:data})
    }
    static categoryinsert=async(req,res)=>{
        try{
            const result=new Categorymodel({
                catname:req.body.catname,
                description:req.body.description

            })
            await result.save()
            res.redirect('/admin/categorydisplay')
        }catch(err){
            console.log(err)
        }
    };

    static categoryview=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await Categorymodel.findById(req.params.id)
             //console.log(result)
             res.render('admin/category/categoryview',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };

     static categoryedit=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await Categorymodel.findById(req.params.id)
             //console.log(result)
             res.render('admin/category/categoryedit',{b:result})
        }
        catch(err){
         console.log(err);
        }
     };

     static categoryupdate=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             
            //console.log(req.params.id)
            //console.log(req.body)

            // below are for previous image delete when update
            const categorydata=await Categorymodel.findById(req.params.id)
            //console.log(blogdata)
           
            const result=await Categorymodel.findByIdAndUpdate(req.params.id,{
                catname:req.body.catname,
                description:req.body.description
            })
            await result.save();
            res.redirect('/admin/categorydisplay');
        }
        catch(err){
            console.log(err);
        
        }
     }

     static categorydelete=async(req,res)=>{
        // console.log(req.params.id)  //id get by params
        try{
             const result=await Categorymodel.findByIdAndDelete(req.params.id)
             //console.log(result)
             //res.render('admin/blog/blogedit',{b:result})
             res.redirect('/admin/categorydisplay');

        }
        catch(err){
         console.log(err);
        }
     }

            

           


};

module.exports=Categorycontroller
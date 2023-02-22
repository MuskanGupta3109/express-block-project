const BlogModel=require('../models/Blog')
const categorymodel=require('../models/category')
const AdminModel=require('../models/admin')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const ContactModel = require('../models/contact');
const AboutModel=require('../models/about');
class FrontController{
    static home=async(req,res)=>{
        // res.send("hello home")
        const data=await BlogModel.find()
        console.log('homes')
        res.render('home',{d:data})

    }
    static about=async(req,res)=>{
        // res.send("hello about")
        const data=await AboutModel.find()
        res.render('about',{d:data})
    }
    static contact=async(req,res)=>{
        // res.send("hello team")
        const data=await ContactModel.find()
        console.log('homes')
        res.render('contact',{d:data})
    }

    static sign=(req,res)=>{
        res.send("hello sign")
    }

    static blog=async(req,res)=>{
        const data=await BlogModel.find()
        console.log('blog')
        res.render('blog',{d:data})
    }
    


    static blogdetail=async(req,res)=>{
        try{
            const category=await categorymodel.find()
            const recentblog=await BlogModel.find()
            const result=await BlogModel.findById(req.params.id);
            console.log(result)
            res.render('blogdetail',{r:result,recentblog:recentblog,cat:category});

        }
        catch(err){
            console.log(err)
        }
    }

// admin login
static login=(req,res)=>{
    
    res.render('login',{message:req.flash('success'),message1:req.flash('error')});
}

static adminregister=async(req,res)=>{

    res.render('register',{message: req.flash('error')})
}
static admininsert=async(req,res)=>{
    try{
        //console.log(req.body)
        const{name,email,password,cpassword}=req.body
        const admin=await AdminModel.findOne({email:email})//first email is schea wala h or second const k andar email wala hai
        //console.log(admin)
        if(admin){
            req.flash('error','email already exists')
            res.redirect('/register')
        }
        else{
            if(name && email && password && cpassword){
                if(password==cpassword){
                    try{
                        const hashpassword=await bcrypt.hash(password,10)
                        const result=await AdminModel({
                            name:name,
                            email:email,
                            password:hashpassword
                            })
                            await result.save();
                            req.flash('success','registration successsful please login');
                            res.redirect("/login");
                    }
                    catch(err){
                        console.log(err);
                    }
                }else{
                    req.flash('error','password and confirm password does not match')
                    res.redirect('/register')
                }
            }else{
                req.flash('error','All fields are required')
                res.redirect('/register')
            }
        }
    //     const result=await AdminModel({
    //         name:name,
    //         email:email,
    //         password:password
    //     })
    //     await result.save();
    //     res.redirect("/login")
    }
    catch(err){
        console.log(err)
    }
};

static verify_login=async(req,res)=>{
    try{
        console.log(req.body)
        const{email,password}=req.body
        if(email && password){
            const admin=await AdminModel.findOne({email:email})
            if(admin != null){
                const ismatched=await bcrypt.compare(password,admin.password)//phla password jo user enter krega or second waala jo database m pda h 
                if(ismatched){
                    //token generate
                    const token = jwt.sign({id: admin._id }, 'muskanshanu123');
                    //console.log(token)
                    res.cookie('token',token)
                    res.redirect('/admin/dashboard')
                }
                else{
                    req.flash("error","email or password not matched")
                    res.redirect('/login')
                }
            }else{
                req.flash("error","you are not registerd")
                res.redirect('/login')
            }
        }
        else{
            req.flash('error','password and confirm password does not match')
            res.redirect('/login')
        }
    }
    catch(err){
    console.log(err)
    }


    }

    static logout=async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }
        catch(err){
            console.log(err)
        }
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
            // res.redirect('/admin/contact_display')
            res.redirect('/contact')
        }catch(err){
            console.log(err)
        }
   };
}

module.exports=FrontController

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDAxYjVjODU5ZWU2OWM1NTJmNzlhYiIsImlhdCI6MTY3NDcxNzE0Nn0.8pZDzLQJ1DRZY6_8Z0Ez5QmrLWI7r6q4I2642a36riI
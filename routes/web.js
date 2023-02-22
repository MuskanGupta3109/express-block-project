const express=require('express')
const router=express.Router()
const AdminController = require('../controllers/admin/admin controllers')
const Blogcontroller = require('../controllers/admin/blog controller')
const FrontController=require('../controllers/frontcontroller')
const Categorycontroller=require('../controllers/admin/category controller')
const admin_auth=require('../middleware/auth')
const ContactController = require('../controllers/admin/contact controller')
const AboutController =require('../controllers/admin/about controllers')
//route
//frontend controller




router.get("/",FrontController.home)//path
router.get("/about",FrontController.about)//path
router.get("/contact",FrontController.contact)//path
router.get("/sign",FrontController.sign)//path
router.get("/blog",FrontController.blog)//path
router.get("/login",FrontController.login)//path
router.get('/blogdetail/:id',FrontController.blogdetail)//path
router.get('/register',FrontController.adminregister)
router.post('/adminregister',FrontController.admininsert)
router.post('/verify_login',FrontController.verify_login)
router.get('/logout',FrontController.logout)
router.post('/contactinsert',FrontController.contactinsert)
//admin controller
router.get('/admin/dashboard',admin_auth,AdminController.Dashboard)


//admin blog controller
router.get('/admin/blogdisplay',admin_auth,Blogcontroller.blogdisplay)
router.post('/bloginsert',admin_auth,Blogcontroller.bloginsert)
router.get('/admin/blogview/:id',admin_auth,Blogcontroller.blogview)
router.get('/admin/blogedit/:id',admin_auth,Blogcontroller.blogedit)
router.post('/blogupdate/:id',admin_auth,Blogcontroller.blogupdate)
router.get('/admin/blogdelete/:id',admin_auth,Blogcontroller.blogdelete)

//admin category controller
router.get('/admin/categorydisplay',admin_auth,Categorycontroller.categorydisplay)
router.post('/categoryinsert',admin_auth,Categorycontroller.categoryinsert)
router.get('/admin/categoryview/:id',admin_auth,Categorycontroller.categoryview)
router.get('/admin/categoryedit/:id',admin_auth,Categorycontroller.categoryedit)
router.post('/categoryupdate/:id',admin_auth,Categorycontroller.categoryupdate)
router.get('/admin/categorydelete/:id',admin_auth,Categorycontroller.categorydelete)

// admin contact controller
router.get('/admin/contact_display',admin_auth,ContactController.contact_display)
router.post('/admin/contact_display',admin_auth,ContactController.contact_display)
router.get('/admin/contactview/:id',admin_auth,ContactController.contactview)
router.get('/admin/contactedit/:id',admin_auth,ContactController.contactedit)
router.post('/contactupdate/:id',admin_auth,ContactController.contactupdate)
router.get('/admin/contactdelete/:id',admin_auth,ContactController.contactdelete)



//router.post('/categoryinsert',admin_auth,Categorycontroller.categoryinsert)

//admin about controller

router.get('/admin/aboutdisplay',admin_auth,AboutController.aboutdisplay)
router.post('/aboutinsert',admin_auth,AboutController.aboutinsert)
router.get('/admin/aboutview/:id',admin_auth,AboutController.aboutview)
router.get('/admin/aboutedit/:id',admin_auth,AboutController.aboutedit)
router.post('/aboutupdate/:id',admin_auth,AboutController.aboutupdate)
router.get('/admin/aboutdelete/:id',admin_auth,AboutController.aboutdelete)







module.exports=router
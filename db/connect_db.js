const mongoose = require('mongoose')



const uri="mongodb+srv://muskangupta3109:muskan3109@cluster0.x00tttt.mongodb.net/Blogwebsite?retryWrites=true&w=majority"
const connectDB=()=>{
    //return mongoose.connect('mongodb://localhost:27017/Blogwebsite')
    return mongoose.connect(uri)

    .then(()=>{
        console.log('Connection succesfull')
    })
    .catch((err)=>{
        console.log(err)
    })
}
mongoose.set('strictQuery',false);
module.exports=connectDB
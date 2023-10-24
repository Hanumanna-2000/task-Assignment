const mongoose = require('mongoose');
 require('dotenv').config();

//&creating database and connecting to it(use databasename)
mongoose.connect(process.env.TASK_URL).
then(()=>{
    console.log("mongodb connected succesfully")
}).catch((err)=>{
    console.log(err)
})

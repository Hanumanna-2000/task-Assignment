const {Schema,model} = require('mongoose');
const bcryptjs = require('bcryptjs');
let loginAdmin=new Schema({
    f_userName:{
        type:String,
        required:true
    },
    f_pwd:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

loginAdmin.pre('save',async function(){
    let salt=await bcryptjs.genSalt(10)
    this.f_pwd= await bcryptjs.hash(this.f_pwd,salt)
})


module.exports=new model('t_login',loginAdmin)


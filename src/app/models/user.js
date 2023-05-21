const mongoose= require('mongoose');
const userSchema= mongoose.Schema({
    user_id:{
        type:String,
        require:true
       
    },
    name:{
       
        type:String,
        require:true
    },
    email:{
        type:email,
        require:true
    },
    password:{
        type:String,
        require:true

    },
    phone_number:{
        type:Number,
        require:true
    },
    serial_number:{
        type: mongoose.Schema.Types.ObjectId,
        ref:microcontrollers

    }

    

});
exports.User = mongoose.model('User',userSchema);
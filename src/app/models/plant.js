const mongoose= require('mongoose');
const plantSchema= mongoose.Schema({
   plant_id:{
        type:String,
        require:true
       
    },
    name:{
       
        type:String,
        require:true
    },
    min_treshold:{
        type:Number,
        default:''
    },
    max_treshold:{
        type:Number,
        default:''
    }
    

});
exports.Plant = mongoose.model('Plant',plantSchema);
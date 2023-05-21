const mongoose= require('mongoose');
const readingSchema= mongoose.Schema({
    reading_id:{
        type:String,
        require:true
       
    },
    serial_number:{
        type: mongoose.Schema.Types.ObjectId,
        ref:microcontrollers

    },

  reading:{
       
        type:Number,
       default:0
    },
    reading_time:{
        type:Date,
        default:Date.now
    }
   
    

});
exports.Readind = mongoose.model('Reading',readingSchema);
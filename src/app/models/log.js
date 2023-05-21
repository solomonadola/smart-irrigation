const mongoose= require('mongoose');
const logsSchema= mongoose.Schema({
    log_id:{
        type:String,
        require:true
       
    },
    serial_number:{
        type: mongoose.Schema.Types.ObjectId,
        ref: microcontrollers

    },

    log_detail:[{
       
        type:String,
        default:""
      
    }],
    log_date:{
        type:Date,
       default: Date.now
    }
   
  
    

});
exports.Logs = mongoose.model('Logs',logsSchema);
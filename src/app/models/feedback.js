const mongoose= require('mongoose');
const feedbackSchema= mongoose.Schema({
    feedback_id:{
        type:String,
        require:true
       
    },
   prediction_id:{
       
        type:String,
        require:true
    },
   true_vaalue:{
        type:Boolean
      
    },
  feedback_time:{
        type:Date,
    default:Date.now

    }
    

});
exports.Feedback = mongoose.model('Feedback',feedbackSchema);
const mongoose= require('mongoose');
const notificationSchema= mongoose.Schema({
    notification_id:{
        type:String,
        require:true
       
    },
    serial_number:{
        type: mongoose.Schema.Types.ObjectId,
        ref:microcontrollers

    },
    notificationBody:{
        type:String,
       default:''
    } ,
    notificationDate:{
        type:Date,
        default:Date.now
    }

});
exports.Notification = mongoose.model('Notification', notificationSchema);
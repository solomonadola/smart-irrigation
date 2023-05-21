const mongoose= require('mongoose');
const sensorSchema= mongoose.Schema({
    sensor_id:{
        type:String,
        require:true
       
    },
    serial_number:{
        type: mongoose.Schema.Types.ObjectId,
        ref:microcontrollers

    },
    sensing_type:{
        type:String,
        require:true
    } 

});
exports.Sensor = mongoose.model('Sensor', sensorSchema);
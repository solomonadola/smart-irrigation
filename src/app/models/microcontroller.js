const mongoose= require('mongoose');
const microcontrollerSchema= mongoose.Schema({
    serial_number:{
        type: String,
       require:true

    },
  location:{
        type:String,
        require:true
       
    }
    

});
exports.Microcontroller = mongoose.model('User',microcontrollerSchema);
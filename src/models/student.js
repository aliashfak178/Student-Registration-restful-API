const mongose= require('mongoose');
const validator = require('validator');

const studentSchema = new mongose.Schema({
        name:{
            type:String,
            required:true,
            minlength:3
        },
        email:{
            type:String,
            required:true,
            unique:[true,"Email id already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
        phone:{
            type:Number,
            minlength: 10,
            maxlength: 10,
            required: true,
            unique: true
        },
        address:{
            type:String,
            required: true
        }
        
});  

// Creating a new model 
const Student = new mongose.model('Student',studentSchema);

module.exports = Student;
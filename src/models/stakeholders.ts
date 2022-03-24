import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'


const StakeholderSchema = new mongoose.Schema({

    firstname: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50,
    },
    lastname: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50,
    },
    middlename: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50,
    },
    gender:{
        type:String,
        required:true
    },

    email: {
     type: String,
     unique: true,
     validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
     },
    },
    password: {
     type: String,
     required: true,
    },
    
    address: {
     type: String,
     required: true,
     minlength: 6,
    },

    DOB: {
     type: String,
    },

    phoneNo: {
        type: Number,
        required: true,
        minlength: 11,
        maxlength: 11
    },

    nationality: {
     type: String,
     required: true,
     
    },
    stateOfOrigin: {
     type: String,
     required: true,
    },

    user:{
        type:String,
        enum:['teacher', 'student', 'parent']
    },

    // className:{
    //     type:String
    // },

    admin:{
    type: Boolean
    },
    
 });




StakeholderSchema.pre('save', async function () {
 // console.log(this.modifiedPaths());
 // console.log(this.isModified('name'));
 if (!this.isModified('password')) return;
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
});

StakeholderSchema.methods.comparePassword = async function (canditatePassword) {
 const isMatch = await bcrypt.compare(canditatePassword, this.password);
 return isMatch;
};

export default mongoose.model('Stakeholder', StakeholderSchema);
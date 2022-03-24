import mongoose from 'mongoose'

const ParentSchema = new mongoose.Schema({
    fullname: String,
    userId : String,
    ward:[{
        fullname : String
    }]
})

export default mongoose.model('Parent', ParentSchema);



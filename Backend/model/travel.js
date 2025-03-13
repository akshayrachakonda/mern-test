import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    location:{
        type:String,
        required : true
    },
    date:{
        type:String,
        required: true
    },
    feedback:{
        type:String,
        required: true
    }
},{
    timestamps:true
});

const Travel = mongoose.model('travel', travelSchema);
export default Travel;
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import Travel from "./model/travel.js";

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.MONGO_URI);

app.get("/api/travel", async (req, res)=>{
    try{
        const travels = await travels.find();
        res.status(200).json({success:true, data:travels});
    }catch(err){
        console.log("Error in fetching" , err.message);
        res.status(500).json({success:false, message:"Server Error"})
    }
})



app.post('/api/products', async(req, res)=>{
    const travel = req.body;
    if (!travel.name || !travel.location || !travel.date || !travel.feedback){
        return res.status(404).json({success:false, message: "Please provide complete details"});
    }

    const newTravel = await  Travel(travel);

    try{
        await newTravel.save()
        res.status(201).json({success:true, data: newTravel});
    }catch(err){
        console.log("Error in creating product", err.message);
        res.status(500).json({success: false, message:"Server error"});
    }
});



app.delete("/api/travel/:id", async(req, res)=>{
    const {id} = req.params

    try{
        await Travel.findByIdAndDelete(id);
        res.status(200).json({success:true, messgae: "Document deleted"})
    }catch(error){
        res.status(404).json({success:false, message: "Documnet Not Found"})
    }
});


app.put("/api/travel/:id", async(req, res)=>{
    const {id} = req.params;
    const travel = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Document id"})
    }

    try{
        const updated = await Travel.findByIdAndUpdate(id, travel, {new:true});
        res.status(200).json({success:true, data:updated});
    }catch(err){
        console.log("Updated error")
        res.status(500).json({success:false, message:"Server Error"});
    }
})

app.listen(5000, ()=>{
    connectDB();
    console.log("Server running at http://localhost:5000 ");
})
import mongoose from "mongoose";

const noteschema = new mongoose.Schema({
    title:{
        type: String,
    },
    note:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{
    timestamps:true,
})

const NotesModel = mongoose.model('Note',noteschema);
export default NotesModel;
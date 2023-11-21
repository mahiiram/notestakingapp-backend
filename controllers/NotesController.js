import express from 'express';

const notesroute =express.Router()

import NotesModel from '../model/Notesmodel.js';

notesroute.post('/newNote',async (req, res)=>{
    const {title,note} = req.body;
     let newNote;
    try {
        newNote = new NotesModel({
            title,
            note
        })
        newNote = await newNote.save()
    } catch (error) {
        console.log(error)
    }
    if(!newNote){
       return res.status(500).send({ message: "unexpected error occured" })
    }
    return res.status(201).send({
       newNote
    })
    
})
// READ
notesroute.get('/get/notes',async (req, res)=>{
    let notes;
    try{
       notes = await NotesModel.find().populate().lean()
    }catch(err){
        return console.log(err)
    }
    if(!notes){
        return res.status(500).json({message:'Unexpected error occured'})
    }
    return res.status(201).json({
       notes
    })
})
notesroute.get('/get/:id',async (req, res)=>{  
    const id = req.params.id
    let notes;
    try{
       notes = await NotesModel.findOne({_id:id})
    }catch(err){ 
        return console.log(err)
    }
    if(!notes){
        return res.status(500).json({message:'Unexpected error occured'})
    }
    return res.status(201).json({
       notes
    })
})
// DELETE
notesroute.delete('/delete/:id',async (req, res)=>{
      try {
        await NotesModel.deleteOne({_id: req.params.id})
        return res.status(201).send({
            msg:'deleted',
            status:true
        })
      } catch (error) {
        return res.status(500).send(error)
      }
})
// UPDATE
notesroute.put('/update/:id', async (req, res)=>{
    var {id} = req.params;
    console.log(id);
    const {title,note} = req.body
    let notes;
    try {
        notes = await NotesModel.updateOne({ _id: id }, {$set:{
            title,
            note
        }})
        return res.status(200).json({
            status:true,
            msg:"updated Sucessfully",
        })
    } catch (err) {
        return res.status(500).json({
            status:false,
            msg: "Something Went Wrong"
        })
    }
   
})
export default notesroute
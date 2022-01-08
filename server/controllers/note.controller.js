import Note from '../models/note.model.js'
import mongoose from 'mongoose'
import {convertTZ} from "../utils/dateformat.js";

export const getNotes = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Note.countDocuments({});

        const Notes = await Note.find({ creator: req.user.id }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: Notes, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNoteByID = async (req, res) => {
    const { id } = req.params

    try {
        const note = await Note.findById(id);
        
        res.status(200).json(note);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNoteBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const Notes = await Note.find({ $and: [{creator: req.user.id}, { $or: [{ title: {$regex : searchQuery} }, { message : {$regex : searchQuery} } ] } ]  })
        // const result = await Notes.find({ $or: [{ title: searchQuery }, { message : searchQuery } ] })

        res.status(200).json({ data: Notes })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNoteByTag = async (req,res)=>{
    const { tagQuery } = req.query
    try {
        const Notes = await Note.find({ $and: [ {creator: req.user.id}, {tags: {$in: tagQuery.split(',')}} ] })

        res.status(200).json({ data: Notes })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const body = req.body;

    const newNote = new Note({ ...body, creator: req.user.id });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params

    const { title, message, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No note with id: ${id}`);

    const updatedNote = { title, message, tags, selectedFile, updateAt: convertTZ(new Date(),"Asia/Jakarta"), _id: id };

    await Note.findByIdAndUpdate(id, updatedNote, { new: true });

    res.json(updatedNote);
}

export const setImportant = async (req, res) => {
    const { id } = req.params

    if (!req.user) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No note with id: ${id}`);
    }

    const note = await Note.findById(id);

    if(!note) return res.status(404).send(`No note with id: ${id}`);

    const importance = note.isImportant;

    note.isImportant = !importance;
    note.updateAt = new Date();

    const updatedNote = await Note.findByIdAndUpdate( id, note, { new: true } );

    res.json(updatedNote);
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No note with id: ${id}`);

    await Note.findByIdAndRemove(id);

    res.json({ message: "Note deleted successfully." });
}
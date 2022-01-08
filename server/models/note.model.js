import mongoose from 'mongoose';
import {convertTZ} from "../utils/dateformat.js";

const noteSchema = mongoose.Schema({

    title: String,
    message: String,
    selectedFile: String,
    tags: [String],
    isImportant: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
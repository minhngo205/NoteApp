import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createNote, updateNote } from '../../actions/notes';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [noteData, setNoteData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const note = useSelector((state) => (currentId ? state.notes.notes.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setNoteData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!note?.title) clear();
    if (note) setNoteData(note);
  }, [note]);

  const handleSubmit = async (e) => {
    console.log(noteData)
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createNote({ ...noteData }, history));
      clear();
    } else {
      dispatch(updateNote(currentId, { ...noteData }));
      clear();
    }
  };

  if (!user?.profile?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Notes
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setNoteData({ ...noteData, tags: [...noteData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setNoteData({ ...noteData, tags: noteData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${note?.title}"` : 'Creating a Note'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={noteData.message} onChange={(e) => setNoteData({ ...noteData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={noteData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setNoteData({ ...noteData, selectedFile: base64 })} />
          <img className={classes.previewImg} src={ noteData.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' } alt={noteData.title}/>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;

import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { importantNote, deleteNote } from '../../../actions/notes';
import useStyles from './styles';

const Note = ({ note, setCurrentId }) => {
  const [isImportant, setImportant] = useState(note?.isImportant);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleImportant = async () => {
    dispatch(importantNote(note._id))
    setImportant(!note.isImportant)
  };

  const Importance = () => {
    if(isImportant) 
      return (
        <Button className={classes.buttonImportant} size="small" color="primary" onClick={handleImportant}>
          <StarIcon fontSize="small"/> &nbsp;Important
        </Button>
      )

    return (
      <Button size="small" color="primary" onClick={handleImportant}>
        <StarOutlineIcon fontSize="small" />&nbsp;Not Important
      </Button>
    )
  };

  const openNote = (e) => {

    history.push(`/note/${note._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openNote}
      >
        <CardMedia className={classes.media} image={note.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={note.title} />
        <div className={classes.overlay}>
          <Typography className={classes.topTitle} variant="h6">{note.title}</Typography>
          <Typography variant="body2"> Created {moment(note.createAt).fromNow()}</Typography>
        </div>

        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(note._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{note.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{note.title}</Typography>
        <CardContent>
          <Typography className={classes.topTitle} variant="body2" color="textSecondary" component="p">{note.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
          
        <Importance/>

        <Button size="small" color="secondary" onClick={() => dispatch(deleteNote(note._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>  

      </CardActions>
    </Card>
  );
};

export default Note;

import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress, Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Note from './Note/Note';
import useStyles from './styles';

const Notes = ({ setCurrentId }) => {
  const { notes, isLoading } = useSelector((state) => state.notes);
  const classes = useStyles();

  if (!notes.length && !isLoading) return (
      <div className={classes.titleRoot}>
          <div className={classes.TitleContainer}>
            <h1 className={classes.title}>
              Add some <span className={classes.colorText}> Notes.</span>
            </h1>
          </div>
      </div>
  );

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {notes?.map((note) => (
          <Grid key={note._id} item xs={12} sm={12} md={6} lg={3}>
            <Note note={note} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Notes;

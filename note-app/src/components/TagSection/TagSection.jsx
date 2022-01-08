import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Note from '../Notes/Note/Note';
import { getNotesByTag } from '../../actions/notes';

const TagSection = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { notes, isLoading } = useSelector((state) => state.notes);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getNotesByTag(name));
    }
  }, []);


  return (
    <div>
      <Typography variant="h2">Tag: #{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {notes?.map((note) => (
            <Grid key={note._id} item xs={12} sm={12} md={6} lg={3}>
              <Note note={note} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TagSection;

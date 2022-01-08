import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress, Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Note from './Note/Note';
import useStyles from './styles';

const Notes = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return (
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
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Note post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Notes;

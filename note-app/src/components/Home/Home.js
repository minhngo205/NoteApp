import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, IconButton, Collapse } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useEffect } from 'react';

import { getNotesBySearch } from '../../actions/notes';
import Notes from '../Notes/Notes';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const history = useHistory();

  const searchNote = () => {
    if (search.trim()) {
      dispatch(getNotesBySearch({ search }));
      history.push(`/notes/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchNote();
    }
  };

  const user = JSON.parse(localStorage.getItem('profile'));

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  if(!user) return (
    <div className={classes.root}>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedSize={50}>   
          
          <div className={classes.TitleContainer}>
            <h1 className={classes.title}>
              Welcome to<br/> My <span className={classes.colorText}> Note App.</span>
            </h1>

            <IconButton component={Link} to="/auth" className={classes.buttonContinue} raised elevation={6}>
              Create account to get notes
              <ChevronRightIcon className={classes.goRight}/>
            </IconButton>
          </div>

      </Collapse>
    </div>
  ); 

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Notes setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                  onKeyDown={handleKeyPress}
                  name="search" variant="outlined" label="Search Notes" fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchNote} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

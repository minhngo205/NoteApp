import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NoteDetails from './components/NoteDetails/NoteDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import TagSection from './components/TagSection/TagSection';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/notes" />} />
          <Route path="/notes" exact component={Home} />
          <Route path="/notes/search" exact component={Home} />
          <Route path="/note/:id" exact component={NoteDetails} />
          <Route path={['/tags/:name']} component={TagSection} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/notes" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

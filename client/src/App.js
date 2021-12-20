
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import EventDetails from './components/EventDetails/EventDetails';
const App = () => {
return (
  <BrowserRouter>
  <Container maxWidth="xl">
  
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/events" />} />
      <Route path="/events" exact component={Home} />
      <Route path="/events/search" exact component={Home} />
      <Route path="/events/:id" exact component={EventDetails} />
    
     
    </Switch> 
  </Container>
</BrowserRouter>
);
};

export default App;

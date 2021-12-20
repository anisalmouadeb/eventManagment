import React from "react";
import Event from "./Event/Event";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyle from "./styles";


const Events = ({ setCurrentId }) => {
  const {events, isLoading} = useSelector((state) => state.events);

  const classes = useStyle();


  return isLoading? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >    
      {events.map((event) => (
        <Grid key={event._id} item xs={12} sm={6} md={6} lg={4}>
          <Event event={event} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;

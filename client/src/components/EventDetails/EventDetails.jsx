import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider,Container,AppBar } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import useStyles from './styles';
import {getEvent,getEventsBySearch}from "../../actions/events"
import eventLogo from "../../images/logo.png";
import eventLogoText from "../../images/text.png";
import { Link } from "react-router-dom";
const EventDetails = () => {

    const {event, events, isLoading } = useSelector((state) => state.events);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getEvent(id));
      }, [id]);

    
    
      if (!event) return null

      let eventD = new Date(event.eventDate);
      let eventMonth = eventD.getMonth();
      let eventYear = eventD.getFullYear();
      let eventDay = eventD.getDate();
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let monthName = monthNames[eventMonth];
      if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }
    return (
      <Container maxWidth="xl">
        
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img
          component={Link}
          to="/"
          src={eventLogoText}
          alt="icon"
          height="45px"
        />
        <img
          className={classes.image}
          src={eventLogo}
          alt="icon"
          height="35px"
        />
      </Link>
    </AppBar>
        <Paper style={{ padding: '20px',marginTop: '40px' , borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{event.title}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{event.address}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{` ${eventDay} ${monthName} ${eventYear}`}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">{event.description}</Typography>
         
           </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={event.cloudinary_url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={event.title} />
        </div>
      </div>
     
    </Paper>
    </Container>
    )
}

export default EventDetails

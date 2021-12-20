import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { deleteEvent } from "../../../actions/events";

const Event = ({ event, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
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
  const history = useHistory();
  const openEvent =()=>{
   history.push(`/events/${event._id}`)
  }
  return (
    <Card className={classes.card}  elevation={6}>
  
      <CardMedia
        className={classes.media}
        image={event.cloudinary_url}
        title={event.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{event.address}</Typography>
        <Typography variant="body2">{` ${eventDay} ${monthName} ${eventYear}`}</Typography>
      </div>
      <div className={classes.overlay2} name="edit">
          <Button
            onClick={() => {openEvent() }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
    
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {event.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.description}
        </Typography>
      </CardContent>
     
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => setCurrentId(event._id)}
        >
          {" "}
          Update{" "}
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => dispatch(deleteEvent(event._id,history))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Event;

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyle from "./styles";
import { createEvent, updateEvent } from "../../actions/events";
import { useHistory } from "react-router-dom";


const Form = ({ currentId, setCurrentId }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: new Date().toISOString().substr(0,10),
    address: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({
    title: false,
    description:false,
    eventDate: false,
    address: false,
    });
    const [formErrorsMsg, setFormErrorsMsg] = useState({
      title: "",
      description:"",
      eventDate: "",
      address: "",
      });

      const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
 
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const event = useSelector((state) =>
    currentId ? state.events.events.find((e) => e._id === currentId) : null
  );
  useEffect(() => {
   if (event) {
    event.eventDate=new Date(event.eventDate).toISOString().substr(0,10) 
    setEventData(event);

}
   

  }, [event]);


  

  const handleSubmit = () => {
   const isvalid= validate(eventData);
   if (eventData.image==null) {
    return alert("image is required ");
  }
   
    if (currentId) {
      if (isvalid)   
      dispatch(updateEvent(currentId, eventData, history));
     
    } else {      
      if (isvalid)     
        dispatch(createEvent(eventData, history));
      
    }
   
    clear();
  };
 
  const validate = (values) => {
    let titleError,descriptionError,addressError,dateError =false;
    let titleErrorMsg,descriptionErrorMsg,addressErrorMsg,dateErrorMsg ="";
    if(values.title && values.description && values.address && values.eventDate)
       return true
    if (!values.title) {
      titleError =true;
      titleErrorMsg ="required"
          
    }   
    if (!values.eventDate) {
      dateError =true;
      dateErrorMsg ="required"      
    }
    if (!values.address) {
      addressError=true;
      addressErrorMsg="required"
    }
    if (!values.description) {
      descriptionError=true;
      descriptionErrorMsg="required"
      
    }
    setFormErrors({title:titleError,description:descriptionError,address:addressError,eventDate:dateError})
    setFormErrorsMsg({title:titleErrorMsg,description:descriptionErrorMsg,address:addressErrorMsg,eventDate:dateErrorMsg})
    return false;
  };



  const clear = () => {
    setCurrentId(null);
    setEventData({
      title: "",
      description: "",
      eventDate: new Date().toISOString().substr(0,10),
      address: "",
      image: null,
    });
    imageRef.current.value = null;
  };

  const onImageChange = (event) => {
   
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const maxSize = 2 * 1024 * 1024;

      if (img.size > maxSize) {
        return alert("La taille maximale de l'image à télécharger est de 2mo ");
      }

      setEventData({ ...eventData, image: img });
    }
  };

  const imageRef = useRef(null);
 

    


  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        encType="multipart/form-data "
      >
        <Typography variant="h6">
          {currentId ? `Editing Event` : "Creating an Event"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={eventData.title}
          required
          error={formErrors.title}
          helperText ={formErrorsMsg.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          required
          error={formErrors.description}
          helperText ={formErrorsMsg.description}
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
        <TextField
          name="address"
          variant="outlined"
          label="Address"
          fullWidth
          required
          error={formErrors.address}
          helperText ={formErrorsMsg.address}
          value={eventData.address}
          onChange={(e) =>
            setEventData({ ...eventData, address: e.target.value })
          }
        />
     
            <TextField
         name="eventDate"
         variant="outlined"
         fullWidth
         required
         error={formErrors.eventDate}
         helperText ={formErrorsMsg.eventDate}
        type="date"
        value={eventData.eventDate}
        onChange={(e) =>
          setEventData({ ...eventData, eventDate: e.target.value })
          
        }
        
      
      />
        <div className={classes.fileInput}>
          <input
            accept="image/*"
            id={"_id"}
            multiple
            required
            type="file"
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
    
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;

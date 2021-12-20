import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({

  title : String,
  description : String,
  eventDate : Date,
  address : String,
  image : String, 
  cloudinary_url : String
})

const Event = mongoose.model('Event', eventSchema);
export default Event;
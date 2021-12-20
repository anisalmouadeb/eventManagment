import Event from "../models/events.js";
import cloudinary from "cloudinary";


export const getEvent = async (req, res) => { 
  const { id } = req.params;

  try {
      const event = await Event.findById(id);
      
      res.status(200).json(event);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getEvents = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Event.countDocuments({});
    const events = await Event.find()
      .sort({ eventDate: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res
      .status(201)
      .json({
        data: events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEventsBySearch = async (req, res) => {
  const { searchQuery, locations } = req.query;
 
  try {
    let eventDate=null;
    let events;
    if(searchQuery!= "none"){
     eventDate =new Date(searchQuery);
  }
  console.log(eventDate);
  if (eventDate){
     events = await Event.find({
      $or: [{ eventDate }, { address: { $in: locations.split(",") } }],
    });
  }
  else{
    events = await Event.find({
      $or: [{ eventDate }, { address: { $in: locations.split(",") } }],
    });
  }
    res.json({ data: events });
  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;
  const { file } = req;
  const newEvent = new Event(event);

  try {
    //add image to cloudinary
    const reslut = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "events",
      
     
    });
    newEvent.image = (file && file.originalname) || null;
    newEvent.cloudinary_url = reslut.secure_url;
    await newEvent.save();
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id: _id } = req.params;
  const event = req.body;
  const { file } = req;
  try {
    if (file != null) {
      //add image to cloudinary
      const reslut = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "events",
        width: 150,
        crop: "scale",
      });
      event.image = (file && file.originalname) || null;
      event.cloudinary_url = reslut.secure_url;
    }

    const updatedEvent = await Event.findByIdAndUpdate(_id, event, {
      new: true,
    });
    res.json(updatedEvent);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndRemove(id);
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

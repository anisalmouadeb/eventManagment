import express from "express";
import { getEvents,getEventsBySearch,getEvent,createEvent,updateEvent , deleteEvent} from "../controllers/events.js";
import multer from "multer"
const router = express.Router();

const storage =multer.diskStorage ({
    destination :(req,file ,callback)=>{
      callback(null,"./public/images/")
    },
    filename :(req,file ,callback)=>{
      callback(null,file.originalname)
    }
  
  })
  
  const upload =multer({storage}).single("image");


router.get("/",getEvents);
router.get("/event/:id",getEvent);
router.get('/search', getEventsBySearch);
router.post("/",upload,createEvent);
router.patch("/:id",upload,updateEvent);
router.delete("/:id",deleteEvent);




export default router;

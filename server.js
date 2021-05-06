console.log('hello there');

import express from "express";
import EventController from "./controllers/EventController.js";
// import bodyParser from "body-parser";
import path from "path";
// import { eventNames } from "cluster";


const app = express();
const PORT = 3002;



app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.resolve("./public")));

// get all events
app.get('/events', EventController.getAllEvents);
// get one event
app.get('/events/:id', EventController.getEventById);
// create new event
app.post('/create', EventController.createEvent);

app.get('/deleteAll', EventController.removeAllEvents);

app.get('/delete/:id', EventController.removeEventById);

app.post('/update/:id', EventController.updateEvent);



// EventController.removeAllEvents();

// EventController.removeEventById(0);

// app.get('/deleteOne/:id', EventController.removeEventById);

app.get("/haha", (req, res) => {
    // servera html
    // och app.js
    res.end("hej");

})

// template engine
// (ejs)


app.listen(PORT, () => {
    console.log('im listening on port', PORT);
});

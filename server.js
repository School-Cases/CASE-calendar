console.log('hello there');

import express from "express";
import EventController from "./controllers/EventController.js";
import bodyParser from "body-parser";
import path from "path";


const app = express();
const PORT = 3002;



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.resolve("./public")));
// get all events
app.get('/events', EventController.getAllEvents);
// get one event
app.get('/events/:id', EventController.getEventById);
// create new event
app.post('/create', EventController.createEvent);

app.get("/", (req, res) => {
    // servera html
    // och app.js
    res.end("hej");

})


app.listen(PORT, () => {
    console.log('im listening on port', PORT);
});
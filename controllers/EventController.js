import EventModel from '../models/Events.js';

const getAllEvents = (req, res) => {
    console.log(req);
    const events = EventModel.findAllEvents();
    res.send({data: events});
}

const removeAllEvents = (req, res) => {
    console.log("req");
    const events = EventModel.deleteAllEvents();
    res.send({data: events});
}

const removeEventById = (id) => {
    EventModel.deleteEventById(id);
}

const getEventById = (req, res) => {
    
    const id = req.params.id;
    const event = EventModel.findEventById(id);
    // const event = events.filter(e => e.id === req.params.id);
    if (!event) {
        res.status(404).send({message: "event not found"});
    } else {
        res.send({data: event});
    }
};

const createEvent = (req, res) => {
    console.log('create');

    const body = req.body;

    const success = EventModel.createEvent(body);

    if (success) {
        res.status(201).json({message: 'event created'})
    } else {
        res.status(400).json({message: "event failed create"})
    };



    console.log(body);

}

export default { getAllEvents, getEventById, createEvent, removeAllEvents, removeEventById };
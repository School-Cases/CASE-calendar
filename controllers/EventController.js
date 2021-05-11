import EventModel from '../models/Events.js';

const getAllEvents = (req, res) => {
    const events = EventModel.findAllEvents();
    res.send({data: events});
}

const removeAllEvents = (req, res) => {
    EventModel.deleteAllEvents();

    res.redirect('/html/enDag.html');
}

const updateEvent = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const success = EventModel.updateEventById(id, body);

    if (success) {
        // res.status(201).json({message: "Event update!"})
        res.redirect('/html/enDag.html');
    } else {
        res.status(400).json({message: "Event update failed!"});
    }
}

const removeEventById = (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    
    EventModel.deleteEventById(id);
    console.log(id, "ehheheheheheheakkngsdaojgnsdopgnish");
    res.redirect('/html/enDag.html');
}

const getEventById = (req, res) => {
    
    const id = req.params.id;
    const event = EventModel.findEventById(id);

    if (!event) {
        res.status(404).send({message: "event not found"});
    } else {
        res.send({data: event});
    }
};


const createEvent = (req, res) => {
    const body = req.body;

    const success = EventModel.createEvent(body);

    if (success) {
        res.redirect('/html/enDag.html');
    } else {
        res.status(400).json({message: "event failed create"})
    };
}

export default { getAllEvents, getEventById, createEvent, removeAllEvents, removeEventById, updateEvent };
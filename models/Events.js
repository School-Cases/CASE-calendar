import fs from "fs";

let events = JSON.parse(fs.readFileSync('./public/data/events.json', 'utf-8'));


const deleteAllEvents = () => {
    console.log("lyss");
    fs.unlinkSync("./public/data/events.json");
    fs.writeFileSync("./public/data/events.json", "[]");
}

const deleteEventById = (id) => {
    let index = events.findIndex(e => e.id === id);
    console.log(index);
    events.splice(index, 1);
    fs.writeFileSync('./public/data/events.json', JSON.stringify(events), 'utf-8');
}


const findAllEvents = () => {
    return events;
}

const findEventById = (id) => {
    return events.find(event => event.id === id);
}

const createEvent = (body) => {
    // return products.find(prod => prod.id === id);

    try {
        const newEvent = {
            id: events.length,
            date: body.date,
            rubrik: body.rubrik,
            jobb: body.jobb,
            fritid: body.fritid,
            asviktigt: body.asviktigt,
            starttid: body.starttid,
            sluttid: body.sluttid,
            merInfo: body.merInfo
        };

        events.push(newEvent);


        fs.writeFileSync('./public/data/events.json', JSON.stringify(events), 'utf-8');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };

}

export default { findAllEvents, findEventById, createEvent, deleteAllEvents, deleteEventById };
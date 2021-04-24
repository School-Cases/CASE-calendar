import fs from "fs";

let events = JSON.parse(fs.readFileSync('./data/events.json', 'utf-8'));

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
            rubrik: body.rubrik,
            kategori: body.kategori,
            starttid: body.starttid,
            sluttid: body.sluttid,
            merInfo: body.merInfo
        };

        events.push(newEvent);


        fs.writeFileSync('./data/events.json', JSON.stringify(events), 'utf-8');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    };

}

export default { findAllEvents, findEventById, createEvent };
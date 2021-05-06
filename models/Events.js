import fs from "fs";

const eventsJson = './data/events.json';

let events = JSON.parse(fs.readFileSync(eventsJson, 'utf-8'));

const randStr = () => { const lettersAsString = `A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9`; const letters = lettersAsString.split(','); let randStr = ''; for(let i = 0; i < 40; i++) { randStr += letters[Math.floor(Math.random() * letters.length)]; }; return randStr; };


const deleteAllEvents = () => {
    fs.unlinkSync(eventsJson);
    fs.writeFileSync(eventsJson, "[]");
}

const findAllEvents = () => {
    return events;
}

const findEventById = (id) => {
    return events.find(event => event.id === id);
}

const deleteEventById = (id) => {
    let index = events.findIndex(e => e.id == id);
    events.splice(index, 1);
    fs.writeFileSync(eventsJson, JSON.stringify(events), 'utf-8');
}

const updateEventById = (id, body) => {
    try {
        console.log(id);
        id = parseInt(id);
        const eventToUpdate = findEventById(id);

        if (!eventToUpdate) {
            throw `No Event found with id: ${id}`;
        }

        const updatedEvent = {
            id: eventToUpdate.id,
            rubrik: body.rubrik || eventToUpdate.rubrik,
            date: body.date || eventToUpdate.date,
            jobb: body.jobb || eventToUpdate.jobb,
            fritid: body.fritid || eventToUpdate.fritid,
            asviktigt: body.asviktigt || eventToUpdate.asviktigt,
            starttid: body.starttid || eventToUpdate.starttid,
            sluttid: body.sluttid || eventToUpdate.sluttid,
            merInfo: body.merInfo || eventToUpdate.merInfo
        }

        // Clean out the old Event
        events = events.filter(event => event.id !== id);
        
        // Add new Event        
        events.push(updatedEvent);

        // Save
        fs.writeFileSync(eventsJson, JSON.stringify(events), 'utf-8');
        return true;
    } catch(error) {
        // console.log(error);
        return false;
    }

}



const createEvent = (body) => {


    try {
        const newEvent = {
            id: randStr(),
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


        fs.writeFileSync(eventsJson, JSON.stringify(events), 'utf-8');
        return true;
    } catch (error) {
        // console.log(error);
        return false;
    };

}

export default { findAllEvents, findEventById, createEvent, deleteAllEvents, deleteEventById, updateEventById };
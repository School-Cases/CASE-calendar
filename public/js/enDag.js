// variables



const theDay = document.querySelector(".theDay");
const eventTemplate = document.getElementById("eventTemplate");
const addEventTemplate = document.getElementById("addEventTemplate");
const updateEventTemplate = document.getElementById("updateEventTemplate");
const allDayDivs = document.querySelectorAll(".enDagDagSec");
let dates = document.querySelectorAll(".dates");
let EventsPerDay = document.querySelectorAll(".EventsPerDay");
const todaysDate = document.getElementById("todaysDate");

// const enDagAddEventButton = theDay.children[3].children[0];
const enDagAddEventButton = document.getElementById("addButton");

const addEventInput = document.getElementById("addEventInput");
const switchBlackWhite = document.querySelector("#switchBlackWhite");


// functions

const editHover = () => {
    for (let i = 0; i < theDay.querySelector(".EventsPerDay").children.length; i++) {
        theDay.querySelector(".EventsPerDay").children[i].addEventListener("mouseover", (e) => {
            theDay.querySelector(".EventsPerDay").children[i].children[0].children[1].classList.remove("hidden")
            editHoverSwitch = true;
        })
        theDay.querySelector(".EventsPerDay").children[i].addEventListener("mouseout", (e) => {
            theDay.querySelector(".EventsPerDay").children[i].children[0].children[1].classList.add("hidden")
        })
    }
}

let editSwitch = false;
const getTheEvents = () => {
    fetch('https://casekalender.herokuapp.com/events').then((response) => response.json()).then((eventsS) => {
        let events = eventsS.data;
        events = events.sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", ""));
        EventsPerDay.forEach(day => {
            day.innerHTML = "";
        })
        allDayDivs.forEach(date => {
            let thisDaysEvents = events.filter((event) => {
                return event.date === date.getAttribute('data-date');
            })
            thisDaysEvents.forEach(dayEvent => {
                let clone = eventTemplate.content.cloneNode(true);
                clone.getElementById("eventTime").textContent = `${dayEvent.starttid} - ${dayEvent.sluttid}`;
                if (dayEvent.jobb) {
                    clone.getElementById("rubbeBoll1").style.backgroundColor = "rgb(211, 191, 79)";
                    clone.getElementById("rubbeBoll1").classList.add("rubbeBoll");
                }
                if (dayEvent.fritid) {
                    clone.getElementById("rubbeBoll2").style.backgroundColor = "rgb(88, 173, 77)";
                    clone.getElementById("rubbeBoll2").classList.add("rubbeBoll");
                }
                if (dayEvent.asviktigt) {
                    clone.getElementById("rubbeBoll3").style.backgroundColor = "rgb(194, 95, 95)";
                    clone.getElementById("rubbeBoll3").classList.add("rubbeBoll");
                }
                clone.getElementById("eventRubrik").textContent = `${dayEvent.rubrik}`;
                clone.getElementById("merInfoDiv").textContent = ``;

                let switchMerInfo = false;
                clone.getElementById("arrow").addEventListener("click", (e) => {
                    if (switchMerInfo === false) {
                        e.target.style.transform = "rotate(90deg)";
                        let InfoDiven = e.target.parentNode.nextSibling.nextSibling;
                        InfoDiven.innerHTML = `<i>${dayEvent.merInfo}</i>`;
                        InfoDiven.classList.remove("hidden");
                        switchMerInfo = true;
                    } else {
                        e.target.style.transform = "rotate(0deg)";
                        let InfoDiven = e.target.parentNode.nextSibling.nextSibling;
                        InfoDiven.innerHTML = ``;
                        InfoDiven.classList.add("hidden");
                        switchMerInfo = false;
                    }
                })

                clone.getElementById("edit").addEventListener("click", (e) => {
                    if (editSwitch === false) {

                        allDayDivs[2].style.height = "fit-content";

                        e.target.closest("#bajs").remove();

                        let formClone = updateEventTemplate.content.cloneNode(true);
                        theDay.children[2].appendChild(formClone);
                        // const closeButton = document.getElementById("closeButton");
                        document.getElementById("delete").setAttribute("href", `https://casekalender.herokuapp.com/delete/${dayEvent.id}`)


                        addEventInput.style.padding = "0.3rem";
                        switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
                        switchBlackWhite.style.paddingBottom = "0";
                        enDagAddEventButton.style.visibility = "hidden";
                        document.getElementById("updateForm").setAttribute("action", `/update/${dayEvent.id}`);
                        document.getElementById("dateöh").value = dayEvent.date;
                        document.getElementById("inputRubbe").value = dayEvent.rubrik;
                        document.getElementById("starttid").value = dayEvent.starttid;
                        document.getElementById("sluttid").value = dayEvent.sluttid;
                        if (dayEvent.jobb) {
                            document.getElementById("jobb").checked = "true";
                        } else if (dayEvent.fritid) {
                            document.getElementById("fritid").checked = "true";
                        } else if (dayEvent.asviktigt) {
                            document.getElementById("asviktigt").checked = "true";
                        }
                        document.getElementById("merInfoText").value = dayEvent.merInfo;
                        document.getElementById("submitButton").value = "UPPDATERA";
                        document.getElementById("addEventRubbe").innerHTML = "Uppdatera event <br><center>" + dayEvent.date + "</center>";
                        editSwitch = true;
                    } else {
                        return;
                    }
                })
                date.querySelector(".EventsPerDay").appendChild(clone);
            })
        })
        editHover()
    });
}
getTheEvents();

let todayDay;
let yesterdayDay;
let yeYesterdayDay;
let tomorrowDay;
let toTomorrowDay;

let yeYesterday;
let yesterday;
let today;
let tomorrow;
let toTomorrow;

const setCorrectDateString = () => {
    allDayDivs[0].dataset.date = yeYesterday;
    allDayDivs[1].dataset.date = yesterday;
    allDayDivs[2].dataset.date = today;
    allDayDivs[3].dataset.date = tomorrow;
    allDayDivs[4].dataset.date = toTomorrow;

    let yeYesterdaySplitted = yeYesterday.split("-");
    let yesterdaySplitted = yesterday.split("-");
    let todaySplitted = today.split("-");
    let tomorrowSplitted = tomorrow.split("-");
    let toTomorrowSplitted = toTomorrow.split("-");

    splittedArray = [yeYesterdaySplitted, yesterdaySplitted, todaySplitted, tomorrowSplitted, toTomorrowSplitted];

    let counter = 0;
    splittedArray.forEach(date => {
        if (date[1].indexOf(0) === 0 && date[2].indexOf(0) === 0) {
            let dag = date[2];
            let månad = date[1];
            date = `${dag[1]}/${månad[1]}`;
        } else if (date[1].indexOf(0) === 0) {
            let månad = date[1];
            date = `${date[2]}/${månad[1]}`;
        } else if (date[2].indexOf(0) === 0) {
            let dag = date[2];
            date = `${dag[1]}/${date[1]}`;
        } else {
            date = `${date[2]}/${date[1]}`;
        }
        dates[counter].textContent = date;
        counter++;
    })
}

const setCorrectDayString = () => {
    let söndag = {
        nr: 0,
        day: "SÖNDAG"
    };
    let måndag = {
        nr: 1,
        day: "MÅNDAG"
    };
    let tisdag = {
        nr: 2,
        day: "TISDAG"
    };
    let onsdag = {
        nr: 3,
        day: "ONSDAG"
    };
    let torsdag = {
        nr: 4,
        day: "TORSDAG"
    };
    let fredag = {
        nr: 5,
        day: "FREDAG"
    };
    let lördag = {
        nr: 6,
        day: "LÖRDAG"
    };

    let yeYesterdayDayObj = {
        nr: yeYesterdayDay,
        string: "yeYesterdayDay"
    };
    let yesterdayDayObj = {
        nr: yesterdayDay,
        string: "yesterdayDay"
    };
    let todayDayObj = {
        nr: todayDay,
        string: "todayDay"
    };
    let tomorrowDayObj = {
        nr: tomorrowDay,
        string: "tomorrowDay"
    };
    let toTomorrowDayObj = {
        nr: toTomorrowDay,
        string: "toTomorrowDay"
    };

    let dagar = [söndag, måndag, tisdag, onsdag, torsdag, fredag, lördag];
    let dagDivar = [yeYesterdayDayObj, yesterdayDayObj, todayDayObj, tomorrowDayObj, toTomorrowDayObj];

    dagar.forEach(dag => {
        dagDivar.forEach(dagDiv => {
            if (dagDiv.nr === dag.nr) {
                document.querySelector(`.${dagDiv.string}`).textContent = dag.day;
            }
        })
    })
    allDayDivs.forEach(day => {
        let datum = day.querySelector(".dates");
        let veckodag = day.querySelector(".veckodag");
        if (veckodag.textContent === "LÖRDAG" || veckodag.textContent === "SÖNDAG") {
            // day.style.border ="0.35rem solid rgb(255, 80, 80)";
            // veckodag.style.color = "rgb(255, 160, 160)";
            datum.style.color = "rgb(255, 80, 80)";
        } else {
            // day.style.border ="none";
            // veckodag.style.color = "white";
            datum.style.color = "white";
        }
    })
}

const setCalendarDates = () => {
    yeYesterdayDay = new Date(+new Date() - 86400000 * 2).getDay();
    yeYesterday = new Date(+new Date() - 86400000 * 2).toLocaleDateString();
    yesterdayDay = new Date(+new Date() - 86400000).getDay();
    yesterday = new Date(+new Date() - 86400000).toLocaleDateString();
    todayDay = new Date().getDay();
    today = new Date().toLocaleDateString();
    tomorrowDay = new Date(+new Date() + 86400000).getDay();
    tomorrow = new Date(+new Date() + 86400000).toLocaleDateString();
    toTomorrowDay = new Date(+new Date() + 86400000 * 2).getDay();
    toTomorrow = new Date(+new Date() + 86400000 * 2).toLocaleDateString();
    setCorrectDateString();
    setCorrectDayString();
};
setCalendarDates();

const setCalendarDatesFram = () => {
    todayDay = new Date(+new Date(tomorrow)).getDay();
    today = new Date(+new Date(tomorrow)).toLocaleDateString();
    yesterdayDay = new Date(+new Date(today) - 86400000).getDay();
    yesterday = new Date(+new Date(today) - 86400000).toLocaleDateString();
    yeYesterdayDay = new Date(+new Date(yesterday) - 86400000).getDay();
    yeYesterday = new Date(+new Date(yesterday) - 86400000).toLocaleDateString();
    tomorrowDay = new Date(+new Date(tomorrow) + 86400000).getDay();
    tomorrow = new Date(+new Date(tomorrow) + 86400000).toLocaleDateString();
    toTomorrowDay = new Date(+new Date(tomorrow) + 86400000).getDay();
    toTomorrow = new Date(+new Date(tomorrow) + 86400000).toLocaleDateString();
    setCorrectDateString();
    setCorrectDayString();
};

const setCalendarDatesBak = () => {
    todayDay = new Date(+new Date(yesterday)).getDay();
    today = new Date(+new Date(yesterday)).toLocaleDateString();
    yesterdayDay = new Date(+new Date(yesterday) - 86400000).getDay();
    yesterday = new Date(+new Date(yesterday) - 86400000).toLocaleDateString();
    yeYesterdayDay = new Date(+new Date(yesterday) - 86400000).getDay();
    yeYesterday = new Date(+new Date(yesterday) - 86400000).toLocaleDateString();
    tomorrowDay = new Date(+new Date(today) + 86400000).getDay();
    tomorrow = new Date(+new Date(today) + 86400000).toLocaleDateString();
    toTomorrowDay = new Date(+new Date(tomorrow) + 86400000).getDay();
    toTomorrow = new Date(+new Date(tomorrow) + 86400000).toLocaleDateString();
    setCorrectDateString();
    setCorrectDayString();
};

const setCalendarDatesBakX7 = () => {
    todayDay = new Date(+new Date(yesterday) - 86400000 * 6).getDay();
    today = new Date(+new Date(yesterday) - 86400000 * 6).toLocaleDateString();
    yesterdayDay = new Date(+new Date(today) - 86400000).getDay();
    yesterday = new Date(+new Date(today) - 86400000).toLocaleDateString();
    yeYesterdayDay = new Date(+new Date(today) - 86400000 * 2).getDay();
    yeYesterday = new Date(+new Date(today) - 86400000 * 2).toLocaleDateString();
    tomorrowDay = new Date(+new Date(today) + 86400000).getDay();
    tomorrow = new Date(+new Date(today) + 86400000).toLocaleDateString();
    toTomorrowDay = new Date(+new Date(tomorrow) + 86400000).getDay();
    toTomorrow = new Date(+new Date(tomorrow) + 86400000).toLocaleDateString();
    setCorrectDateString();
    setCorrectDayString();
};

const setCalendarDatesFramX7 = () => {
    todayDay = new Date(+new Date(yesterday) + 86400000 * 8).getDay();
    today = new Date(+new Date(yesterday) + 86400000 * 8).toLocaleDateString();
    yesterdayDay = new Date(+new Date(today) - 86400000).getDay();
    yesterday = new Date(+new Date(today) - 86400000).toLocaleDateString();
    yeYesterdayDay = new Date(+new Date(today) - 86400000 * 2).getDay();
    yeYesterday = new Date(+new Date(today) - 86400000 * 2).toLocaleDateString();
    tomorrowDay = new Date(+new Date(today) + 86400000).getDay();
    tomorrow = new Date(+new Date(today) + 86400000).toLocaleDateString();
    toTomorrowDay = new Date(+new Date(tomorrow) + 86400000).getDay();
    toTomorrow = new Date(+new Date(tomorrow) + 86400000).toLocaleDateString();
    setCorrectDateString();
    setCorrectDayString();
};

const setYear = () => {
    let year = new Date(today).getFullYear();
    document.getElementById("year").textContent = year;
}
setYear();

// eventlisteners

let addSwitch = false;
enDagAddEventButton.addEventListener("click", (e) => {
    if (addSwitch === false) {
        addSwitch = true;

        allDayDivs[2].style.height = "fit-content";

        enDagAddEventButton.textContent = "";
        let clone = addEventTemplate.content.cloneNode(true);
        theDay.children[2].appendChild(clone);
        const closeButton = document.getElementById("closeButton");
        addEventInput.style.padding = "0.3rem";
        switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
        switchBlackWhite.style.height = "fit-content";
        enDagAddEventButton.style.visibility = "hidden";
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
        closeButton.addEventListener("click", () => {
            addSwitch = false;

            allDayDivs[2].style.height = "fit-content";

            theDay.children[2].removeChild(document.getElementById("addEventInputSec"));
            enDagAddEventButton.textContent = "+";
            addEventInput.style.padding = "0";
            switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
            switchBlackWhite.style.height = "51.2vh";
            enDagAddEventButton.style.visibility = "visible";
            // setDayHeight();
        })
    } else {
        return;
    }
});

const pilFram = document.getElementById("pilFram");
pilFram.addEventListener("click", () => {
    setCalendarDatesFram();
    getTheEvents();
    // setDayHeight();
    if (addSwitch === true) {
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
    }
    setYear();
})
const pilBak = document.getElementById("pilBak");
pilBak.addEventListener("click", () => {
    setCalendarDatesBak();
    getTheEvents();
    // setDayHeight();
    if (addSwitch === true) {
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
    }
    setYear();
});
const pilBakX7 = document.getElementById("pilBakX7");
pilBakX7.addEventListener("click", () => {
    setCalendarDatesBakX7();
    getTheEvents();
    // setDayHeight();
    if (addSwitch === true) {
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
    }
    setYear();
});
const pilFramX7 = document.getElementById("pilFramX7");
pilFramX7.addEventListener("click", () => {
    setCalendarDatesFramX7();
    getTheEvents();
    // setDayHeight();
    if (addSwitch === true) {
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
    }
    setYear();
});

const kategoriSec = document.getElementById("kategoriSec");
kategoriSec.addEventListener("click", (e) => {
    let chosenKat = e.target.textContent.trim();

    fetch('https://casekalender.herokuapp.com/events').then((response) => response.json()).then((events) => {
        events = events.data;

        const kategoriSecRubbe1 = document.getElementById("kategoriSecRubbe1");
        let eventsSorted;
        if (chosenKat === "JOBB") {
            eventsSorted = events.filter(event => event.jobb).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
            kategoriSecRubbe1.style.backgroundColor = "rgb(211, 191, 79)";
        } else if (chosenKat === "FRITID") {
            eventsSorted = events.filter(event => event.fritid).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
            kategoriSecRubbe1.style.backgroundColor = "rgb(88, 173, 77)";
        } else if (chosenKat === "ASVIKTIGT") {
            eventsSorted = events.filter(event => event.asviktigt).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
            kategoriSecRubbe1.style.backgroundColor = "rgb(194, 95, 95)";
        }

        let eventSortedPerDay = [];
        let excluded = [];
        eventsSorted.forEach(event => {
            if (!excluded.includes(event.date)) {
                eventSortedPerDay.push(eventsSorted.filter(ex => ex.date === event.date))
                excluded.push(event.date);
            }
        })

        if (eventSortedPerDay.length === 0) {
            kategoriSecRubbe1.classList.add("hidden");
        } else {
            kategoriSecRubbe1.classList.remove("hidden");
            kategoriSecRubbe.textContent = chosenKat;
        }

        document.getElementById("removehehe").innerHTML = "";

        eventSortedPerDay.forEach(day => {
            console.log(day[0].date);
            let appendDay = document.createElement("section");
            appendDay.classList.add("valdKategoriEventsSec");
            // appendDay.classList.add("flex");
            document.getElementById("removehehe").appendChild(appendDay);
            let dayEvents = document.createElement("section");
            dayEvents.classList.add("flex");
            dayEvents.classList.add("dayEvents");
            appendDay.appendChild(dayEvents);
            let rubrikDate = document.createElement("div");
            rubrikDate.classList.add("rubrikDate");
            rubrikDate.innerHTML = `${day[0].date}<br>`;
            appendDay.prepend(rubrikDate);

            day.forEach(event => {

                let clone = eventTemplate.content.cloneNode(true);

                clone.getElementById("eventTime").textContent = `${event.starttid} - ${event.sluttid}`;

                clone.getElementById("eventRubrik").textContent = `${event.rubrik}`;
                clone.getElementById("merInfoDiv").textContent = ``;

                let switchMerInfo = false;
                clone.getElementById("arrow").addEventListener("click", (e) => {
                    if (switchMerInfo === false) {
                        e.target.style.transform = "rotate(90deg)";
                        let InfoDiven = e.target.parentNode.nextSibling.nextSibling;
                        InfoDiven.innerHTML = `<i>${event.merInfo}</i>`;
                        InfoDiven.classList.remove("hidden");
                        switchMerInfo = true;
                    } else {
                        e.target.style.transform = "rotate(0deg)";
                        let InfoDiven = e.target.parentNode.nextSibling.nextSibling;
                        InfoDiven.innerHTML = ``;
                        InfoDiven.classList.add("hidden");
                        switchMerInfo = false;
                    }
                })

                dayEvents.appendChild(clone);
            })
        })
    });
});


// https://casekalender.herokuapp.com/events
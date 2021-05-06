
const theDay = document.querySelector(".theDay");

const eventTemplate = document.getElementById("eventTemplate");

// const EventsPerDay = document.getElementById("EventsPerDay");

const addEventTemplate = document.getElementById("addEventTemplate");
const updateEventTemplate = document.getElementById("updateEventTemplate");


const allDayDivs = document.querySelectorAll(".enDagDagSec");

let dates = document.querySelectorAll(".dates");
let EventsPerDay = document.querySelectorAll(".EventsPerDay");
const todaysDate = document.getElementById("todaysDate");

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

    fetch('http://localhost:3002/events').then((response) => response.json()).then((eventsS) => {
        let events = eventsS.data;
        events = events.sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
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
                    clone.getElementById("rubbeBoll").style.backgroundColor = "rgb(211, 191, 79)";
                } else if (dayEvent.fritid) {
                    clone.getElementById("rubbeBoll").style.backgroundColor = "rgb(88, 173, 77)";
                } else if (dayEvent.asviktigt) {
                    clone.getElementById("rubbeBoll").style.backgroundColor = "rgb(194, 95, 95)";
                } else {
                    clone.getElementById("rubbeBoll").style.display = "none";
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
                        console.log('hej');
                        e.target.style.transform = "rotate(0deg)";
                        let InfoDiven = e.target.parentNode.nextSibling.nextSibling;
                        InfoDiven.innerHTML = ``;
                        InfoDiven.classList.add("hidden");
                        switchMerInfo = false;
                    }
                })


                clone.getElementById("edit").addEventListener("click", (e) => {
                    if (editSwitch === false) {
                        console.log('hej false');
                        console.log(e.target.closest("#bajs"));
                        e.target.closest("#bajs").remove();
                        
                        console.log(dayEvent);
                        let formClone = updateEventTemplate.content.cloneNode(true);
                        theDay.children[2].appendChild(formClone);
                        // const closeButton = document.getElementById("closeButton");
                        document.getElementById("delete").setAttribute("href", `http://localhost:3002/delete/${dayEvent.id}`)


                        


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

                        document.getElementById("addEventRubbe").textContent = "Uppdatera event " + dayEvent.date;
                                    editSwitch = true;
                    } else {
                        return;
                    }


                    setDayHeight()
                })

                date.querySelector(".EventsPerDay").appendChild(clone);

            })
            setDayHeight();

        })
        editHover()
    });

}

getTheEvents()




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



// const setCorrectDateString = () => {
//     allDayDivs[0].dataset.date = yeYesterday;
//     allDayDivs[1].dataset.date = yesterday;
//     allDayDivs[2].dataset.date = today;
//     allDayDivs[3].dataset.date = tomorrow;
//     allDayDivs[4].dataset.date = toTomorrow;
//     let yeYesterdaySplitted = yeYesterday.split("-");
//     dates[0].textContent = yeYesterdaySplitted[2] + "/" + yeYesterdaySplitted[1];

//     let yesterdaySplitted = yesterday.split("-");
//     dates[1].textContent = yesterdaySplitted[2] + "/" + yesterdaySplitted[1];

//     let todaySplitted = today.split("-");
//     dates[2].textContent = todaySplitted[2] + "/" + todaySplitted[1];

//     let tomorrowSplitted = tomorrow.split("-");
//     dates[3].textContent = tomorrowSplitted[2] + "/" + tomorrowSplitted[1];

//     let toTomorrowSplitted = toTomorrow.split("-");
//     dates[4].textContent = toTomorrowSplitted[2] + "/" + toTomorrowSplitted[1];
// }

const setCorrectDateString = () => {
    allDayDivs[0].dataset.date = yeYesterday;
    allDayDivs[1].dataset.date = yesterday;
    allDayDivs[2].dataset.date = today;
    allDayDivs[3].dataset.date = tomorrow;
    allDayDivs[4].dataset.date = toTomorrow;
    let yeYesterdaySplitted = yeYesterday.split("-");
    dates[0].textContent = yeYesterdaySplitted[2] + "/" + yeYesterdaySplitted[1];

    let yesterdaySplitted = yesterday.split("-");
    dates[1].textContent = yesterdaySplitted[2] + "/" + yesterdaySplitted[1];

    let todaySplitted = today.split("-");
    dates[2].textContent = todaySplitted[2] + "/" + todaySplitted[1];

    let tomorrowSplitted = tomorrow.split("-");
    dates[3].textContent = tomorrowSplitted[2] + "/" + tomorrowSplitted[1];

    let toTomorrowSplitted = toTomorrow.split("-");
    dates[4].textContent = toTomorrowSplitted[2] + "/" + toTomorrowSplitted[1];
}

// om månad börjar med en nolla - ta bort nolla - forsättning på set calenderFunktionerna =

// let yesterdaySplitted = yesterday.split("-");
//     if (yesterdaySplitted[1].indexOf(0) === 0) {
//         let str = yesterdaySplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[0].textContent = yesterdaySplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[0].textContent = yesterdaySplitted[2] + "/" + yesterdaySplitted[1];
//     }

//     let todaySplitted = today.split("-");
//     if (todaySplitted[1].indexOf(0) === 0) {
//         let str = todaySplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[1].textContent = todaySplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[1].textContent = todaySplitted[2] + "/" + todaySplitted[1];
//     }

//     let tomorrowSplitted = tomorrow.split("-");
//     if (tomorrowSplitted[1].indexOf(0) === 0) {
//         let str = tomorrowSplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[2].textContent = tomorrowSplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[2].textContent = tomorrowSplitted[2] + "/" + tomorrowSplitted[1];
//     }



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

    let dagar = [söndag, måndag, tisdag, onsdag, torsdag, fredag, lördag, söndag];

    let dagDivar = [yeYesterdayDayObj, yesterdayDayObj, todayDayObj, tomorrowDayObj, toTomorrowDayObj];


    dagar.forEach(dag => {
        dagDivar.forEach(dagDiv => {
            if (dagDiv.nr === dag.nr) {
                document.querySelector(`.${dagDiv.string}`).textContent = dag.day;
            }
        })
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

// const setDayHeight = () => {
//     for (let i = 0; i < allDayDivs.length; i++) {
//         let childrenHeight = 0;
//         // console.log(allDayDivs[i].children[1]);
//         for (let i2 = 0; i2 < allDayDivs[i].children.length; i2++) {
//             childrenHeight = childrenHeight + allDayDivs[i].children[i2].offsetHeight;
//             // console.log(allDayDivs[i].children[i2]);
//         }
//         console.log(allDayDivs[i].offsetHeight ,childrenHeight);
//         if (allDayDivs[i].offsetHeight < childrenHeight) {
//             allDayDivs[i].style.height = `fit-content`;
//         } else {
//             allDayDivs[i].style.height = `70vh`;
//         };
//     }
// };



const setDayHeight = () => {
    let div = allDayDivs[2];
    // console.log(div.offsetHeight);
    let childrenHeight = 0;
    for (let i = 0; i < div.children.length; i++) {

        // console.log(div.offsetHeight, div.children[i].offsetHeight);
        childrenHeight = childrenHeight + div.children[i].offsetHeight;
    }
    // console.log(div.offsetHeight, div,  childrenHeight);
    if (div.offsetHeight < childrenHeight) {
        div.style.height = `fit-content`;
        // console.log('hej');
    } else {
        div.style.height = `70vh`;
    };
};



// const setDayHeight = () => {
//     allDayDivs.forEach(div => {
//         // console.log(div.offsetHeight);
//         let childrenHeight = 0;
//         for (let i = 0; i < div.children.length; i++) {

//             // console.log(div.offsetHeight, div.children[i].offsetHeight);
//             childrenHeight = childrenHeight + div.children[i].offsetHeight;
//         }
//         console.log(div.offsetHeight, div,  childrenHeight);
//         if (div.offsetHeight < childrenHeight) {
//             div.style.height = `fit-content`;
//             console.log('hej');
//         } else {
//             div.style.height = `70vh`;
//         };
//     })
// };




const enDagAddEventButton = theDay.children[3].children[0];
const addEventInput = document.getElementById("addEventInput");
const switchBlackWhite = document.querySelector("#switchBlackWhite");

let addSwitch = false;
enDagAddEventButton.addEventListener("click", (e) => {
    if (addSwitch === false) {
        enDagAddEventButton.textContent = "";
        let clone = addEventTemplate.content.cloneNode(true);
        theDay.children[2].appendChild(clone);
        const closeButton = document.getElementById("closeButton");
        addSwitch = true;
        addEventInput.style.padding = "0.3rem";
        switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
        switchBlackWhite.style.paddingBottom = "0";
        enDagAddEventButton.style.visibility = "hidden";
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
        // setDayHeight();
        closeButton.addEventListener("click", () => {
            theDay.children[2].removeChild(document.getElementById("addEventInputSec"));
            enDagAddEventButton.textContent = "+";
            addSwitch = false;
            addEventInput.style.padding = "0";
            switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
            switchBlackWhite.style.paddingBottom = "3rem";
            enDagAddEventButton.style.visibility = "visible";
            // setDayHeight();
        })
    } else {
        return;
    }
});

// let addSwitch = false;
// enDagAddEventButton.addEventListener("click", (e) => {
//     if (addSwitch === false) {
//         enDagAddEventButton.textContent = "";
//         let clone = addEventTemplate.content.cloneNode(true);
//         theDay.children[2].appendChild(clone);
//         const closeButton = document.getElementById("closeButton");
//         addSwitch = true;
//         addEventInput.style.padding = "0.3rem";
//         switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
//         switchBlackWhite.style.paddingBottom = "0";
//         enDagAddEventButton.style.visibility = "hidden";
//         document.getElementById("dateöh").value = today;
//         document.getElementById("addEventRubbe").textContent = "Event " + today;
//         // setDayHeight();
//         closeButton.addEventListener("click", () => {
//             theDay.children[2].removeChild(document.getElementById("addEventInputSec"));
//             enDagAddEventButton.textContent = "+";
//             addSwitch = false;
//             addEventInput.style.padding = "0";
//             switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
//             switchBlackWhite.style.paddingBottom = "3rem";
//             enDagAddEventButton.style.visibility = "visible";
//             // setDayHeight();
//         })
//     } else {
//         return;
//     }
// });







const pilFram = document.getElementById("pilFram");
pilFram.addEventListener("click", () => {
    // editHover()
    setCalendarDatesFram();
    getTheEvents();
    setDayHeight();
    if (addSwitch === true) {
        document.getElementById("dateöh").value = today;
        document.getElementById("addEventRubbe").textContent = "Event " + today;
    }
    setYear();
})
const pilBak = document.getElementById("pilBak");
pilBak.addEventListener("click", () => {
    // editHover()
    setCalendarDatesBak();
    getTheEvents();
    setDayHeight();
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
    setDayHeight();
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




const addButton = document.getElementById("addButton");

addButton.addEventListener("submit", () => {
    fetch(url).then((response) => response.json()).then((events) => {
        console.log(events);
    })
})


const kategoriSec = document.getElementById("kategoriSec");
kategoriSec.addEventListener("click", (e) => {
    let chosenKat = e.target.textContent.trim();

    fetch('http://localhost:3002/events').then((response) => response.json()).then((events) => {
        events = events.data;

        let eventsSorted;
        if (chosenKat === "JOBB") {
            eventsSorted = events.filter(event => event.jobb).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
        } else if (chosenKat === "FRITID") {
            eventsSorted = events.filter(event => event.fritid).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
        } else if (chosenKat === "ASVIKTIGT") {
            eventsSorted = events.filter(event => event.asviktigt).sort((a, b) => a.starttid.replace(":", "") - b.starttid.replace(":", "")).sort((a, b) => a.date.replace(/-/g, '') - b.date.replace(/-/g, ''));
        }


        let eventSortedPerDay = [];
        let excluded = [];
        eventsSorted.forEach(event => {
            if (!excluded.includes(event.date)) {
                eventSortedPerDay.push(eventsSorted.filter(ex => ex.date === event.date))
                excluded.push(event.date);
            }
        })

        console.log(eventSortedPerDay);



        const kategoriSecRubbe = document.getElementById("kategoriSecRubbe");
        kategoriSecRubbe.textContent = chosenKat;

        document.getElementById("removehehe").innerHTML = "";

        eventSortedPerDay.forEach(day => {
            console.log(day);

            let appendDay = document.createElement("section");
            appendDay.classList.add("valdKategoriEventsSec");
            document.getElementById("removehehe").appendChild(appendDay);

            day.forEach(event => {
                if (event.merInfo === undefined) {
                    event.merInfo = "Ingen kommentar";
                }

                let appendEvent = document.createElement("section");
                // appendEvent.id = "valdKategoriEventsSec";
                appendEvent.innerHTML = `
                <section class="flex" id="valdKategoriEvents">
                <section id="linearwrap">
                    <div id="bajs">
                        <div id="eventTime">
                            ${event.date} <br> ${event.starttid} - ${event.sluttid}
                        </div>
                        <div id="rubbeSec">
                            <div id="eventRubrik">
                                ${event.rubrik}
                            </div>
                            <div id="arrow">
                                >
                            </div>
                        </div>
                        <div id="merInfoDiv">
                            ${event.merInfo}
                        </div>
                    </div>
                </section>
            </section>
                `;

                appendDay.appendChild(appendEvent);
            })
        })

        // eventsSorted.forEach(event => {
        //     if (event.merInfo === undefined) {
        //         event.merInfo = "Ingen kommentar";
        //     }

        //     let appendEvent = document.createElement("section");
        //     appendEvent.id = "valdKategoriEventsSec";
        //     appendEvent.innerHTML = `
        //     <section class="flex" id="valdKategoriEvents">
        //     <section id="linearwrap">
        //         <div id="bajs">
        //             <div id="eventTime">
        //                 ${event.date} <br> ${event.starttid} - ${event.sluttid}
        //             </div>
        //             <div id="rubbeSec">
        //                 <div id="eventRubrik">
        //                     ${event.rubrik}
        //                 </div>
        //                 <div id="arrow">
        //                     >
        //                 </div>
        //             </div>
        //             <div id="merInfoDiv">
        //                 ${event.merInfo}
        //             </div>
        //         </div>
        //     </section>
        // </section>
        //     `;

        //     document.getElementById("removehehe").appendChild(appendEvent);
        // })
    });
});



// om månad börjar med en nolla - ta bort nolla - forsättning på set calenderFunktionerna =

// let yesterdaySplitted = yesterday.split("-");
//     if (yesterdaySplitted[1].indexOf(0) === 0) {
//         let str = yesterdaySplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[0].textContent = yesterdaySplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[0].textContent = yesterdaySplitted[2] + "/" + yesterdaySplitted[1];
//     }

//     let todaySplitted = today.split("-");
//     if (todaySplitted[1].indexOf(0) === 0) {
//         let str = todaySplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[1].textContent = todaySplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[1].textContent = todaySplitted[2] + "/" + todaySplitted[1];
//     }

//     let tomorrowSplitted = tomorrow.split("-");
//     if (tomorrowSplitted[1].indexOf(0) === 0) {
//         let str = tomorrowSplitted[1];
//         for (let i = 0; i < str.length; i++) {
//             dates[2].textContent = tomorrowSplitted[2] + "/" + str[1];
//         }
//     } else {
//         dates[2].textContent = tomorrowSplitted[2] + "/" + tomorrowSplitted[1];
//     }





// delete grej

// document.getElementById("butt").addEventListener("click", () => {
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }

//     };
//     fetch("/deleteAll", options);
// })
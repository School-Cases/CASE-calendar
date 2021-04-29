// import { response } from "express";


// const url = "../../data/events.json";
const url = "../data/events.json";

fetch(url).then((response) => response.json()).then((events) => {
    console.log(events)
});



const addEventTemplate = document.getElementById("addEventTemplate");


let dates = document.querySelectorAll(".dates");


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
    dates[0].dataset.date = yeYesterday;
    dates[1].dataset.date = yesterday;
    dates[2].dataset.date = today;
    dates[3].dataset.date = tomorrow;
    dates[4].dataset.date = toTomorrow;
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

const allDayDivs = document.querySelectorAll(".enDagDagSec");

const setDayHeight = () => {
    allDayDivs.forEach(div => {
        let childrenHeight = 0;
        for (let i = 0; i < div.children.length; i++) {
            childrenHeight += div.children[i].offsetHeight;
        }
        if (div.offsetHeight < childrenHeight + 20) {
            div.style.height = `fit-content`;
        } else {
            div.style.height = `70vh`;
        };
    })


    // if (document.querySelector(".theDay").offsetHeight < document.querySelector(".enDagDagSecEventDiv").offsetHeight + document.querySelector("#addEventInput").offsetHeight) {
    //     document.querySelector(".theDay").style.height = `fit-content`;
    // } else {
    //     document.querySelector(".theDay").style.height = "20rem";
    // }
};

// const setMainDayHeight = () => {
//     if (document.querySelector(".theDay").offsetHeight < document.querySelector(".enDagDagSecEventDiv").offsetHeight + document.querySelector("#addEventInput").offsetHeight) {
//         document.querySelector(".theDay").style.height = `fit-content`;
//     } else {
//         document.querySelector(".theDay").style.height = "20rem";
//     }
// };


const theDay = document.querySelector(".theDay");
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
        closeButton.addEventListener("click", () => {
            theDay.children[2].removeChild(document.getElementById("addEventInputSec"));
            enDagAddEventButton.textContent = "+";
            addSwitch = false;
            setDayHeight();
            addEventInput.style.padding = "0";
            switchBlackWhite.style.backgroundColor = "rgb(48, 47, 47)";
            switchBlackWhite.style.paddingBottom = "3rem";
            enDagAddEventButton.style.visibility = "visible";
            // document.getElementById("dateöh").value = null;
        })
    } else {
        return;
    }
    setDayHeight();
});

const pilFram = document.getElementById("pilFram");
pilFram.addEventListener("click", () => {
    setCalendarDatesFram();
})

const pilBak = document.getElementById("pilBak");
pilBak.addEventListener("click", () => {
    setCalendarDatesBak();
})


const kategoriSec = document.getElementById("kategoriSec");
kategoriSec.addEventListener("click", (e) => {
    let chosenKat = e.target.textContent.trim();

    fetch(url).then((response) => response.json()).then((events) => {
        console.log(events);

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
            if(!excluded.includes(event.date)) {
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
            appendDay.id = "valdKategoriEventsSec";
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
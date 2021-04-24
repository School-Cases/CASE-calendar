

const addEventTemplate = document.getElementById("addEventTemplate");

let dates = document.querySelectorAll(".dates");
const setCalendarDates = () => {
    let today = new Date().toLocaleDateString();
    let yesterday = new Date(+new Date() - 86400000).toLocaleDateString();
    let tomorrow = new Date(+new Date() + 86400000).toLocaleDateString();

    let yesterdaySplitted = yesterday.split("-");
    if (yesterdaySplitted[1].indexOf(0) === 0) {
        let str = yesterdaySplitted[1];
        for (let i = 0; i < str.length; i++) {
            dates[0].textContent = yesterdaySplitted[2] + "/" + str[1];
        }
    } else {
        dates[0].textContent = yesterdaySplitted[2] + "/" + yesterdaySplitted[1];
    }

    let todaySplitted = today.split("-");
    if (todaySplitted[1].indexOf(0) === 0) {
        let str = todaySplitted[1];
        for (let i = 0; i < str.length; i++) {
            dates[1].textContent = todaySplitted[2] + "/" + str[1];
        }
    } else {
        dates[1].textContent = todaySplitted[2] + "/" + todaySplitted[1];
    }

    let tomorrowSplitted = tomorrow.split("-");
    if (tomorrowSplitted[1].indexOf(0) === 0) {
        let str = tomorrowSplitted[1];
        for (let i = 0; i < str.length; i++) {
            dates[2].textContent = tomorrowSplitted[2] + "/" + str[1];
        }
    } else {
        dates[2].textContent = tomorrowSplitted[2] + "/" + tomorrowSplitted[1];
    }
};

setCalendarDates();

const theDay = document.querySelector(".theDay");
const enDagAddEventButton = theDay.children[2].children[0];
enDagAddEventButton.addEventListener("click", (e) => {
    let clone = addEventTemplate.content.cloneNode(true);
    theDay.children[2].appendChild(clone);
    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", () => {
        theDay.children[2].removeChild(document.getElementById("addEventInputSec"));
    })
})

const pilFram = document.getElementById("pilFram");




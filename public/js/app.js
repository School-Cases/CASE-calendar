// howdy!



const addEventTemplate = document.getElementById("addEventTemplate");

const dagSec = document.getElementsByClassName("dagSec");

const addEventButtons = document.getElementsByClassName("addEventButton");

const dagSecEventDivs = document.getElementsByClassName("dagSecEventDiv");

for (let i = 0; i < addEventButtons.length; i++) {
    addEventButtons[i].addEventListener("click", (e) => {
        let clone = addEventTemplate.content.cloneNode(true);
        e.target.parentElement.appendChild(clone);
    })
}

const setCalendar = () => {
    let today = new Date();
    let dayOfWeek = today.getDay();
    if (dayOfWeek === 0) {
        dayOfWeek = 7;
    }

    let monday = new Date();
    if (dayOfWeek !== 1) {
        monday.setHours(-24 * (dayOfWeek - 1));
    }

    let currentDay = new Date(monday);

    let dates = document.querySelectorAll(".dates");
    dates.forEach(obj => {

        let currentDaySplitted = currentDay.toLocaleDateString().split("-");
        obj.textContent = currentDaySplitted[1] + "/" + currentDaySplitted[2];
        console.log(currentDay.toLocaleDateString());
        obj.dataset.date = currentDay.toLocaleDateString();

    

        currentDay.setHours(+24);
    })

    console.log("today:", dayOfWeek, "last monday:", currentDay.getDay());
}

setCalendar();



const getNumberOfWeek = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

let currentWeek = getNumberOfWeek();

const weekNumber = document.getElementById("weekNumber");

weekNumber.textContent = "v." + currentWeek;


const pilBak = document.getElementById("pilBak");
const pilFram = document.getElementById("pilFram");

pilBak.addEventListener("click", () => {
    currentWeek = currentWeek - 1;
    weekNumber.textContent = "v." + currentWeek;

    
})


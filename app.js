let incrementMonth = getMonth();
let incrementYear = getYear();

function getMonth(){
  return new Date().getMonth();
}

function getToday() {
  return  new Date().getDate();
}

function getYear() {
  return  new Date().getFullYear();
}

function getNameOfMonth(month){
    const monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
    ];
    // if (month == 12) {
    //   return monthNames[0];
    // }
    return monthNames[month];
}

// build calendar   
function buildCalendar(monthEntry, yearEntry) {
    let month = monthEntry;
    let year = yearEntry;
    const firstDay = new Date(year, month).getDay();
    const containerCalentar = document.querySelector('.wrapper');

    for(let i= 0; i < firstDay; i++){
        let day = document.createElement("div");
        day.classList.add("day");   
        containerCalentar.appendChild(day);
    }
    
    for(let i = 0; i < getTotalDaysOfMonth(month, year); i++){
        let day = document.createElement("div");
        if (i + 1  == getToday() && yearEntry == getYear()) {
            day.classList.add("today");
        }
        day.classList.add("day");
        day.innerText = i + 1;
        containerCalentar.appendChild(day);
    }
    
}

function getTotalDaysOfMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

buildCalendar(getMonth(), getYear());


const next = document.querySelector(".next");
next.addEventListener("click", function () {

    incrementMonth++;
    
    document.querySelectorAll(".day").forEach(function (day) {
        day.remove();
    });

    if (incrementMonth == 12) {
        incrementMonth = 0;
        incrementYear++;
        buildCalendar(incrementMonth, incrementYear);
    } else {
        buildCalendar(incrementMonth, incrementYear);
    }
    
    document.querySelector(".month").innerText = getNameOfMonth(incrementMonth);

});


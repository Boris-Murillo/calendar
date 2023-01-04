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
    return monthNames[month];
}

async function buildCalendar(monthEntry, yearEntry) {
    let holidays = [];
    let month = monthEntry;
    let year = yearEntry;
    const firstDay = new Date(year, month).getDay();
    const containerCalentar = document.querySelector('.wrapper');

    for(let i= 0; i < firstDay; i++){
        let day = document.createElement("div");
        day.classList.add("day");   
        containerCalentar.appendChild(day);
    }

    const data = await getHolidays();
    holidays = data.holidays;
    holidays = holidays.filter((day) => day.type[0] == 'National holiday')
    
    
    for(let i = 0; i < getTotalDaysOfMonth(month, year); i++){
        let day = document.createElement("div");
        day.addEventListener("click", function(){
            showModal();
        });
        if (
          i + 1 == getToday() &&
          yearEntry == getYear() &&
          monthEntry == getMonth()
        ) {
          day.classList.add("today");
        }
        day.classList.add("day");
        day.innerText = i + 1;
        day.id = `day${i + 1}`;
        containerCalentar.appendChild(day);
    }

    paintHolidays(holidays);
    document.querySelector(".month").innerText = getNameOfMonth(incrementMonth);
    
}

function paintHolidays(holidays){
  for(holiday of holidays ){
    let element = document.querySelector(`#day${holiday.date.datetime.day}`);
    element.classList.add('holiday');
  }
}

async function getHolidays(){
    const API_URL = "https://calendarific.com/api/v2/holidays";
    const key = "08daa6056117cec1eca0cad19ef5a8ff7257e55e";
    const country = "CO";
    res = await fetch(`${API_URL}?&api_key=${key}&country=${country}&year=${incrementYear}&month=${incrementMonth + 1}`);
    const datos = await res.json();
    return datos.response;
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

const previous = document.querySelector(".previous");
previous.addEventListener("click", function () {
  incrementMonth--;
  document.querySelectorAll(".day").forEach(function (day) {
    day.remove();
  });

  if (incrementMonth == -1) {
    incrementMonth = 11;
    incrementYear--;
    buildCalendar(incrementMonth, incrementYear);
  } else {
    buildCalendar(incrementMonth, incrementYear);
  }

  document.querySelector(".month").innerText = getNameOfMonth(incrementMonth);
});

function showModal(){
    const modal = document.createElement("div");
    const close = document.createElement("div");
    
    close.innerHTML = '<img src="icons/close.svg" id="close" alt="Previous" />';

    modal.classList.add("modal");
    document.querySelector("body").appendChild(modal);
    modal.appendChild(close);
    document.querySelector(".wrapper").classList.add("wrapper_opacity");

    // myTimeout = setTimeout( () => 
      document.querySelector(".modal").classList.add("modal_show"); 
    // 400);

    document.querySelector('#close')?.addEventListener(
      'click', () => {
        document.querySelector(".modal").remove();
        document.querySelector(".wrapper").classList.remove("wrapper_opacity");
      }
    )
   
}




let incrementMonth = getMonth();
let incrementYear = getYear();
let selected = 0;

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

    document.querySelector('.year > span').innerText = incrementYear;

    for(let i= 0; i < firstDay; i++){
        let day = document.createElement("div");
        day.classList.add("day");   
        containerCalentar.appendChild(day);
    }

    for(let i = 0; i < getTotalDaysOfMonth(month, year); i++){
        let day = document.createElement("div");
        day.addEventListener("click", function(){
            showModal(this, incrementMonth, incrementYear);
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
        paintRecordatorios(i+1, day, incrementMonth, incrementYear );

        day.addEventListener("dragover", function (e) {
          e.preventDefault();
        } );

        day.addEventListener("drop", function (e) {
          e.preventDefault();
          $elemt = document.querySelector(".bolt img");
          const clone = $elemt.cloneNode(true);
          clone.classList.add('bolt-img');
          day.appendChild(clone);
          localStorage.setItem(`Gym-${e.target.innerText}-${month}-${year}`, e.target.lastChild.src);
        } );

        day.addEventListener("dragstart", function (e) {
          localStorage.setItem('idElement', e.target.parentNode.id);
        });

        containerCalentar.appendChild(day);
    }
    document.querySelector(".month").innerText = getNameOfMonth(incrementMonth);

    const data = await getHolidays();
    holidays = data.holidays;
    holidays = holidays.filter((day) => day.type[0] == 'National holiday')
    holidays = holidays.map( (item)=> item.date.datetime.day)
    paintHolidays(holidays);
}

function paintHolidays(holidays){
  for(holiday of holidays ){
    let element = document.querySelector(`#day${holiday}`);
    if(element.classList.contains('note-background-gray')){
      element.classList.remove('note-background-gray');
      element.firstChild.classList.remove('note') ;
      element.firstChild.classList.add('note-holiday');
    }
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

document.querySelector(".trash").addEventListener("dragover", function (e) {
  e.preventDefault();
});

document.querySelector(".trash").addEventListener("drop", function (e) {
  e.preventDefault();
  let element = document.getElementById(localStorage.getItem('idElement'));
  element.childNodes[1].remove();
  localStorage.removeItem(`Gym-${element.innerText}-${incrementMonth}-${incrementYear}`);
  localStorage.removeItem('idElement');
} );

buildCalendar(getMonth(), getYear());


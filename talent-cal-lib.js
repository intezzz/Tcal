"use strict";
console.log("----------");
console.log("SCRIPT: Creating and loading our JS libraries");

function TalentCalendar(startYear, endYear, currMonth, currYear){
  this.events = [];
  this.selectedMonth = currMonth;
  this.selectedYear = currYear;
  this.selectedDay = null;
  this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  this.startYear = startYear;
  this.endYear = endYear;
}

// get the number of days of a given month
function daysInMonth(month, year){
  const day = new Date(year, month + 1, 0); // +1 as month start with 0
  return day.getDate();
}

// get filtered events
function getFilteredEvents(events, month, year){
  let ret = {};
  for (let i = 0; i < events.length; i++){
    const currDate = events[i].startTime;
    if (currDate.getMonth() === month && currDate.getFullYear() === year){
      console.log(ret[currDate.getDate()])
      if (ret[currDate.getDate()] === undefined || ret[currDate.getDate()] === null || ret[currDate.getDate() === 0]){
        ret[currDate.getDate()] = [events[i]];
        // ret[currDate.getDate()].push(events[i]);
      } else{
        // ret[currDate.getDate()] = [events[i]];
        ret[currDate.getDate()].push(events[i]);
      }
    } else{
      ret[currDate.getDate()] = 0;
    }
  }
  return ret;
}

// draw the calendar days
function drawCalendarDays(month, year){
  const calendarDays = document.getElementById("calendar-days");
  // clear previous stuff on the calendar
  calendarDays.innerHTML = "";

  // clone this.selectedDay
  let selectedDay = this.selectedDay;

  // get the events that happened this month
  // return object with dates as key, and 0 or list of events on the day as values
  const filteredEvents = getFilteredEvents(this.events, this.selectedMonth, this.selectedYear);

  // find where to start the calendar's day of week
  let currDate = new Date(year, month, 0);
  let numOfDays = daysInMonth(month, year);
  let dayOfWeek = currDate.getDay();

  // add blank days before start of the calendar days
  for (let i = 0; i <= dayOfWeek; i++){
    const blank = document.createElement("div");
    blank.classList.add("day");
    blank.classList.add("blank");
    calendarDays.appendChild(blank);
  }

  // add the actual days in the month
  for (let i = 0; i < numOfDays; i++){
    const currDate = i + 1;
    const currDay = document.createElement("div");

    // todo: use number of events properly
    // const numberOfEvents = filteredEvents[currDate] ? filteredEvents[currDate].length : 0;
    const numberOfEvents = filteredEvents[currDate] ? 1 : 0;

    currDay.id = "calendarday-" + currDate;
    currDay.classList.add("day");
    currDay.innerHTML = String(currDate) + "*".repeat(numberOfEvents); // todo: style properly
    // todo: style number of events properly
    const currMonth = month;
    const currYear = year;

    currDay.addEventListener("click", (function (){
      currDay.classList.toggle("selected");
      if (selectedDay !== currDate){
        // prevent multiple selection > toggle "selected" when another day is selected
        if (selectedDay !== null){
          const prevSelected = document.getElementById("calendarday-" + selectedDay);
          prevSelected.classList.toggle("selected");
        }
        selectedDay = currDate;
      } else{
        selectedDay = null;
      }

      // update selected date
      this.selectedDay = selectedDay;

      // update side panel event display
      drawEventsPanel(currMonth, currYear, selectedDay, this.events);
    }).bind(this));

    calendarDays.appendChild(currDay)
  }

  // add clear element
  const clear = document.createElement("div");
  clear.classList.add("clear");
  calendarDays.appendChild(clear);
}



// create the years dropdown
// startYear == oldest year of the calendar
// endYear == newest year of the calendar
// e.g. startYear == 2020, endYear == 2022 -> can pick from 2020, 2021, 2022
function drawCalendarYears(startYear, endYear, yearsElement){
  for (let i = startYear; i <= endYear; i++){
    const currYear = document.createElement("div");
    currYear.innerHTML = i;
    currYear.classList.add("dropdown-item");
    currYear.onclick = (function (){
      const selectedYear = i;
      const month = this.selectedMonth;
      return (function (){
        this.selectedYear = i;
        this.selectedDay = null;
        document.getElementById("curr-year").innerHTML = selectedYear;
        const drawingCalendarDays = drawCalendarDays.bind(this);
        drawingCalendarDays(month, selectedYear); // re-render the calendar days when clicked
        drawEventsPanel(month, selectedYear, null, this.events);
        return selectedYear;
      }).bind(this)
    }).bind(this)();
    yearsElement.appendChild(currYear);
  }
}

// create the months dropdown
function drawCalendarMonths(monthsElement){
  const months = this.months;

  for (let i = 0; i < months.length; i++){
    const currMonth = document.createElement("div");
    currMonth.classList.add("dropdown-item");
    currMonth.innerHTML = months[i];
    currMonth.onclick = (function (){
      const selectedMonth = i;
      const year = this.selectedYear;
      return (function (){
        this.selectedMonth = selectedMonth;
        this.selectedDay = null;
        document.getElementById("curr-month").innerHTML = months[i];
        const drawingCalendarDays = drawCalendarDays.bind(this);
        drawingCalendarDays(i, year); // re-render the calendar days when clicked
        drawEventsPanel(i, year, null, this.events);
        return i;
      }).bind(this)
    }).bind(this)();
    monthsElement.appendChild(currMonth);
  }
}

// get string of appearance
function getStringOfEvent(appearance){
  return appearance.eventName + "<br>" + appearance.startTime.toLocaleString('en-GB', { timeZone: 'EST' }) + "<br>" + appearance.location;
}

// insert events of current month to side panel
// return the number of events in the current month
function drawEventsPanel(currSelectedMonth, currSelectedYear, currSelectedDay, events){
  const calendarData = document.getElementById("eventlist-cell");
  calendarData.innerHTML = ""; // clear the canvas to draw events
  const eventList = document.createElement("ul");
  eventList.classList.add("event-list")
  const title = document.createElement("span");
  title.classList.add("event-title");
  title.innerHTML = currSelectedDay ? `Appearances on ${currSelectedDay}/${currSelectedMonth + 1}` : `Upcoming Appearances`;
  calendarData.appendChild(title);

  // sort events in ascending order for displaying nicely
  events.sort((b, a) => {
    return b.startTime - a.startTime;
  });

  let count = 0;
  for (let i = 0; i < events.length; i++){
    const currDate = events[i].startTime;
    const today = new Date();
    if (currDate.getFullYear() === currSelectedYear && currDate.getMonth() === currSelectedMonth){
      if (currSelectedDay === null && today.getDate() <= currDate.getDate() || currSelectedDay === currDate.getDate()){
        if (currSelectedDay === null){
          count += 1;
        }
        const listItem = document.createElement("li");
        listItem.classList.add("event");
        listItem.classList.add(events[i].eventType);
        // todo: style events properly
        const span = document.createElement("span");
        span.classList.add("event-details");
        span.innerHTML = getStringOfEvent(events[i]);
        listItem.appendChild(span);
        eventList.appendChild(listItem);
        if (count === 4){
          break;
        }
      }
    }
  }
  calendarData.appendChild(eventList);
}

function drawCalendar(elementToBeAddedTo, startYear, endYear){
  // create table that contains the calendar
  // todo: style table properly
  const calendarTable = document.createElement("table");
  calendarTable.id = "calendar-table";
  calendarTable.classList.add("calendar-table");

  const calendarTableRow = document.createElement("tr");
  calendarTableRow.id = "calendartable-firstrow";
  calendarTableRow.classList.add("calendartable-row");

  const calendarTableData = document.createElement("td");
  calendarTableData.id = "calendar-cell";
  calendarTableData.classList.add("calendar-tablecell");

  const eventData = document.createElement("td");
  eventData.id = "eventlist-cell";
  eventData.classList.add("calendar-tablecell");

  // append every component
  calendarTableRow.appendChild(calendarTableData);
  calendarTableRow.appendChild(eventData);
  calendarTable.appendChild(calendarTableRow);

  // append table to document
  elementToBeAddedTo.appendChild(calendarTable);

  // insert events in this month to the side panel
  drawEventsPanel(this.selectedMonth, this.selectedYear, this.selectedDay, this.events);


  // creates the outline of the calendar
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");
  calendar.id = "calendar";

  // month button on the top left
  const monthButton = document.createElement("div");
  monthButton.classList.add("calendar-button");
  monthButton.classList.add("month-button");
  monthButton.onclick = (function (){
    return function (){
    const months = $("#months");
    months.toggle("fast");
    }
  })();
  const currMonth = document.createElement("span");
  currMonth.id = "curr-month";
  currMonth.innerHTML = this.months[this.selectedMonth];
  monthButton.append(currMonth);
  const monthsDropdown = document.createElement("div");
  monthsDropdown.id = "months";
  monthsDropdown.classList.add("months");
  monthsDropdown.classList.add("dropdown");
  const drawingCalendarMonths = drawCalendarMonths.bind(this); // binding such this keyword works
  drawingCalendarMonths(monthsDropdown);
  monthButton.append(monthsDropdown);

  // year button on the top right
  const yearButton = document.createElement("div");
  yearButton.classList.add("calendar-button");
  yearButton.classList.add("month-button");
  yearButton.onclick = (function (){
    return function (){
      const years = $("#years");
      years.toggle("fast");
    }
  })();
  const currYear = document.createElement("span");
  currYear.id = "curr-year";
  currYear.innerHTML = this.selectedYear;
  yearButton.append(currYear);
  const yearDropdown = document.createElement("div");
  yearDropdown.id = "years";
  yearDropdown.classList.add("years");
  yearDropdown.classList.add("dropdown");
  const drawingCalendarYears = drawCalendarYears.bind(this);
  drawingCalendarYears(startYear, endYear, yearDropdown);
  yearButton.append(yearDropdown);

  // clear div
  const clearer = document.createElement("div");
  clearer.classList.add("clear");

  // dates
  const calendarDates = document.createElement("div");
  calendarDates.classList.add("calendar-dates");

  // days of the week
  const calendarDaysoftheWeek = document.createElement("div");
  calendarDaysoftheWeek.classList.add("days");
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  for (let i = 0; i < daysOfTheWeek.length; i++){
    const currDay = document.createElement("div");
    currDay.classList.add("day");
    currDay.classList.add("label");
    currDay.textContent = daysOfTheWeek[i];
    calendarDaysoftheWeek.append(currDay);
  }
  // add a clearer after all days of the week
  calendarDaysoftheWeek.append(clearer);

  // dates
  const calendarDays = document.createElement("div");
  calendarDays.id = "calendar-days";
  calendarDays.classList.add("days");

  // append to calendarDates
  calendarDates.append(calendarDaysoftheWeek);
  calendarDates.append(calendarDays);

  // append everything to calendar
  calendar.append(monthButton);
  calendar.append(yearButton);
  calendar.append(clearer);
  calendar.append(calendarDates);

  // append calendar to element to be added to
  // elementToBeAddedTo.append(calendar);
  calendarTableData.append(calendar);
  const drawingCalendarDays = drawCalendarDays.bind(this);
  drawingCalendarDays(this.selectedMonth, this.selectedYear);

}

TalentCalendar.prototype = {

  // create calendar
  createCalendar: function (elementToBeAddedTo){
    const drawingCalendar = drawCalendar.bind(this);
    drawingCalendar(elementToBeAddedTo, this.startYear, this.endYear);
  },

  // add events
  addEvents: function (events){
    this.events = events;
  },

}
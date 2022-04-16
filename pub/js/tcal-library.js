"use strict";

(function(global, document, $) {
  function TalentCalendar(startYear, endYear, currMonth, currYear, parentElement){
    this.events = [];
    this.clickableEvents = false;
    this.selectedMonth = currMonth;
    this.selectedYear = currYear;
    this.selectedDay = null;
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.startYear = startYear;
    this.endYear = endYear;
    this.colorCoding = [
      {
        eventType: "stand-up",
        color: "#8df5cf",
      },
      {
        eventType: "tv-show",
        color: "#f5ba83"
      },
      {
        eventType: "theatre",
        color: "#deb7ea"
      },
      {
        eventType: "tv-drama",
        color: "#de9182"
      },
      {
        eventType: "radio",
        color: "#ded282"
      },
      {
        eventType: "pod-cast",
        color: "#ded282"
      },
      {
        eventType: "gig",
        color: "#8dbaf5"
      },
      {
        eventType: "tour",
        color: "#8789b0"
      },
      {
        eventType: "award-show",
        color: "#f3a8f1"
      }
    ];
    this.parentElement = parentElement;
    this.generalUse = false;
  }

// get the number of days of a given month
  function _daysInMonth(month, year){
    const day = new Date(year, month + 1, 0); // +1 as month start with 0
    return day.getDate();
  }

// get filtered events
// filter by given month and year
// return {dateObj: [events]}
  function _getFilteredEvents(events, month, year){
    let ret = {};
    for (let i = 0; i < events.length; i++){
      const currDate = events[i].startTime;
      if (currDate.getMonth() === month && currDate.getFullYear() === year){
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
  function _drawCalendarDays(month, year){
    const calendarDays = this.parentElement.getElementsByClassName("calendar-days")[0];
    // clear previous stuff on the calendar
    calendarDays.innerHTML = "";

    // clone this.selectedDay
    let selectedDay = this.selectedDay;

    // get the events that happened this month
    // return object with dates as key, and 0 or list of events on the day as values
    const filteredEvents = _getFilteredEvents(this.events, this.selectedMonth, this.selectedYear);
    console.log(filteredEvents)

    // find where to start the calendar's day of week
    let currDate = new Date(year, month, 0);
    let numOfDays = _daysInMonth(month, year);
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

      const numberOfEvents = filteredEvents[currDate] ? filteredEvents[currDate].length : 0;

      currDay.classList.add("calendarday-" + currDate);
      currDay.classList.add("day");
      if (numberOfEvents > 3){
        currDay.innerHTML = String(currDate) + "<br/>" + "4+";
        const eventIndicator = document.createElement("span");
        eventIndicator.innerHTML = "4+";
      } else if (numberOfEvents > 0 && numberOfEvents <= 3) {
        currDay.innerHTML = String(currDate) + "<br/>";
        for (let j = 0; j < numberOfEvents; j++) {
          const currEvent = filteredEvents[currDate][j];
          const eventDot = document.createElement("span");
          eventDot.innerHTML = "&#8226;";
          eventDot.style.color = this.parentElement.style.getPropertyValue(`--${currEvent.eventType}-color`);
          currDay.appendChild(eventDot);
        }
      } else{
        currDay.innerHTML = String(currDate) + "<br/>" + "&nbsp;";
      }

      const currMonth = month;
      const currYear = year;

      currDay.addEventListener("click", (function (){
        currDay.classList.toggle("selected");
        if (selectedDay !== currDate){
          // prevent multiple selection > toggle "selected" when another day is selected
          if (selectedDay !== null){
            const prevSelected = this.parentElement.getElementsByClassName("calendarday-" + selectedDay)[0];
            prevSelected.classList.toggle("selected");
          }
          selectedDay = currDate;
        } else{
          selectedDay = null;
        }

        // update selected date
        this.selectedDay = selectedDay;

        // update side panel event display
        _drawEventsPanel(currMonth, currYear, selectedDay, this.events, this.clickableEvents, this.parentElement, this.generalUse);
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
  function _drawCalendarYears(startYear, endYear, yearsElement){
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
          this.parentElement.getElementsByClassName("curr-year")[0].innerHTML = selectedYear;
          const drawingCalendarDays = _drawCalendarDays.bind(this);
          drawingCalendarDays(month, selectedYear); // re-render the calendar days when clicked
          _drawEventsPanel(month, selectedYear, null, this.events, this.clickableEvents, this.parentElement, this.generalUse);
          return selectedYear;
        }).bind(this)
      }).bind(this)();
      yearsElement.appendChild(currYear);
    }
  }

// create the months dropdown
  function _drawCalendarMonths(monthsElement){
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
          this.parentElement.getElementsByClassName("curr-month")[0].innerHTML = months[i];
          const drawingCalendarDays = _drawCalendarDays.bind(this);
          drawingCalendarDays(i, year); // re-render the calendar days when clicked
          _drawEventsPanel(i, year, null, this.events, this.clickableEvents, this.parentElement, this.generalUse);
          return i;
        }).bind(this)
      }).bind(this)();
      monthsElement.appendChild(currMonth);
    }
  }

  function _drawCalendar(elementToBeAddedTo, startYear, endYear){
    // set color properties
    _updateColorCoding(this.colorCoding, elementToBeAddedTo);

    // create table that contains the calendar
    const calendarTable = document.createElement("table");
    calendarTable.classList.add("calendar-table");

    const calendarTableRow = document.createElement("tr");
    calendarTableRow.classList.add("calendartable-firstrow");
    calendarTableRow.classList.add("calendartable-row");

    const calendarTableData = document.createElement("td");
    calendarTableData.classList.add("calendar-cell");
    calendarTableData.classList.add("calendar-tablecell");

    const eventData = document.createElement("td");
    eventData.classList.add("eventlist-cell");
    eventData.classList.add("calendar-tablecell");

    // append every component
    calendarTableRow.appendChild(calendarTableData);
    calendarTableRow.appendChild(eventData);
    calendarTable.appendChild(calendarTableRow);

    // append table to document
    elementToBeAddedTo.appendChild(calendarTable);

    // insert events in this month to the side panel
    _drawEventsPanel(this.selectedMonth, this.selectedYear, this.selectedDay, this.events, this.clickableEvents, this.parentElement, this.generalUse);


    // creates the outline of the calendar
    const calendar = document.createElement("div");
    calendar.classList.add("calendar");

    // month button on the top left
    const monthButton = document.createElement("div");
    monthButton.classList.add("calendar-button");
    monthButton.classList.add("month-button");
    monthButton.style.backgroundColor = this.parentElement.style.getPropertyValue("--default-color");
    monthButton.onclick = (function (){
      const parentElement = this.parentElement;
      return function (){
        const months = $("#" + parentElement.id + " .months");
        console.log(months)
        months.toggle("fast");
      }
    }).bind(this)();
    const currMonth = document.createElement("span");
    currMonth.classList.add("curr-month");
    currMonth.innerHTML = this.months[this.selectedMonth];
    monthButton.append(currMonth);
    const monthsDropdown = document.createElement("div");
    monthsDropdown.classList.add("months");
    monthsDropdown.classList.add("dropdown");
    const drawingCalendarMonths = _drawCalendarMonths.bind(this); // binding such this keyword works
    drawingCalendarMonths(monthsDropdown);
    monthButton.append(monthsDropdown);

    // year button on the top right
    const yearButton = document.createElement("div");
    yearButton.classList.add("calendar-button");
    yearButton.classList.add("month-button");
    yearButton.style.backgroundColor = this.parentElement.style.getPropertyValue("--default-color")
    yearButton.onclick = (function (){
      const parentElement = this.parentElement;
      return function (){
        console.log(parentElement)
        const years = $("#" + parentElement.id + " .years");
        console.log(years)
        years.toggle("fast");
      }
    }).bind(this)();
    const currYear = document.createElement("span");
    currYear.classList.add("curr-year");
    currYear.innerHTML = this.selectedYear;
    yearButton.append(currYear);
    const yearDropdown = document.createElement("div");
    yearDropdown.classList.add("years");
    yearDropdown.classList.add("dropdown");
    const drawingCalendarYears = _drawCalendarYears.bind(this);
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
    calendarDays.classList.add("calendar-days");
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
    const drawingCalendarDays = _drawCalendarDays.bind(this);
    drawingCalendarDays(this.selectedMonth, this.selectedYear);

  }

// get string of appearance
  function _getStringOfEvent(appearance){
    return appearance.eventName + "<br>" + appearance.startTime.toLocaleString('en-GB', { timeZone: 'EST', hour: "2-digit", minute: "2-digit", year: "numeric", month: "numeric", day: "numeric"}) + "<br>" + appearance.location;
  }

// insert events of current month to side panel
  function _drawEventsPanel(currSelectedMonth, currSelectedYear, currSelectedDay, events, clickableEvent, parentElement, generalUse){
    const calendarData = parentElement.getElementsByClassName("eventlist-cell")[0];
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
      console.log("today", today);
      console.log(currSelectedYear, currSelectedMonth)
      if (currDate.getFullYear() === currSelectedYear && currDate.getMonth() === currSelectedMonth){
        if ((currSelectedDay === null && today.getDate() <= currDate.getDate() && today.getMonth() <= currDate.getMonth() && today.getFullYear() <= currDate.getFullYear()) || currSelectedDay === currDate.getDate()){
          if (currSelectedDay === null){
            count += 1;
          }
          const listItem = document.createElement("li");
          listItem.classList.add("event");
          listItem.classList.add(events[i].eventType);
          // listItem.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${events[i].eventType}-color`);
          listItem.style.backgroundColor = parentElement.style.getPropertyValue(`--${events[i].eventType}-color`);
          listItem.classList.add("event-" + String(i));
          if (clickableEvent){
            _drawClickableEvents(false, [listItem], events, parentElement, generalUse);
          }
          const span = document.createElement("span");
          span.classList.add("event-details");
          span.innerHTML = _getStringOfEvent(events[i]);
          listItem.appendChild(span);
          eventList.appendChild(listItem);
          if (count === 5){
            break;
          }
        }
      }
    }
    calendarData.appendChild(eventList);
  }

// formatted event time
// format: 12/3/2022 11:00:00 - 12:00:00
  function _getFormattedEventTimeString(currEvent){

    const startDate = currEvent.startTime.toLocaleDateString("en-GB", { timeZone: 'EST' });
    const endDate = currEvent.endTime.toLocaleDateString("en-GB", { timeZone: 'EST' });
    const startTime = currEvent.startTime.toLocaleTimeString("en-GB", { timeZone: 'EST', hour: "2-digit", minute: "2-digit" });
    const endTime = currEvent.endTime.toLocaleTimeString("en-GB", { timeZone: 'EST', hour: "2-digit", minute: "2-digit" });

    return startDate + " " + startTime + "&nbsp; - " + (endDate === startDate ? "" : endDate + " ") + endTime + "<br>";
  }

// mode: if it is the first time being called -> through enableClickableEvents = true
// mode == false -> redrawing due to change of selection -> called through drawEventsPanel
// toBeDrawn: list of html elements to be drawn
  function _drawClickableEvents(mode, toBeDrawn, events, parentElement, generalUse){

    if (toBeDrawn === null){
      toBeDrawn = parentElement.getElementsByClassName("event");
    }

    for (let i = 0; i < toBeDrawn.length; i++){
      const currEvent = toBeDrawn[i];

      // add cursor style on hover
      currEvent.onmouseover = (function (){
        return function (){
          currEvent.style.cursor = "pointer";
        }
      })();

      // extract index of event in this.events from element id
      // get the event details
      let index = 0;
      let currEventId = "";
      for (let i = 0; i < currEvent.classList.length; i++){
        const currClassName = currEvent.classList[i];
        if (currClassName.includes("event-")){
          index = currClassName.split("-").pop();
          currEventId = currClassName;
        }
      }
      const currEventObj = events[index];

      // draw modal (popup)
      ////////////////////////
      const eventModal = document.createElement("div");
      eventModal.classList.add("event-modal");
      eventModal.classList.add("modal-" + currEventId);
      eventModal.style.display = "none"; // set as none -> not display unless clicked
      const eventModalContents = document.createElement("div");
      eventModalContents.classList.add("event-modal-content");
      eventModal.appendChild(eventModalContents);

      // modal header -> event name & close button
      const modalHeader = document.createElement("div");
      modalHeader.classList.add("event-modal-header");
      modalHeader.classList.add(currEventObj.eventType);
      // modalHeader.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${currEventObj.eventType}-color`);
      modalHeader.style.backgroundColor = parentElement.style.getPropertyValue(`--${currEventObj.eventType}-color`);
      const closeButton = document.createElement("span");
      closeButton.classList.add("close-button");
      closeButton.innerHTML = "&times;";
      const modalTitle = document.createElement("h2");
      modalTitle.classList.add("event-modal-title");
      modalTitle.innerHTML = currEventObj.eventName;
      modalHeader.appendChild(closeButton);
      modalHeader.appendChild(modalTitle);

      // modal body
      const modalBody = document.createElement("div");
      modalBody.classList.add("event-modal-body");

      // modal body key visual
      if (currEventObj.keyVisual !== undefined){
        const modalEventKeyVisual = document.createElement("img");
        modalEventKeyVisual.src = currEventObj.keyVisual;
        modalEventKeyVisual.classList.add("event-modal-key-visual");
        modalBody.appendChild(modalEventKeyVisual);
      }

      // modal body basic details
      // including location, time, description
      const modalEventBasicDetails = document.createElement("div");
      modalEventBasicDetails.classList.add("event-modal-basic-details");
      // location
      const modalEventLocation = document.createElement("span");
      modalEventLocation.classList.add("event-modal-location");
      modalEventLocation.innerHTML = currEventObj.location + "<br>";
      modalEventBasicDetails.appendChild(modalEventLocation);
      // time
      const modalEventTime = document.createElement("span");
      modalEventTime.classList.add("event-modal-time");
      modalEventTime.innerHTML = _getFormattedEventTimeString(currEventObj);
      modalEventBasicDetails.appendChild(modalEventTime);
      // description
      if (currEventObj.description){
        const modalEventDescription = document.createElement("p");
        modalEventDescription.classList.add("event-modal-description");
        modalEventDescription.innerHTML = currEventObj.description;
        modalEventBasicDetails.appendChild(modalEventDescription);
      }
      modalBody.appendChild(modalEventBasicDetails);

      // modal body hosts
      if (currEventObj.host){
        const modalEventHost = document.createElement("div");
        modalEventHost.classList.add("event-modal-host");
        modalEventHost.innerHTML = "Host: <br/>";
        // loop through list of host info
        for (let j = 0; j < currEventObj.host.length; j++){
          const currHost = document.createElement("div");
          currHost.classList.add("event-modal-host-container");
          const name = document.createElement("span");
          name.innerHTML = "<br/>" + currEventObj.host[j].name;
          name.classList.add("event-modal-host-name");
          const hostImage = document.createElement("img");
          hostImage.src = currEventObj.host[j].image;
          hostImage.classList.add("event-modal-host-image");
          currHost.appendChild(hostImage);
          currHost.appendChild(name);
          modalEventHost.appendChild(currHost);
        }
        modalBody.appendChild(modalEventHost);
      }

      // modal body cast
      if (currEventObj.cast){
        const modalEventCast = document.createElement("div");
        modalEventCast.classList.add("event-modal-host");
        modalEventCast.innerHTML = "Cast: <br/>";
        // loop through list of cast
        for (let j = 0; j < currEventObj.cast.length; j++){
          const currCastMember = document.createElement("div");
          currCastMember.classList.add("event-modal-host-container");
          const name = document.createElement("span");
          name.innerHTML = "<br/>" + currEventObj.cast[j].name;
          name.classList.add("event-modal-host-name");
          const castImage = document.createElement("img");
          castImage.src = currEventObj.cast[j].image;
          castImage.classList.add("event-modal-host-image");
          currCastMember.appendChild(castImage);
          currCastMember.appendChild(name);
          modalEventCast.appendChild(currCastMember);
        }
        modalBody.appendChild(modalEventCast);
      }

      // modal body guests
      if (currEventObj.guests){
        const modalEventGuest = document.createElement("div");
        modalEventGuest.classList.add("event-modal-guest");
        modalEventGuest.innerHTML = "Guests: <br/>";
        // loop through list of guests info
        for (let j = 0; j < currEventObj.guests.length; j++){
          const currGuest = document.createElement("div");
          currGuest.classList.add("event-modal-host-container");
          const name = document.createElement("span");
          name.innerHTML = "<br/>" + currEventObj.guests[j].name;
          name.classList.add("event-modal-host-name");
          const guestImage = document.createElement("img");
          guestImage.src = currEventObj.guests[j].image;
          guestImage.classList.add("event-modal-host-image");
          currGuest.appendChild(guestImage);
          currGuest.appendChild(name);
          modalEventGuest.appendChild(currGuest);
        }
        modalBody.appendChild(modalEventGuest);
      }

      // modal body ticketing information
      if (currEventObj.ticketingInfo){
        const modalEventTicketing = document.createElement("div");
        modalEventTicketing.classList.add("event-modal-ticketing");
        modalEventTicketing.innerHTML = `Ticketing information: ${currEventObj.ticketingInfo.description} <br/>
                                       Book your tickets <a href="${currEventObj.ticketingInfo.link}">here</a> now!`;
        modalBody.appendChild(modalEventTicketing);
      }

      // modal body disclaimer: check show details on event official website
      if (!generalUse){
        const modalEventDisclaimer = document.createElement("div");
        modalEventDisclaimer.classList.add("event-modal-disclaimer");
        modalEventDisclaimer.innerHTML = `Please check <a href="${currEventObj.officialWebsite}">official website</a> for most updated and detailed information.`
        modalBody.appendChild(modalEventDisclaimer);
      }

      // append components to modal
      eventModalContents.appendChild(modalHeader);
      eventModalContents.appendChild(modalBody);

      // configure close button onclick event
      closeButton.onclick = function (){
        eventModal.style.display = "none";
      };

      // append modal to body
      const body = document.body;
      body.appendChild(eventModal);
      ////////////////////////

      // configure onclick event for side panel event
      currEvent.onclick = function (){
        eventModal.style.display = "block";
      };
    }

    // configure close modal when click outside of box
    window.onclick = function(event){
      const listOfModals = document.getElementsByClassName("event-modal");
      for (let i = 0; i < listOfModals.length; i++){
        if (listOfModals[i] === event.target){
          listOfModals[i].style.display = "none";
        }
      }
    };
  }

// update color coding by updating :root values
  function _updateColorCoding(newColorCoding, parentElement){
    // const root = parentElement.querySelector(":root");
    const root = parentElement;
    for (let i = 0; i < newColorCoding.length; i++){
      const currColorCode = newColorCoding[i];
      root.style.setProperty("--" + currColorCode.eventType + "-color", currColorCode.color);
    }
  }

// deal with recurring events
  function _processEvents(events){
    const processedEvents = [];
    for (let i = 0; i < events.length; i++){
      if (events[i].recurringEvent){
        const currEvent = events[i];
        for (let j = 0; j < currEvent.recurrence.numberOfTimes; j++){
          const newEvent = {...currEvent};
          newEvent.startTime = new Date(currEvent.startTime.getTime());
          newEvent.endTime = new Date(currEvent.endTime.getTime());
          if (currEvent.recurrence.repeat === "daily"){
            newEvent.startTime.setDate(newEvent.startTime.getDate() + j);
            newEvent.endTime.setDate(newEvent.endTime.getDate() + j);
          } else if (currEvent.recurrence.repeat === "weekly"){
            newEvent.startTime.setDate(newEvent.startTime.getDate() + j * 7);
            newEvent.endTime.setDate(newEvent.endTime.getDate() + j * 7);
          } else if (currEvent.recurrence.repeat === "monthly"){
            newEvent.startTime.setMonth(newEvent.startTime.getMonth() + j);
            newEvent.endTime.setMonth(newEvent.endTime.getMonth() + j);
          }
          processedEvents.push(newEvent);
        }
      } else{
        processedEvents.push(events[i]);
      }
    }
    return processedEvents;
  }

  TalentCalendar.prototype = {

    // create calendar
    createCalendar: function (){
      console.log(this)
      const drawingCalendar = _drawCalendar.bind(this);
      drawingCalendar(this.parentElement, this.startYear, this.endYear);
    },

    // add events
    addEvents: function (events){
      this.events = this.events.concat(_processEvents(events));
      if (this.parentElement.getElementsByClassName("calendar").length > 0){
        const drawingCalendarDays = _drawCalendarDays.bind(this);
        drawingCalendarDays(this.selectedMonth, this.selectedYear);
      }
    },

    // enable clickable side panel event pop-up
    enableClickableEvents: function (){
      this.clickableEvents = true;
      console.log("here")
      _drawClickableEvents(true, null, this.events, this.parentElement, this.generalUse);
    },

    // disable clickable side panel event pop-up
    disableClickableEvents: function (){
      this.clickableEvents = false;
      if (this.parentElement.getElementsByClassName("calendar").length > 0){
        const drawingCalendarDays = _drawCalendarDays.bind(this);
        drawingCalendarDays(this.selectedMonth, this.selectedYear);
      }
    },

    // customize color coding of appearances
    // newColorCoding = list of objects in the format of
    // {
    //   eventType: event-type-name (this is also the class for that type of event)
    //   color: #colorCode
    // },
    // which is also the full color scheme including default colors
    customizeColorCoding: function(newColorCoding){
      this.colorCoding = newColorCoding;
      _updateColorCoding(this.colorCoding, this.parentElement);
    },

    // for general usage
    // gets rid of the disclaimer at the bottom of event pop-up
    forGeneralUsage: function (){
      this.generalUse = true;
      // redraw calendar if enabled after drawing
      if (this.parentElement.getElementsByClassName("calendar").length > 0){
        const drawingCalendarDays = _drawCalendarDays.bind(this);
        drawingCalendarDays(this.selectedMonth, this.selectedYear);
      }
    },
  }

  // add TalentCalendar to window object if it doesn't already exist
  global.TalentCalendar = global.TalentCalendar || TalentCalendar;

})(window, window.document, $);


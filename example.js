/* JS Library usage examples */
"use strict";
const log = console.log
log('----------')
log('SCRIPT: Examples of using our libraries')
log('In general, we should have the code that uses our libraries separate from the actual library code.')

// Circle Generator
const tc = new TalentCalendar(2021, 2022, 2, 2022);
// tc.createCalendar(document.getElementById("body"), tc.startYear, tc.endYear, tc.meta);
tc.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 2, 0, 30, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 2, 0, 31, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 2, 0, 32, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 2, 0, 33, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 2, 0, 34, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 22, 0, 35, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 27, 0, 36, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 23, 0, 37, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 30, 0, 38, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 30, 0, 39, 0, 0),
    endTime: new Date(2022, 2, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
])
tc.createCalendar(document.getElementById("body"));
tc.customizeColorCoding([
  {
    eventType: "stand-up",
    color: "#8df5cf",
  },
  {
    eventType: "tv-show",
    color: "#f5ba83"
  },
  {
    eventType: "new-type",
    color: "blue"
  },
])
tc.addEvents([{
  eventName: "Test",
  eventType: "new-type",
  startTime: new Date(2022, 2, 3, 0, 39, 0, 0),
  endTime: new Date(2022, 2, 3, 0, 40, 0, 0),
  location: "somewhere"
},]);
tc.enableClickableEvents();
"use strict";

// first example
////////////////////////////
const tc = new TalentCalendar(2021, 2022, 2, 2022, document.getElementById("first-example"));
tc.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up show",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 31, 0, 0),
    location: "Around the corner"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 2, 22, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 30, 18, 35, 0, 0),
    endTime: new Date(2022, 2, 30, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "Sponge Bob",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 29, 20, 32, 0, 0),
    endTime: new Date(2022, 2, 29, 22, 1, 0, 0),
    location: "Wherever I like",
    description: "Using Sponge Bob voice for one show",
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
tc.createCalendar();
//////////////////////

// second example
// enabled clickable events
const tcTwo = new TalentCalendar(2021, 2022, 2, 2022, document.getElementById("second-example"));
tcTwo.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up show",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 31, 0, 0),
    location: "Around the corner"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 2, 22, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 30, 18, 35, 0, 0),
    endTime: new Date(2022, 2, 30, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "Sponge Bob",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 29, 20, 32, 0, 0),
    endTime: new Date(2022, 2, 29, 22, 1, 0, 0),
    location: "Wherever I like",
    description: "Using Sponge Bob voice for one show",
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
tcTwo.createCalendar();
tcTwo.enableClickableEvents();
//////////////////////

// second example
// enabled clickable events
const tcThree = new TalentCalendar(2021, 2022, 2, 2022, document.getElementById("third-example"));
tcThree.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 2, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up show",
    eventType: "stand-up",
    startTime: new Date(2022, 2, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 2, 1, 0, 31, 0, 0),
    location: "Around the corner"
  },
  {
    eventName: "The Quiz show",
    eventType: "quiz-show",
    startTime: new Date(2022, 2, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 2, 22, 19, 30, 0, 0),
    location: "NTV"
  },
])
tcThree.customizeColorCoding([
  {
    eventType: "stand-up",
    color: "#f5ba83",
  },
  {
    eventType: "tv-show",
    color: "#8df5cf"
  },
  {
    eventType: "quiz-show",
    color: "#c9eec3"
  },
  {
    eventType: "default",
    color: "#f38bb7"
  }
])
tcThree.createCalendar();
tcThree.enableClickableEvents();
//////////////////////


"use strict";

// first example
////////////////////////////
const tc = new TalentCalendar(2021, 2022, 3, 2022, document.getElementById("first-example"));
tc.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up show",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 31, 0, 0),
    location: "Around the corner"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 22, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 30, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 30, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "Sponge Bob",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 29, 20, 32, 0, 0),
    endTime: new Date(2022, 3, 29, 22, 0, 0, 0),
    location: "Wherever I like",
    description: "Using Sponge Bob voice for one show",
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 2, 0, 33, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 34, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 2, 0, 34, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 35, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 22, 0, 35, 0, 0),
    endTime: new Date(2022, 3, 22, 0, 36, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 27, 0, 36, 0, 0),
    endTime: new Date(2022, 3, 27, 0, 37, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 23, 0, 37, 0, 0),
    endTime: new Date(2022, 3, 23, 0, 38, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 30, 0, 38, 0, 0),
    endTime: new Date(2022, 3, 30, 0, 39, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 30, 0, 39, 0, 0),
    endTime: new Date(2022, 3, 30, 0, 40, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 30, 0, 40, 0, 0),
    endTime: new Date(2022, 3, 30, 0, 41, 0, 0),
    location: "somewhere"
  },
])
tc.createCalendar();
//////////////////////

// second example
// enabled clickable events
const tcTwo = new TalentCalendar(2021, 2022, 3, 2022, document.getElementById("second-example"));
tcTwo.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Stand up show",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 31, 0, 0),
    location: "Around the corner"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 22, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 30, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 30, 19, 30, 0, 0),
    location: "NTV"
  },
  {
    eventName: "Sponge Bob",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 29, 20, 32, 0, 0),
    endTime: new Date(2022, 3, 29, 22, 1, 0, 0),
    location: "Wherever I like",
    description: "Using Sponge Bob voice for one show",
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 2, 0, 33, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 2, 0, 34, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 22, 0, 35, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 27, 0, 36, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 23, 0, 37, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 30, 0, 38, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
  {
    eventName: "Stand up",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 30, 0, 39, 0, 0),
    endTime: new Date(2022, 3, 2, 0, 1, 0, 0),
    location: "somewhere"
  },
])
tcTwo.createCalendar();
tcTwo.enableClickableEvents();
//////////////////////

// third example
// enabled clickable events
const tcThree = new TalentCalendar(2021, 2022, 3, 2022, document.getElementById("third-example"));
tcThree.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Witness for the Prosecution",
    eventType: "theatre",
    startTime: new Date(2022, 3, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 31, 0, 0),
    location: "London County Hall",
    ticketingInfo: {description: "£25 each, buy through TodayTix", link: "https://www.todaytix.com/london/shows/7406-witness-for-the-prosecution"},
    keyVisual: "https://res.cloudinary.com/djvbkencg/image/upload/v1650131649/prod_1568388189325_5666_07_WFTP_TodayTix_480x720_bpqsey.webp",
    officialWebsite: "https://witnesscountyhall.com/",
    cast: [{
      name: "James Alper",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133408/James_Alper_-_Warder_osrjlm.jpg"
    }, {
      name: "Lily Blunsom-Washbrook",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133489/Lily_Blunsom-Washbrook_-_The_Woman_jrjvbf.jpg",
    }, {
      name: "James Hayes",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133922/James_Hayes_-_Mr_Justice_Wainwright_vt4has.jpg"
    }]
  },
  {
    eventName: "The Quiz show",
    eventType: "quiz-show",
    startTime: new Date(2022, 3, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 22, 19, 30, 0, 0),
    location: "NTV",
    description: "the horrifying secret-revealing quiz show",
    officialWebsite: "https://www.ntv.co.jp/quizshow/",
    host: [{name: "Sakurai Sho", image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124613/external-content.duckduckgo.com_oglygl.jpg"}],
    guests: [{name: "Yokoyama You", image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124697/external-content.duckduckgo.com_azemns.jpg"}],
    keyVisual: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124762/external-content.duckduckgo.com_bfbb8o.jpg",
  },
  {
    eventName: "recurring event",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 9, 10, 0, 0, 0),
    endTime: new Date(2022, 3, 9, 11, 0, 0, 0),
    location: "recurring",
    recurringEvent: true,
    recurrence: {numberOfTimes: 2, repeat: "daily"},
  }
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
  },
  {
    eventType: "theatre",
    color: "#ce6fe5"
  }
]);
tcThree.createCalendar();
tcThree.enableClickableEvents();
//////////////////////

// second example
// enabled clickable events
const tcFour = new TalentCalendar(2021, 2022, 3, 2022, document.getElementById("forth-example"));
tcFour.addEvents([
  {
    eventName: "The Late Late Show",
    eventType: "tv-show",
    startTime: new Date(2022, 3, 1, 0, 0, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 1, 0, 0),
    location: "CBS",
  },
  {
    eventName: "Witness for the Prosecution",
    eventType: "theatre",
    startTime: new Date(2022, 3, 1, 0, 30, 0, 0),
    endTime: new Date(2022, 3, 1, 0, 31, 0, 0),
    location: "London County Hall",
    ticketingInfo: {description: "£25 each, buy through TodayTix", link: "https://www.todaytix.com/london/shows/7406-witness-for-the-prosecution"},
    keyVisual: "https://res.cloudinary.com/djvbkencg/image/upload/v1650131649/prod_1568388189325_5666_07_WFTP_TodayTix_480x720_bpqsey.webp",
    officialWebsite: "https://witnesscountyhall.com/",
    cast: [{
      name: "James Alper",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133408/James_Alper_-_Warder_osrjlm.jpg"
    }, {
      name: "Lily Blunsom-Washbrook",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133489/Lily_Blunsom-Washbrook_-_The_Woman_jrjvbf.jpg",
    }, {
      name: "James Hayes",
      image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650133922/James_Hayes_-_Mr_Justice_Wainwright_vt4has.jpg"
    }]
  },
  {
    eventName: "The Quiz show",
    eventType: "tv-drama",
    startTime: new Date(2022, 3, 22, 18, 35, 0, 0),
    endTime: new Date(2022, 3, 22, 19, 30, 0, 0),
    location: "NTV",
    description: "The horrifying secret-revealing quiz show.",
    officialWebsite: "https://www.ntv.co.jp/quizshow/",
    host: [{name: "Sho Sakurai", image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124613/external-content.duckduckgo.com_oglygl.jpg"}],
    guests: [{name: "You Yokoyama", image: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124697/external-content.duckduckgo.com_azemns.jpg"}],
    keyVisual: "https://res.cloudinary.com/djvbkencg/image/upload/v1650124762/external-content.duckduckgo.com_bfbb8o.jpg",
  },
  {
    eventName: "recurring event",
    eventType: "stand-up",
    startTime: new Date(2022, 3, 9, 10, 0, 0, 0),
    endTime: new Date(2022, 3, 9, 11, 0, 0, 0),
    location: "recurring",
    recurringEvent: true,
    recurrence: {numberOfTimes: 2, repeat: "daily"},
  }
]);
tcFour.forGeneralUsage();
tcFour.createCalendar();
tcFour.enableClickableEvents();



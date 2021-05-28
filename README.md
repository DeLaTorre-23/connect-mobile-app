# MEET App

MeetApp is serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events. The serverless function is hosted by the cloud provider AWS.

Meet App allows users to search for a list of Web develope events hosted in a specific city. The user can view charts that display how many events will take place in that city on upcoming days as well as view the popularity of event genres in the form of a pie chart.

- Serverless : No backend maintenance, easy to scale, always available, no cost for idle time.
- PWAs : (progressive web application) Instant loading, offline support, push notifications, “add to home screen” prompt, responsive design, and cross-platform compatibility.
- TDD : (test-driven development) Its writes the test before writing the actual functionality for the app in code.

## Technologies

- Requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- Written with [React](https://reactjs.org)
- TDD [Jest](https://jestjs.io)
- Serverless function [AWS-Lambda](https://aws.amazon.com/lambda/)
- API [Google Calendar](https://developers.google.com/calendar/)

## Features

- Users can enter their name and choose a background color for the chat screen before joining the chat.
- Displaying the conversation, as well as an input field and submit button.
- Provide users with two additional communication features: sending images and location data.

## Technical

- React Native.
- Developed using Expo.
- Chat conversations stored in Google Firestore Database.
- Users can pick and send images from the phone’s image library.
- Users take pictures with the device’s camera app, and send it.
- Images stored in Firebase Cloud Storage.
- Read and send the user’s location data.

## How to use

Currently the app can be viewed on [GitHub Pages](https://delatorre-23.github.io/MeetApp/).
To run it locally yourself, clone the repository, and complete the following steps:

### Install dependencies

```bash
npm install
```

### Start application with npm and run in browser

_By default the app will run a local server on port: 3000_

```bash
npm run start
```

### Running application tests

```bash
npm run test
```

---

## User's History

Described in terms of user stories and scenarios.

- FEATURE 1: FILTER EVENTS BY CITY

* As a user, I should be able to “filter events by city”. So that I can see the list of events that take place in that city

#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

- Given user hasn’t searched for any city
- When the user opens the app
- Then the user should see a list of all upcoming events

#### Scenario 2: User should see a list of suggestions when they search for a city.

- Given the main page is open
- When user starts typing in the city textbox
- Then the user should see a list of cities (suggestions) that match what they’ve typed

#### Scenario 3: User can select a city from the suggested list.

- Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
- When the user selects a city (e.g., “Berlin, Germany”) from the list
- Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

* FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

- As a user, I should be able to “show or hide an event's details from the list”. So that I can see that particular event in more detail

#### Scenario 1: An event element is collapsed by default.

- Given the events are displayed in a list without seeing all the event information.
- When the user has the list of results of the events.
- Then the user should see only a summary of all the event information.

#### Scenario 2: User can expand an event to see its details.

- Given the event element is collapsed.
- When user clicks the "show details" button inside of the event element.
- Then the "show details" button allow to see the rest of information, expanding the container.

#### Scenario 3: User can collapse an event to hide its details.

- Given the event element is expanded.
- When the "hide details" button collapses the container.
- Then the event element will go back to default.

* FEATURE 3: SPECIFY NUMBER OF EVENTS

- As a user, I should be able to “specify the total numbers of event represented in the webpage”. So that I will be able to change the number of events that are displayed at the same time.

#### Scenario 1: When user hasn’t specified a number, 32 is the default number.

- Given the user hasn’t specified a number of events.
- When the user filter the events without specify a number.
- Then the events list will display a total of 32 events.

#### Scenario 2: User can change the number of events they want to see.

- Given the user was typing the number of events that they want to see.
- When the user introduce the number in the input box of the search list.
- Then the event list will show the number of events that was selected by the user.

* FEATURE 4: USE THE APP WHEN OFFLINE

- As a user, I should be able to “see events for a city that I have in the cache”. So that I can see the events without internet.

#### Scenario 1: Show cached data when there’s no internet connection.

- Given the app wasn't receiving data.
- When the app don't have data.
- Then the app will bring the data from the cache to display the events that It was cached.

#### Scenario 2: Show error when user changes the settings (city, time range).

- Given the app was not receiving data while the user changed the settings.
- When the app can't receive the new data settings.
- Then the app should show an error container.

* FEATURE 5: DATA VISUALIZATION

- As a user, I should be able to "see the event data plotted on a graph. So that I can see all the events in that city graphically.

#### Scenario 1: Show a chart with the number of upcoming events in each city.

- Given the app display data of the upcoming events in each city in a chart.
- When the user see a chart of the upcoming events to see.
- Then the app will display a chart with the upcoming events in each city.

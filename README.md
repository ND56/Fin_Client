# Fin

## Links

-   [Front-end Repo]: https://github.com/ND56/Fin_Client
-   [Deployed Front-end]: https://nd56.github.io/Fin_Client/

-   [Back-end Repo]: https://github.com/ND56/Fin_API
-   [Deployed Back-end]: https://fin-api.herokuapp.com/

## Overview

Fin is a conversational companion and personal assistant for users to interact with. Users are prompted to create a profile upon logging in, after which they are free to engage with Fin and edit or delete their profile as they see fit.

## Functionality

In it's current iteration, users can prompt Fin to do the following:

1. Tell jokes
2. Muse on the meaning of life
3. Engage in simple conversation
4. Provide a random fact
5. Send text messages
6. Report on the weather
7. Search the web

## Technologies & Platforms

### Front-End

Front-end: (1) HTML (including Handlebars), (2) CSS, (3) Bootstrap, and (4) JavaScript (including jQuery for DOM manipulation and jQuery/AJAX for API interactions).

1. HTML/CSS/Bootstrap
2. JavaScript/jQuery/AJAX
3. Web Sockets - Socket.io
4. Google Custom Search Engine ('CSE') API

### Back-End

1. Node.js
2. Express
3. Mongoose
4. MongoDB
5. Web Sockets - Socket.io
6. Dialogflow API
7. World Weather Online API (via Web Hook)
8. Twilio (via Web Hook)

### Example Input/Output Path: Query for Weather

![alt text](https://imgur.com/4l2cVDO.jpg)

## Improvements Anticipated in Future Iterations

The following are improvements that I hope to continue working on:

1. Improve Fin's conversational abilities
2. Broaden Fin's practical skill set
3. Allow for vocal input/output
4. UI improvements

## Planning

### Wireframe

![alt text](https://imgur.com/6qgSl3g.jpg)

### User Stories

#### First Iteration

1. As a user, I want to be able to sign up to use this app.
2. As a user, I want to be able to sign in to use this app.
3. As a user, I will want to be able to change my password that I use for signing in to this app.
4. As a user, I want to be able to create a profile that will provide Fin with useful information about me.
5. As a user, I want to be able to have a username as part of my profile. (I will use this to speak with Fin)
6. As a user, I want to be able to have my telephone number saved as part of my profile. (In future iterations, this will allow Fin to set reminders for me)
7. As a user, I will want to be able to edit and delete my profile.
8. As a user, I want to be able to chat with Fin.
9. As a user, I want this experience to feel like I'm speaking with a human.

#### Future Iteratons: Epic User Story

10. As a user, I want Fin to be able to perform a wide variety of helpful functionality through the use of third-party API calls.

### Fin's First Words

![alt text](https://imgur.com/w8B4TaY.jpg)

### Planned Schedule For First Iteration (Established during early planning stages)

Friday, April 13, 2018
	(1) Wireframe
	(2) User Stories
	(3) ERD
	(4) Build resource (user profile) into database
	(5) curl CRUD all user and profile actions

Saturday, April 14, 2018
	(6) Build basic UI
  (7) CRUD user resource through UI
  (8) CRUD profile resource through UI

Sunday, April 15, 2018
	(8) Build out UI for chat
	(9) Implement chat functionality
	(10) Tailor API socket broadcast to only the emitting client
	(11) Implement unique session ID for each client interaction with Fin

Monday-Thursday, April 16-19, 2018
	(12) Improve AI generally (conversational skills, etc.)
  (13) Implement practical AI functionality
    (a) Weather API
    (b) Twilio API
    (c) Google API
  (14) Style
  (15) ReadME
  (16) Debug/Test

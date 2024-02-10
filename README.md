# Fullstack_Codebloggs

Collaboration and Design MOD 9 &amp; 10

### Matt and Ric

#### Setup and deployment:

The backend is in `./server` - main start file is `server.js`

- The `routes, controllers, middleware, and DB` all reside in the server directory
- .env in `./ ` is the configuration file for the server and the client
  To start the server, navigate to `./server/` and execute `'npm start'`

The frontend is in `./client` - main start file is `index.js`

- The public folder contains the index.html file and the images in `./public/img/`
- The src folder contains the React pages and code. - App.js and index.js are in `./src/` - The components are all in `./src/componnents/` - .env is in `./` and serves as the configuration file for the client frontend and the server backend
  To start the frontend, navigate to `./client/` and execute `'npm start'`

.env: see the submition file

# Research Answers / Documentation:

## Research Documents

### Matt Research Document

#### Reactive design

 Reactive design allows a website to seamlessly adjust its layout, content, and functionality based on user interactions, screen sizes, and device capabilities. It's all about providing users with a dynamic and engaging experience, where the website responds intelligently to their actions, ensuring smooth navigation and optimal usability regardless of the device they're using.

#### Responsive Design

Responsive design makes the webiste capable of gracefully contorting and adjusting itself to fit any screen size or device type. Whether you're browsing on a large desktop monitor or a tiny smartphone screen, responsive design ensures that the website's layout, images, and text resize and rearrange themselves fluidly to provide the best possible viewing experience. The website should adapt seamlessly to your device making navigation effortless and it's content easily accessible.

#### Differences between Reactive and Responsive Design

Reactive design and responsive design, while both aiming to enhance user experience across various devices, operate in distinct ways. 
Responsive design primarily focuses on adapting the layout and content of a website to different screen sizes, ensuring readability and accessibility across devices like desktops, tablets, and smartphones. It employs fluid grids, flexible images, and media queries to achieve this adaptability, allowing the website to seamlessly resize and restructure its elements.
On the other hand, reactive design goes beyond mere adaptation by introducing dynamic interactivity and real-time responsiveness to user actions and environmental changes. Unlike responsive design, which mainly adjusts based on screen dimensions, reactive design leverages technologies like JavaScript and reactive frameworks to create highly interactive and engaging user experiences. It responds not only to screen size variations but also to user inputs, device capabilities, and other contextual factors, offering a more personalized and intuitive interaction model.
While responsive design ensures consistent display and usability across devices, reactive design elevates the user experience by adding layers of interactivity and responsiveness, making the website feel more alive and dynamic. Each approach has its merits depending on the goals and requirements of the project, with responsive design focusing on universal accessibility and reactive design emphasizing user engagement and interaction.

### Ric’s Research Document

#### Reactive Design

Reactive design is a web design approach that creates different layouts for different devices or screen sizes. A reactive website detects the device type and screen size of the user and then selects the most suitable layout from a predefined set of options. For example, a reactive website may have a desktop layout, a tablet layout, and a mobile layout, and switch between them depending on the user’s device.

#### Responsive Design

Responsive design is a web design approach that creates a single layout that adapts to any device or screen size. A responsive website uses fluid grids, flexible images, and media queries to adjust the design elements to fit the available space. For example, a responsive website may have a single layout that changes the position, size, or visibility of the elements depending on the user’s screen width.

#### Differences between Reactive and Responsive Design

The main difference between reactive and responsive design is that reactive design uses multiple fixed layouts, while responsive design uses one fluid layout. Reactive design requires more coding and maintenance, as each layout needs to be designed and updated separately. Responsive design requires less coding and maintenance, as the same layout works for all devices and screen sizes. However, reactive design may offer more control and customization, as each layout can be tailored to the specific device and user experience. Responsive design may offer more consistency and simplicity, as the same layout provides a uniform user experience across all devices.

#### Reactive and Responsive Design in our Project

In our project, we are using responsive design, which adjusts for various screen sizes. There are media queries, which were picked to adjust the size of items before they would collide with each other as the screen size changes. This keeps it consistent as the screen size changes. This has its limits, though. At extremely small sizes, the limitations are evident. It was necessary to set up the sidebar and the main area as siblings to keep them consistent as the screen size would change. Overall, I feel its responsiveness works well, but there is still room for refinement and improvement.

# Documentation

<!-- ![CodeBloggs](./images/CodeBloggsTitle2.png) -->
<!-- <img src="./images/codebloggs1.png" alt="Login Wire Frame" width="480" height="270" style="float: left; margin-right: 20px;"></img> -->

<img src="./images/CodeBloggs logo2.png" alt="CodeBloggs" width="300" height="78"></img>

## Wireframes:

<div style="clear: both;">
<img src="./images/codebloggs1.png" alt="Login Wire Frame" width="480" height="270" ></img>

### Login Wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   No DATA is required from the backend to render the wireframe.

2. What, if any, ACTIONS is this wireframe responsible for?
The wireframe takes input of email and password with basic validation. When the Submit button is clicked, the email and password are sent to the Login API to initiate the login process. Save information (not password) in the authContext useState variables.
API Call: POST(URL/user/login) req.body = { email, password } [see API Description]
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs2.png" alt="Regiser Wire Frame" width="480" height="270" ></img>

### Register Wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   No DATA is required from the backend to render the wireframe.

2. What, if any, ACTIONS is this wireframe responsible for?
This wireframe is used to register a new user. It has 7 input fields for the user to provide information. This information will be sent to the backend to create a new user.  
API Call: POST(URL/user/register) req.body = { first_name, last_name, birthday, email, password, status, occupation, location, auth_level } [see API Description]
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs3.png" alt="Base Frames and Dropdown Wire Frame" width="480" height="270" ></img>

### Base Frames and Dropdown wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   DATA needs to be retrieved to populate MAIN. MAIN will be covered in the next several wireframes. User name is retrieved from the authContext useState which was saved from the LOGIN.

2. What, if any, ACTIONS is this wireframe responsible for?
The action is to initiate the population of the MAIN area of the page. It needs to provide a means to logout and access settings. It also provides a navigation pain for navigation to other main pages.
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs5-new.png" alt="User view Wire Frame" width="480" height="270" ></img>

### Main - User View Wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   A list of posts will be needed from the backend to render the wireframe. The list will be filtered down to the user, and the number of posts and the date of the last post will be calculated.
   API call: GET(URL/post/) {See API Description}

2. What, if any, ACTIONS is this wireframe responsible for?
This wireframe will display user information in the left column, and the user’s posts in the right column. The wireframe will get user information which is stored in the authContext, and it will calculate from the list of user’s posts the number of posts, and the date of the last post. It will format the user information and the user’s posts on the display. The user is not allowed to make any comments on their own posts or like their own posts. On this wire frame, the user may like comments from others.  
API Call: PUT(URL/comment/like/:id) where id is the comment id. [see API Description]
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs4.png" alt="Post modal Wire Frame" width="480" height="270" ></img>

### Post Modal wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   No DATA is required from the backend to render the wireframe.

2. What, if any, ACTIONS is this wireframe responsible for?
The action is to take the user input in the text box and create a new blogg post.
API Call: POST(URL/post/) req.body = { content , user_id } [see API Description]
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs6.png" alt="Bloggs Wire Frame" width="480" height="270" ></img>

### Main - Bloggs View wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   Get the X number of recent blogg posts and display them as a list. Can be modified to omit the user’s own posts.
   API Call: GET(URL/post/) [see API Description]

2. What, if any, ACTIONS is this wireframe responsible for?
This wire frame will allow the user to read the post and comments. Also, they can like and comment on the post or comments which are not their own.
API Call: PUT(URL/comment/like/:id) where id is the comment id. [see API Description]
API Call: PUT(URL/post/like/:id) where id is the post id. [see API Description]
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs7.png" alt="Network Wire Frame" width="480" height="270" ></img>

### MAIN-Network Wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   Get the X number of users and display them as a list.
   API Call: GET(URL/user/) [see API Description]

2. What, if any, ACTIONS is this wireframe responsible for?
Clicking a user will show all user info in a separate area.
</div>
<br />
<br />
<div style="clear: both;">
<img src="./images/codebloggs8.png" alt="Admin Wire Frame" width="480" height="270" ></img>

### Main-Admin View Wire frame

1. What, if any DATA is required from the backend to render the wireframe?
   This wireframe will be available to those users with auth_level of “Admin”. Currently it is not developed. Two cards are available that will be developed in the future.

2. What, if any, ACTIONS is this wireframe responsible for?
When developed, the cards will take the admin to the appropriate management pages.
<br />
<br />
</div>

# API DESCRIPTIONS

## MongoDB Schema Wire frame

<div style="clear: both;">
<img src="./images/codebloggs11-newnew.png" alt="Schema Wire Frame" width="480" height="270" ></img>

These four schemas define the MongoDB utilized by this site. They are managed by the backend via several APIs.
<br />
<br />

</div>

## User APIs

### usersList

#### POST /user/login

Login API which will check that the provided user is in the User collection, and that the provided password matches the encrypted password in the document.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | { email, password } | Take email and password as body parameters. Return valid true/false, and user \_id and auth_level. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "user": {
      "_id": "65b2734fd030c1e2fcfd6f00",
      "auth_level": "Basic"
    }
  },
  "message": "Login successful"
}
```

### Register API

#### POST /user/register

This API creates a new user with the required information. It will make the auth_level value “Basic”.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | { first_name, last_name, birthday, email, password, status, location, occupation, auth_level } | Take all required fields as body parameters and create an account.
Birthday in Date format (YYYY-MM-DD[THH:MM:SS])-THH:MM:SS is optional. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true
  },
  "message": "User created"
}
```

### Logout API

#### POST /user/logout

This API Takes no parameters. The API checks for a session that matches the session_id cookie. If a match is found, the session is removed, and the cookie is cleared.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "message": "You are logged out"
}
```

### usersList API

#### GET /user/

No parameters required for this API. It will return a list of users sorted alphabetically by last_name.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "user_list": [
      {
        "user_id": "65b2734fd030c1e2fcfd6f00",
        "first_name": "Jim",
        "last_name": "Doe",
        "birthday": "2024-01-25T09:00:00.000Z",
        "email": "jimdoe@email.com",
        "status": "I am in school",
        "location": "Tampa",
        "occupation": "Software Developer",
        "auth_level": "Basic"
      },
      {
        "user_id": "65b273edd030c1e2fcfd6f02",
        "first_name": "John",
        "last_name": "Smith",
        "birthday": "1999-12-31T00:00:00.000Z",
        "email": "johnsmith@email.com",
        "status": "I am working",
        "location": "St. Petersburg",
        "occupation": "Software Developer",
        "auth_level": "Admin"
      },
      {
        "user_id": "65b27587d030c1e2fcfd6f05",
        "first_name": "Timmy",
        "last_name": "Timmy",
        "birthday": "2005-07-04T16:00:00.000Z",
        "email": "timmy@email.com",
        "status": "Timmy",
        "location": "Madeira Beach",
        "occupation": "Software Engineer",
        "auth_level": "Admin"
      }
    ]
  },
  "message": "Users sent"
}
```

### getUser API

#### GET /user/:user_id

This API takes a user_id as a path parameter, and it returns the information for that user not including the password.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | user_id | Takes user_id to identify the user info to return |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "user": {
      "user_id": "65b273edd030c1e2fcfd6f02",
      "first_name": "John",
      "last_name": "Smith",
      "birthday": "1999-12-31T00:00:00.000Z",
      "email": "johnsmith@email.com",
      "status": "I am working",
      "location": "St. Petersburg",
      "occupation": "Software Developer",
      "auth_level": "Admin"
    }
  },
  "message": "User sent"
}
```

### updateUser API

#### PUT /user/:user_id

This API takes a user id as a path parameter, and a complete copy of the user with any changes. It can also take just the items that have changed. It then updates the user. It responds with a copy of the updated user not including the password.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | user_id | Take the post id to be updated. |
| Query | query_param | Brief description |
| Body | user_id, first_name, last_name, birthday, email, status, location, occupation, auth_level, password | Take user_id, first_name, last_name, birthday, email, status, location, occupation, auth_level, and password. Return the updated user. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "user": {
      "user_id": "65b27587d030c1e2fcfd6f05",
      "first_name": "Timmy",
      "last_name": "Timmy",
      "birthday": "2005-07-04T16:00:00.000Z",
      "email": "timmy@email.com",
      "status": "Timmy",
      "location": "Madeira Beach",
      "occupation": "Software Developer",
      "auth_level": "Basic"
    }
  },
  "message": "Profile updated successfully"
}
```

### deleteUser API

#### DELETE /user/:id

The deleteUser API takes the user id and scans for posts and comments to be deleted. It then removes any posts and comments by id from the post and comment collection and removes the refference from the comments array in the posts when comments are deleted. It then removes the posts from the post collection. Once all comments and posts by the user are deleted, the session collection is checked for any sessions with the user_id. If a session is found, it is removed from the session collection. Then the user is removed from the user collection. Finally it responds with message "User deleted successfully".

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id to identify the comment to delete. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true
  },
  "message": "User deleted successfully"
}
```

## Session APIs

### createSession API

#### POST /session/

The API will take the user_id and create a uuid v4 token to be used as a session_id. A session will be created using the session_id, a session_date set as now, and the user_id. It will then post a new cookie named session_id with a maxAge of 24 hours.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | user_id | Takes user_id to create the user’s session. Returns the Session information. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "newSession": {
      "session_id": "1d64c842-e345-4424-92ea-725a3f44c2c5",
      "session_date": "2024-01-25T18:43:37.532Z",
      "user": "65b273edd030c1e2fcfd6f02",
      "_id": "65b2abd96eccb591c2e8bca3",
      "createdAt": "2024-01-25T18:43:37.544Z",
      "updatedAt": "2024-01-25T18:43:37.544Z",
      "__v": 0
    }
  },
  "message": "Session saved successfully"
}
```

### validateToken API

#### POST /validate_token/

No parameters are required for this API. It uses the Session_id cookie and checks that the cookie matches a session document in the sessions collection. If found, it responds with calid: true and the user.id: set to user.\_id.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**_Sample Response_**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "user": {
      "id": "65b273edd030c1e2fcfd6f02"
    }
  },
  "message": "Valid session"
}
```

## Post APIs

### getAllPosts API

#### GET /post/

No parameters are required. Returns a list of all posts sorted from the newest to the oldest.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "posts": [
      {
        "_id": "65b3ec6d64ea0b5efdc63c69",
        "content": "Tim Tim Timmy",
        "user_id": {
          "_id": "65b27587d030c1e2fcfd6f05",
          "first_name": "Timmy",
          "last_name": "Timmy",
          "birthday": "2005-07-04T16:00:00.000Z",
          "email": "timmy@email.com",
          "status": "Timmy",
          "location": "Madeira Beach",
          "occupation": "Software Engineer",
          "auth_level": "Admin"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T17:31:25.178Z",
        "comments": []
      },
      {
        "_id": "65b3ebfb64ea0b5efdc63c65",
        "content": "Test3 content update",
        "user_id": {
          "_id": "65b2734fd030c1e2fcfd6f00",
          "first_name": "Jim",
          "last_name": "Doe",
          "birthday": "2024-01-25T09:00:00.000Z",
          "email": "jimdoe@email.com",
          "status": "I am in school",
          "location": "Tampa",
          "occupation": "Software Developer",
          "auth_level": "Basic"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T17:29:31.970Z",
        "comments": [
          {
            "_id": "65b4031aab772734dbbab374",
            "content": "Tim Tim Timmy",
            "post_id": "65b3ebfb64ea0b5efdc63c65",
            "user_id": {
              "_id": "65b27587d030c1e2fcfd6f05",
              "first_name": "Timmy",
              "last_name": "Timmy"
            },
            "likes": 0,
            "time_stamp": "2024-01-26T19:08:10.526Z"
          }
        ]
      }
    ]
  },
  "message": "Posts fetched successfully"
}
```

### getPost

#### GET /post/:id

The getPost API takes a post id, and returns a response with the post contents.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Provide the post id, returns the requested post |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "post": {
      "_id": "65b3e3921cba8ff819673bdf",
      "content": "Test content",
      "user_id": {
        "_id": "65b2734fd030c1e2fcfd6f00",
        "first_name": "Jim",
        "last_name": "Doe",
        "birthday": "2024-01-25T09:00:00.000Z",
        "email": "jimdoe@email.com",
        "status": "I am in school",
        "location": "Tampa",
        "occupation": "Software Developer",
        "auth_level": "Basic"
      },
      "likes": 0,
      "time_stamp": "2024-01-26T16:53:38.323Z",
      "comments": [
        {
          "_id": "65b4063317e9e5c35639a420",
          "content": "This is a comment on the Test post.  It will be great to keep these going.",
          "post_id": "65b3e3921cba8ff819673bdf",
          "user_id": {
            "_id": "65b273edd030c1e2fcfd6f02",
            "first_name": "John",
            "last_name": "Smith"
          },
          "likes": 0,
          "time_stamp": "2024-01-26T19:21:23.688Z"
        },
        {
          "_id": "65b407db6bb3a8bd2a457a9c",
          "content": "The content is updated",
          "post_id": "65b3e3921cba8ff819673bdf",
          "user_id": {
            "_id": "65b2734fd030c1e2fcfd6f00",
            "first_name": "Jim",
            "last_name": "Doe"
          },
          "likes": 0,
          "time_stamp": "2024-01-26T17:29:31.970Z"
        }
      ]
    }
  },
  "message": "Post fetched successfully"
}
```

### createPost API

#### POST /post/

The createPost API takes the content and user_id. It then creates a new post with likes set to 0, the date set to now, and the comments set to an empty array. It then returns the new post.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | content, user_id | Take content and user_id, and create a new post. Return the new post. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "savedPost": {
      "content": "Tim Tim Timmy",
      "user_id": "65b27587d030c1e2fcfd6f05",
      "likes": 0,
      "time_stamp": "2024-01-26T17:31:25.178Z",
      "comments": [],
      "_id": "65b3ec6d64ea0b5efdc63c69",
      "createdAt": "2024-01-26T17:31:25.182Z",
      "updatedAt": "2024-01-26T17:31:25.182Z",
      "__v": 0
    }
  },
  "message": "Post saved successfully"
}
```

### updatePost API

#### PUT /post/:id

This API takes a post id as a path parameter, and a complete copy of the post with any changes. It then updates the post. It responds with a copy of the updated post.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take the post id to be updated. |
| Query | query_param | Brief description |
| Body | content, user_id, likes, time_stamp, comments | Take content, user_id, likes, time_stamp, and comments. Return the updated post. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "post": {
      "_id": "65b3ebfb64ea0b5efdc63c65",
      "content": "Test3 content update",
      "user_id": "65b2734fd030c1e2fcfd6f00",
      "likes": 0,
      "time_stamp": "2024-01-26T17:29:31.970Z",
      "comments": [],
      "createdAt": "2024-01-26T17:29:31.980Z",
      "updatedAt": "2024-01-26T18:37:59.431Z",
      "__v": 0
    }
  },
  "message": "Post updated successfully"
}
```

### likePost API

#### PUT /post/like/:id

The likePost API takes the post id as a path parameter, and it then increments the likes value by 1. It responds with a copy of the updated post.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a post id to identify the comment to like. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "post": {
      "_id": "65b3e3921cba8ff819673bdf",
      "content": "Test content",
      "user_id": "65b2734fd030c1e2fcfd6f00",
      "likes": 2,
      "time_stamp": "2024-01-26T16:53:38.323Z",
      "comments": [
        "65b4063317e9e5c35639a420",
        "65b407db6bb3a8bd2a457a9c",
        "65bd2fc959125916e90e0387",
        "65bd304359125916e90e0390",
        "65bd30c959125916e90e0399",
        "65bd30d759125916e90e03a2"
      ],
      "createdAt": "2024-01-26T16:53:38.344Z",
      "updatedAt": "2024-02-03T19:11:09.904Z",
      "__v": 0
    }
  },
  "message": "Post liked successfully"
}
```

### deletePost API

#### DELETE /post/:id

The deletePost API takes the post id of the post to be deleted. It then removes any comments by id from the comment collection and removes the refference from the comments array in the post. It then removes the post from the post collection. Finally it responds with message "Post deleted successfully".

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id to identify the comment to delete. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true
  },
  "message": "Post deleted successfully"
}
```

### getOrphanedPosts API

#### GET /post/orphaned/

The getOrphanedPosts API takes no parameters. It scans all posts looking for posts with invalid User_id values. It adds the post to the list of orphaned posts. Finally it responds with message containing the orphaned posts if any. This API has only been implemented in the backend, and Postman must be used to utilize it at this time.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
    "status": "ok",
    "data": {
        "valid": true
    },
    "message": "No orphaned posts found"
}

{
    "status": "ok",
    "data": {
        "valid": true,
        "orphanedPosts": [
            {
                "_id": "65c67f3fe5ba9f2753660432",
                "content": "orphan",
                "user_id": "65b273edd030c1e2fcfd1111",
                "likes": 0,
                "time_stamp": "2024-02-09T19:38:39.943Z",
                "comments": [],
                "createdAt": "2024-02-09T19:38:39.945Z",
                "updatedAt": "2024-02-09T19:38:39.945Z",
                "__v": 0
            }
        ]
    },
    "message": "Orphaned posts fetched successfully"
}
```

## Comment APIs

### getAllComments API

#### GET /comment/

No parameters are required. Returns a list of all comments.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "comments": [
      {
        "_id": "65b40d3872be3f9be7a1c1b5",
        "content": "This post is intended to be updated",
        "post_id": "65b3e4d76cd538e0a45272d4",
        "user_id": {
          "_id": "65b2734fd030c1e2fcfd6f00",
          "first_name": "Jim",
          "last_name": "Doe"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T19:51:20.679Z"
      },
      {
        "_id": "65b4063317e9e5c35639a420",
        "content": "This is a comment on the Test post.  It will be great to keep these going.",
        "post_id": "65b3e3921cba8ff819673bdf",
        "user_id": {
          "_id": "65b273edd030c1e2fcfd6f02",
          "first_name": "John",
          "last_name": "Smith"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T19:21:23.688Z"
      },
      {
        "_id": "65b4031aab772734dbbab374",
        "content": "Tim Tim Timmy",
        "post_id": "65b3ebfb64ea0b5efdc63c65",
        "user_id": {
          "_id": "65b27587d030c1e2fcfd6f05",
          "first_name": "Timmy",
          "last_name": "Timmy"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T19:08:10.526Z"
      },
      {
        "_id": "65b407db6bb3a8bd2a457a9c",
        "content": "The content is updated",
        "post_id": "65b3e3921cba8ff819673bdf",
        "user_id": {
          "_id": "65b2734fd030c1e2fcfd6f00",
          "first_name": "Jim",
          "last_name": "Doe"
        },
        "likes": 0,
        "time_stamp": "2024-01-26T17:29:31.970Z"
      }
    ]
  },
  "message": "Comments fetched successfully"
}
```

### getComment API

#### GET /comment/:id

The getComment API takes a comment id and responds with the corresponding comment from the comment collection.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id and return the comment. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "comment": {
      "_id": "65b4031aab772734dbbab374",
      "content": "Tim Tim Timmy",
      "post_id": "65b3ebfb64ea0b5efdc63c65",
      "user_id": {
        "_id": "65b27587d030c1e2fcfd6f05",
        "first_name": "Timmy",
        "last_name": "Timmy"
      },
      "likes": 0,
      "time_stamp": "2024-01-26T19:08:10.526Z"
    }
  },
  "message": "Comment fetched successfully"
}
```

### createComment API

#### POST /comment/

This API creates a new comment. It takes the content, the corresponding post_id, and the user_id. It then creates the comment with 0 likes and a time_stamp of now. It responds with a copy of the new comment.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description|
| Body | content, post_id, user_id | Take content, post_id, and user_id and create a new comment assigned to post_id by user_id. Return new comment. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "savedComment": {
      "content": "This post is intended to be updated",
      "post_id": "65b3e4d76cd538e0a45272d4",
      "user_id": "65b2734fd030c1e2fcfd6f00",
      "likes": 0,
      "time_stamp": "2024-01-26T19:51:20.679Z",
      "_id": "65b40d3872be3f9be7a1c1b5",
      "createdAt": "2024-01-26T19:51:20.691Z",
      "updatedAt": "2024-01-26T19:51:20.691Z",
      "__v": 0
    }
  },
  "message": "Comment saved successfully"
}
```

### updateComment API

#### PUT /comment/:id

The updateComment API takes the comment id as a path parameter and a copy of all document fields with updates. It then updates the comment, and returns a copy of the updated comment.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id to identify the comment to update. |
| Query | query_param | Brief description |
| Body | content, post_id, user_id, likes, time_stamp | Take content, post_id, user_id, likes, and time_stamp to update a comment assigned to post_id by user_id. Return updated comment. |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "comment": {
      "_id": "65b407db6bb3a8bd2a457a9c",
      "content": "The content is updated",
      "post_id": "65b3e3921cba8ff819673bdf",
      "user_id": "65b2734fd030c1e2fcfd6f00",
      "likes": 0,
      "time_stamp": "2024-01-26T17:29:31.970Z",
      "createdAt": "2024-01-26T19:28:27.637Z",
      "updatedAt": "2024-01-26T19:36:01.460Z",
      "__v": 0
    }
  },
  "message": "Comment updated successfully"
}
```

### likeComment API

#### PUT /comment/like/:id

The likeComment API takes the comment id of the comment to be liked. It then increments the like field by 1. Finally it responds with a copy of the updated comment.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id to identify the comment to like. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true,
    "comment": {
      "_id": "65bc735b24f0b82cb13fc61d",
      "content": "test 2",
      "post_id": "65bc38d5212f0f5463cad20c",
      "user_id": "65b273edd030c1e2fcfd6f02",
      "likes": 3,
      "time_stamp": "2024-02-02T04:45:15.033Z",
      "createdAt": "2024-02-02T04:45:15.034Z",
      "updatedAt": "2024-02-03T19:25:35.766Z",
      "__v": 0
    }
  },
  "message": "Comment liked successfully"
}
```

### deleteComment API

#### DELETE /comment/:id

The deleteComment API takes the comment id of the comment to be deleted. It then removes the comment id from the post it is connected to, and then the comment is deleted from the data base. Finally it responds with message "Comment deleted successfully".

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | id | Take a comment id to identify the comment to delete. |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
  "status": "ok",
  "data": {
    "valid": true
  },
  "message": "Comment deleted successfully"
}
```

### getOrphanedComments API

#### GET /comment/orphaned/

The getOrphanedComments API takes no parameters. It scans all comments looking for comments with invalid post_id and user_id values. It adds the comment to the list of orphaned comments. Finally it responds with message containing the orphaned comments if any. This API has only been implemented in the backend, and Postman must be used to utilize it at this time.

**Parameters**
| **TYPE** | **NAME** | **Description** |
|--------|--------|---------------|
| Path | path_param | Brief description |
| Query | query_param | Brief description |
| Body | body_param | Brief description |

**Sample Response**

```json
{
    "status": "ok",
    "data": {
        "valid": true
    },
    "message": "No orphaned comments found"
}

{
    "status": "ok",
    "data": {
        "valid": true,
        "orphanedComments": [
            {
                "_id": "65c67ad4e5ba9f2753660382",
                "content": "This comment 6 which is intended to be deleted",
                "post_id": "65b3ec6d64ea0b5efdc63111",
                "user_id": "65bd1aa259125916e90e0174",
                "likes": 0,
                "time_stamp": "2024-02-09T19:19:48.275Z",
                "createdAt": "2024-02-09T19:19:48.278Z",
                "updatedAt": "2024-02-09T19:19:48.278Z",
                "__v": 0
            }
        ]
    },
    "message": "Orphaned comments fetched successfully"
}
```
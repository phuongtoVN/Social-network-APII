# Social Network API
This is a social network API that allows you to manage users, thoughts, reactions, and friend connections. You can perform various operations such as creating users, posting thoughts, adding reactions, managing friend lists, and more.

# Getting Started
To get started with the social network API, follow the steps below:

Clone the repository to your local machine.
Install the necessary dependencies using npm install.
Set up your MongoDB database and configure the connection in the application.
Run the application using npm start.
Once the server is started, the Mongoose models will be synced to the MongoDB database.

# Models
# User
username: String (Unique, Required, Trimmed)

email: String (Required, Unique, Must match a valid email address)

thoughts: Array of _id values referencing the Thought model

friends: Array of _id values referencing the User model (self-reference)

Schema Settings

A virtual called friendCount that retrieves the length of the user's friends array field on query.

# Thought
thoughtText: String (Required, Must be between 1 and 280 characters)

createdAt: Date (Default value is the current timestamp)

username: String (Required, The user that created this thought)

reactions: Array of nested documents created with the Reaction schema

Schema Settings

A virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

Reaction (Schema Only)

reactionId: ObjectId (Default value is a new ObjectId)

reactionBody: String (Required, 280 character maximum)

username: String (Required)

createdAt: Date (Default value is the current timestamp)

# API Routes

/api/users

GET: Get all users

GET: Get a single user by its _id and populated thought and friend data

POST: Create a new user

PUT: Update a user by its _id

DELETE: Remove a user by its _id (bonus: also removes associated thoughts)

/api/users/:userId/friends/:friendId

POST: Add a new friend to a user's friend list

DELETE: Remove a friend from a user's friend list

/api/thoughts

GET: Get all thoughts

GET: Get a single thought by its _id

POST: Create a new thought

PUT: Update a thought by its _id

DELETE: Remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST: Create a reaction stored in a single thought's reactions array field

DELETE: Pull and remove a reaction by the reaction's reactionId value

Examples

Below are some examples of JSON payloads for specific API routes:

POST /api/users

json

{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}

POST /api/thoughts

json

{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}

POST /api/thoughts/:thoughtId/reactions

json

{
  "reactionBody": "That's interesting!",
  "username": "lernantino"
}

POST /api/users/:userId/friends/:friendId

No request body required.

# Conclusion
With the social network API, you can create, update, and delete users, thoughts, reactions, and friend connections. The provided API routes allow you to perform various operations to manage your social network data. Feel free to explore and integrate this API into your own applications.

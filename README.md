# Sprint Challenge: Authentication - Dad Jokes

## Description

In this challenge, you build a real wise-guy application. _Dad jokes_ are all the rage these days. Currently the application is trying to receive some `Dad Jokes`, however we are locked out.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Team Lead_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `firstName-lastName` branch into `master` on your fork. **Please don't make Pull Requests against Lambda's repository**.
- [ ] Please don't merge your own pull request.
- [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] What is the purpose of using _sessions_?

-To allow a server to store information about a client, which means this informatio can persist across HTTP requests. For example authentication information. Each client has a unique session stored on the server. 


- [ ] What does bcrypt do to help us store passwords in a secure manner.

-It gives us password hashing and verification functions. Hashing is a non-reversible method and always produces the same length hash for any length of password provided. 


- [ ] What does bcrypt do to slow down attackers?

-It implements salting both manually and automatically which helps prevents rainbow table attacks. The 'salt' is a random string that gets added to the plain text password we provide, which then both get hashed, to provide a hash. It also has accumlative hashing rounds, which means multiple hashing, this slows down attacker attempts as they have to figure out both the algorithm used and how many rounds used to generate the hash. 


- [ ] What are the three parts of the JSON Web Token?

-The Header: contains the algorithm that created the token and the token type
-The Payload: the 'claims', where we can put claims to what we want to store in the token like the user id or whatever the token is describing. We should not put any sensitive information in here. 
-The Signiture: This part is made up of a hash of the following: the header, the payload and the secret. The server uses the secret to verify existing tokens and sign new ones. Hence will know if a token's header or payload has been tampered with. 


## Minimum Viable Product

Implement an User Authentication System. Hash user's passwords before saving them to the database. Use `JSON Web Tokens` or `Sessions and Cookies` to persist authentication across requests.

- [ ] Implement the `register` and `login` functionality inside `/auth/auth-router.js`. A `user` has `username` and `password`. Both properties are required. X
- [ ] Implement the `authenticate` middleware inside `/auth/authenticate-middleware.js`. X
- [ ] Write a **minimum o 2 tests** per API endpoint. Write more tests if you have time.

**Note**: the database already has the users table, but if you run into issues, the migrations are available.

## Stretch Problem

Build a front end to show the jokes.

- [ ] Add a React client that connects to the API and has pages for `Sign Up`, `Sign In` and showing a list of `Jokes`.
- [ ] Once you have the functionality down, style it!

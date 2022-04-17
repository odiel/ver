
## Requirements
- Api: deno v1.20.6
- Client: node v16.14.2, yarn v1.22.17

## Steps
- Initiate the server application by cd into `api/` folder and running
`deno run --allow-env=DENO_ENV --allow-net --watch src/main.ts`

- Initiate the client application by jumping into `client/` folder and running
`yarn` (to install the dependencies) then `yarn dev` to initiate the server

- Access the client application by opening `http://localhost:3000/` in the browser

## Todo
- Validate the input fields during Adding/Editing an item
- Limit the length of the name and description fields
- Implement the description character countdown feature 
 
 
## Notes
- I implemented the api application in Node since I don't know that much about Go
- I used NextJS to bootstrap the client application
- I recognize there is plenty of room for improvements and organization but I did not want to delay this any further
- To reduce complexity the API side implements an in memory collection of shopping items
   
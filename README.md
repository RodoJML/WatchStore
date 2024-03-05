![panerai](https://github.com/RodoJML/WatchStore/assets/63088555/792dc26e-4d1b-4aa0-bd05-e3802adf83b2)

<h1>Watch Store</h1>

Description:
Personal project for a website to buy and sell watches online. 

Technologies used:
- Node.js
- Express.js
- React
- mySQL https://www.mysql.com/
- Knex for SQL (Wrapper library) https://knexjs.org/
- Redux for state management https://redux.js.org/
- ![Screen Shot 2024-01-28 at 11 50 03 PM](https://github.com/RodoJML/WatchStore/assets/63088555/698a5528-21a7-4e3b-8e30-742ddfe73fce) https://jwt.io/

<h2>📚 Database Design</h2>
<h3>Requirements</h3>

- User: Have the ability to CRUD users
- User Info: Store phone, email, address and such.
- Watches: Able to store multiple types of watches. 
- Watches specs: Store the info about each watch, their specs.  
- Wishlist: Have the aility to keep a list of the "liked" watches. 
- Views: Keep track how many people viewed a given watch
- Listing: A post that contains a watch and seller information
- Featured: Listings that would be featured on the main page
- Log: Keep a log of users registered and listings
- Watches styles, types and movements, keep an updated list of these. 

<h3>EER Diagram (v2.3)</h3>

- 2.3.1 COUNTRY and BRAND tables updated.
- 2.3.0 Normalization revised and table names updated for consistency. 

<img width="1284" alt="EER" src="https://github.com/RodoJML/WatchStore/assets/63088555/33733c95-3a03-4d8e-beea-14e3ec669ee1">


<h2>📲 Software Design</h2>
<h3>Requirements</h3>

This project will have at least 4 types of user, in order of privilege, highest at the top:
1. Admin
2. Registered user with Store
3. Registered user (without Store) 
4. Guest
 
Below are the main features and the access based on user privilegues:

![mainFeaturesWM](https://github.com/RodoJML/WatchStore/assets/63088555/e4d14867-d9fe-4767-8887-35f657cdde6c)



These are some notes to self:

    Followed this to install Tailwind
    https://tailwindcss.com/docs/guides/nextjs

    Ran this on SQL workbench to make the SQL authentication work
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

    cd Documents/Developer/WebDev/React/Watch_Store

    Pending to create users and roles into the database, for developer, admin and end-user.

    I used this script to remove potential sensitive data from the repo.
    Once the command was run it was required to republish the branch.
    https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
    git filter-repo --force --invert-paths --path other/database_script.sql

    Remember to add pagination to the server DB queries
    Add share button to the listings
    Add a section to see the stores in a list or grid
    Remmber to add year to the models in the DB
    DB needs to be updated fields need to be change from Decimal (3,2) to Decimal (5,2) 
    Add whatsapp API

    
    Tailwind cheat sheet
    https://tailwindcomponents.com/cheatsheet/

    Testing from laptop

    -----------------------------

    To make the server to run on typescript I had to install the following 
    npm install --save-dev @types/node

    Update in package.json all listed as index.js to index.ts
    Update in package.json all listed as server.js to server.ts

    Installed "ts-node": "^10.9.2" so node.js can run typescript files
    Add a configuration to nodemon
    "nodemonConfig": {
    "exec": "ts-node",
    "watch": [
      "server"
    ],
    "ext": "ts"
    },


REDUX REMINDERS

Concepts
- STORE: Is the GLOBAL STATE accessible across any component in the app.
    - Store is made of multiple SLICES 
    - Each slice has the state (define interface) of the variable we need

- ACTIONS
    - Have a "type:" name of the action you defined
    - have a "payload:" pretty much the parameter passed on the function, value we want to send to update. 

- REDUCER
    - Takes the "type" of action and EXECUTES whatever the action we need.

    ⚠️ Reducers would never mutate the original state directly, instead they made a copy of the original state, in the copy the value or values are updated and then the copy overwrites the original.

     ℹ️ Following the concept of inmutability. 
     
    

Reducer Actions

    - When creating a "slice" you give it a "name:" so later when creating the "reducers" actions you dont need to specify the name, you just type the actions as "increment" or "decrement" for example on the case of a simple counter app.

    - On the other hand for async reducer actions you need to specify the name concatenated with the action, for example "counter/incrementAsync"

    - For Async actions you define the "action" FIRST with "createAsyncThunk()" and later, you define the "reducers"

    - For Async functions within the "slice" these will be placed under "extraReducers:" and NOT "reducers:"

    - For Async when building a case on the "extraReducers" you access to the functions created using "createAsyncThunk" this is the reason you can use ".fullfilled"

    - For Sync actions we define "reducers" first and then the "actions"


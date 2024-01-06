<h1>⌚️ Watch Store</h1>

Description:
Personal project for a website to publish and sell watches. 

Technologies used:
- Node.js
- Express.js
- React
- mySQL
- Knex for SQL (Wrapper library) https://knexjs.org/

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

<h3>EER Diagram</h3>

![databaseDesignWM](https://github.com/RodoJML/Watch_Store/assets/63088555/21b6578a-2543-4bd5-b680-c6a5419819f1)


<h2>📲 Software Design</h2>
<h3>Requirements</h3>

This project will have at least 4 types of user, in order of privilege, highest at the top:
1. Admin
2. Registered user with Store
3. Registered user
4. Guest
 
Each line should be a separate feature.

<h3>Global</h3>

Features independent of the user type, must be present in all users. 
- Register 
- View listings 
- View reviews
- View Stores 

![features](https://github.com/RodoJML/Watch_Store/assets/63088555/99cbc818-4e3b-4712-b4a3-d2824c6b049b)


These are some notes to self:

    Followed this to install Tailwind
    https://tailwindcss.com/docs/guides/nextjs

    Ran this on SQL workbench to make the SQL authentication work
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

    cd Documents/Developer/HTML/React/Watch_Store

    Pending to create users and roles into the database, for developer, admin and end-user. 

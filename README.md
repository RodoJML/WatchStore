<h1>⌚️ Watch Store</h1>

Description:
Personal project for a website to publish and sell watches. 

Technologies used:
- Node.js
- Express.js
- React
- mySQL
- Knex for SQL (Wrapper library) https://knexjs.org/

<h2>Database design </h2>
<h3>Requirements</h3>

- User: Have the ability to CRUD users
- User Info: Store phone, email, address and such.
- Watches: Able to store multiple types of watches. 
- Watches specs: Store the info about each watch, their specs.  
- Wishlist: Have the aility to keep a list of the "liked" watches. 
- Views: Keep track how many people viewed a given watch
- Listing: A post that contains a watch and seller information
- Featured: Listings that would be featured on the main page

These are some notes to self:

    Followed this to install Tailwind
    https://tailwindcss.com/docs/guides/nextjs

    Ran this on SQL workbench to make the SQL authentication work
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

    cd Documents/Developer/HTML/React/Watch_Store

    Pending to create users and roles into the database, for developer, admin and end-user. 

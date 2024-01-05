<h1>⌚️ Watch Store</h1>

Description:
Personal project for a website to publish and sell watches. 

Technologies used:
- Node.js
- Express.js
- React
- mySQL
- Knex for SQL (Wrapper library) https://knexjs.org/

<h2>Database</h2>
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

<h2>Software</h2>
<h3>Requirements</h3>

Admin
Each line should be a separate feature. 

- A section to manage: Users and Stores.
- A section to manage: Wishlists 
- A section to manage: Listing
- A section to manage: Stocks
- A section to manage and moderate: Reviews 
- A section to query Logs
- A section to manage watches: Brands, Models, Movement, Styles, Types
- A section to manage watches: specs
- *Access to all end-user features. 

End-User
- Listings: CRUD/Manage Own Listings
- Listings: Read-only/View others Listings 
- 

These are some notes to self:

    Followed this to install Tailwind
    https://tailwindcss.com/docs/guides/nextjs

    Ran this on SQL workbench to make the SQL authentication work
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

    cd Documents/Developer/HTML/React/Watch_Store

    Pending to create users and roles into the database, for developer, admin and end-user. 

![panerai](https://github.com/RodoJML/WatchStore/assets/63088555/1163d9b5-6d2f-425f-8c16-ecba6a7affc4)

<h1>Watch Store</h1>

Description:
Personal project for a website to buy and sell watches online. 

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
3. Registered user (without Store) 
4. Guest
 
Below are the main features and the access based by user privilegues:

![mainFeaturesWM](https://github.com/RodoJML/Watch_Store/assets/63088555/077150e1-b56e-4872-8e36-7b990f8538da)



These are some notes to self:

    Followed this to install Tailwind
    https://tailwindcss.com/docs/guides/nextjs

    Ran this on SQL workbench to make the SQL authentication work
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

    cd Documents/Developer/HTML/React/Watch_Store

    Pending to create users and roles into the database, for developer, admin and end-user.

    I used this script to remove potential sensitive data from the repo.
    Once the command was run it was required to republish the branch.
    https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
    git filter-repo --force --invert-paths --path other/database_script.sql

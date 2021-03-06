MERN Products app, you can perform CRUD operations on product entities, saved in a Mongo database - the products and the tweaks done from the front-end will persist.

For this app, I chose to use MERN. The backend is handled by Node and Express, while the front end and the API requests are done with ReactJS and Axios.

To ensure responsiveness, I used Bulma, a FlexBox CSS Framework. BulmaCss works just like Bootstrap (adding class names to the subsequent elements). I prefered using Bulma because I found the use of cards (located in "src/components/product_list_item.js") much more intuitive than the alternative Bootstrap Cards.

Regarding the swapping of a broken image with a default one, I do that by having a React Method attached to the case of "onError", where I load a default image by changing the source of the img element to a default image - "images/default.jpg". (code for this is in product_list_item.js).

I also mention I used Cypress, a React Testing Web-Framework, to create a suite of tests that ensure my app works as intended. The test code is found in "cypress/integration/tests-spec.js". I run them with the command "npm run cypress:open", and then select the tests file name and see them run in the emulated browser from Cypress.

In case the user will access a wrong route, they will be presented with a customized FileNotFound component that I created (also responsive), located at "src/components/404.js".

The app will load on a page where all the products will be listed, and the CRUD operations can be performed. There is also a search field that will refresh the list of products, filtered by the input the user provides, instantly. I mention I chose to listen to every change in the field and refresh the list of products automatically instead of having a button to make the re-filtering, because I figured it would be best for the interface and for the user's experience not to clutter the interface with unnecessary elements.

I also exported the mongo database in a json format, and pasted it in the "exported_db.json" file.

To use the app, the dependencies need to be installed, the app needs to be build and the server needs to be ran.

-- npm install (installs the depenndencies from package.json)

-- npm run build (creates a build folder that will be served by the app)

-- node / nodemon server.js (starts the server on ports 4000, now the app can be viewed on localhost:4000)

-- npm run cypress:open (optional, runs the created test suite)
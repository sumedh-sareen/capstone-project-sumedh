# Capstone project - Project Planner

The following application uses 3 API's (weatherbit, geonames and pixabay) to display the details of a trip to any city that's entered, along with the weather details (current and forecast) and an image of the city you are travelling to. 

Webpack was used to configure the development and production environment, with their separate configurations (dev-server for development, and service workers for production, as an example).


Some key packages used:
- Webpack
- Jest for testing
- Google Workbox for serving the page offline 
- Sass for convenient styling
- Express for locally hosting the backend and handling the API key
- .env for securely handling the API key 
- clean webpack plugin for hot reload during dev work 
- Other plugins and loaders to ensure proper transpiling of code that runs in any browser

API's used:
- Weatherbit
- Geonames
- Pixabay

## Running the application
1. Running the dev environment:
<code>npm run build-dev</code>
2. Running the production environment:
<code>npm run build-prod</code>


# Weather Forecast Application
This is a simple weather forecast application built using React. It allows users to search for weather information by city or country and view detailed weather forecasts.

# Features
City Table: Displays a table of cities with their names, countries, and timezones. Users can click on a city or country to view its weather forecast.
Weather Information: Displays detailed weather information for a selected city or country, including temperature, humidity, pressure, and wind speed.
Search Functionality: Users can search for cities or countries using the search bar.
Sorting: Users can sort the city table by city name or country name in ascending or descending order.
Pagination: Loads more cities as the user scrolls down the page.
Responsive Design: The application is responsive and works well on various screen sizes.

# Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/weather-forecast-app.git
Navigate to the project directory:
bash
Copy code
cd weather-forecast-app

# Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to view the application.
Environment Variables
To protect sensitive information like API keys and URLs, create a .env.local file in the root directory and add the following variables:

# plaintext
Copy code
REACT_APP_API_URL=https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records
REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/forecast?q=
REACT_APP_WEATHER_API_KEY=YOUR_WEATHER_API_KEY_HERE
Replace YOUR_WEATHER_API_KEY_HERE with your OpenWeatherMap API key.

# Usage
City Table: The home page (/) displays a table of cities. Click on a city or country name to view its weather forecast.
Weather Information: The weather forecast page (/weather/:location) displays detailed weather information for the selected city or country.
Search: Use the search bar to search for cities or countries by name.
Sorting: Click on column headers in the city table to sort the table by city name or country name.

# Dependencies
React: A JavaScript library for building user interfaces.
React Router DOM: Declarative routing for React applications.
Axios: Promise-based HTTP client for the browser and Node.js.
React Autosuggest: WAI-ARIA compliant autosuggest component.
React Spinners: Loading spinner component for React.
Bootstrap: Front-end framework for developing responsive and mobile-first websites.

# Contributing
Contributions are welcome! Please open an issue or submit a pull request if you find any bugs or have suggestions for improvement.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityTable from "./components/CityTable.tsx";
import WeatherInfo from "./components/WeatherInfo.tsx";
import { WeatherProvider } from "./components/WeatherContext.tsx";

export function App(): JSX.Element {
  return (
    <Router>
      <WeatherProvider>
        <div>
          <Routes>
            <Route path="/" element={<CityTable />} />
            <Route path="/weather/:location" element={<WeatherInfo />} />
          </Routes>
        </div>
      </WeatherProvider>
    </Router>
  );
}

export default App;

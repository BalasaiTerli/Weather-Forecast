import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Autosuggest, { ChangeEvent } from "react-autosuggest";
import { BeatLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { apiUrl } from "../constants/apiConfig.ts";

interface City {
  recordid: string;
  name: string;
  cou_name_en: string;
  timezone: string;
}

interface SortOrder {
  column: keyof City;
  direction: string;
}

function CityTable(): JSX.Element {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    column: "name",
    direction: "asc",
  });
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && !loading) {
        fetchData();
      }
    }, observerOptions);

    if (observer.current) {
      observer.current.observe(document.querySelector(".observer")!);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}?limit=20&start=${cities.length}`
      );
      const newCities: City[] = response.data.results;
      setCities((prevCities) => [...prevCities, ...newCities]);
      setLoading(false);
      if (newCities.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleCityClick = (cityName: string) => {
    navigate(`/weather/${cityName}`);
  };

  const handleCountryClick = (countryName: string) => {
    navigate(`/weather/${countryName}`);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    setSearchQuery(newValue);
  };

  const handleSearchSuggestionSelected = (
    event: React.FormEvent<HTMLFormElement>,
    { suggestion }: { suggestion: City }
  ) => {
    setSearchQuery(suggestion.name);
  };

  const handleSort = (column: keyof City) => {
    setSortOrder((prevOrder) => ({
      column,
      direction:
        prevOrder.column === column && prevOrder.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSuggestions = (value: string): City[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(
          (city) => city.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search by city or country",
    value: searchQuery,
    onChange: (event: unknown, { newValue }: ChangeEvent) => {
      if (typeof event === "object" && newValue !== undefined) {
        handleSearchChange(event as React.ChangeEvent<HTMLInputElement>, {
          newValue,
        });
      }
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sortedCities = [...cities].sort((a, b) => {
    const column = sortOrder.column;
    const direction = sortOrder.direction === "asc" ? 1 : -1;

    if (a[column] && b[column]) {
      const aValue = a[column].toLowerCase();
      const bValue = b[column].toLowerCase();

      if (aValue < bValue) {
        return -1 * direction;
      }
      if (aValue > bValue) {
        return 1 * direction;
      }
    }
    return 0;
  });

  const filteredCities = sortedCities.filter(
    (city) =>
      (city.name &&
        city.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (city.cou_name_en &&
        city.cou_name_en.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <h2>City Table</h2>
      <div className="search-bar mb-3">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
          inputProps={inputProps}
          onSuggestionSelected={handleSearchSuggestionSelected}
        />
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th onClick={() => handleSort("name")}>
                  City Name{" "}
                  {sortOrder.column === "name" && (
                    <span className="arrow">
                      {sortOrder.direction === "asc" ? (
                        <i className="bi bi-arrow-down"></i>
                      ) : (
                        <i className="bi bi-arrow-up"></i>
                      )}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("cou_name_en")}>
                  Country{" "}
                  {sortOrder.column === "cou_name_en" && (
                    <span className="arrow">
                      {sortOrder.direction === "asc" ? (
                        <i className="bi bi-arrow-down"></i>
                      ) : (
                        <i className="bi bi-arrow-up"></i>
                      )}
                    </span>
                  )}
                </th>
                <th>Timezone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city, index) => (
                <tr key={city.recordid}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/weather/${city.name}`}
                      onClick={() => handleCityClick(city.name)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {city.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/weather/${city.cou_name_en}`}
                      onClick={() => handleCountryClick(city.cou_name_en)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {city.cou_name_en}
                    </Link>
                  </td>
                  <td>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {loading ? (
        <div className="loading-icon-container">
          <BeatLoader color={"#007bff"} loading={true} size={15} />
        </div>
      ) : (
        <div className="no-more-data"></div>
      )}

      {!hasMore && <div className="no-more-data">No more data</div>}
      <div className="observer"></div>
      <button className="scroll-to-top btn btn-primary" onClick={scrollToTop}>
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
}

export default CityTable;

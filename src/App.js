import "./styles.css";
import { React, useState, useEffect } from "react";
import countries from "i18n-iso-countries";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faTemperatureHigh,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default function App() {
  //state
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("Irvine, USA");
  const [state, setState] = useState("Irvine, USA");

  //API KEY and URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  //side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  //handlers
  const inputHander = (event) => {
    setGetState(event.target.value);
  };

  console.log("apidata", apiData);
  const submitHander = (event) => {
    setState(event.target.value);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };
  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label for="location-name" className="col-form-label">
              Enter Location:
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHander}
              value={getState}
            />
            <button className="btn btn-primary mt-2" onClick={submitHander}>
              Search
            </button>
          </div>
        </div>
        <div className="card mt-3 mx-auto">
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`https://api.openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />
              <p className="h2">
                {kelvinToFarenheit(apiData.main.temp)}&deg; F
              </p>
              <p className="h5">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  className="fas fa-1x mr-2 text-dark"
                />
                <strong> {apiData.name}</strong>
              </p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureLow}
                      className="fas fa-1x mr-2 text-primary"
                    />
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}&deg; F
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon
                        icon={faTemperatureHigh}
                        className="fas fa-1x mr-2 text-danger"
                      />
                      <strong>
                        {kelvinToFarenheit(apiData.main.temp_max)}&deg; F
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>
                        {countries.getName(apiData.sys.country, "en", {
                          selected: "official"
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
      <footer className="footer">&copy; React Weather App</footer>
    </div>
  );
}

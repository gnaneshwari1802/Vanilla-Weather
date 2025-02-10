// Displaying the current temperature and city information
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current); // rounding the temperature
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
  
    // Displaying weather description (if available)
    let descriptionElement = document.querySelector("#current-description");
    descriptionElement.innerHTML = response.data.condition.description;
  
    // Optionally: Displaying weather icon
    let iconElement = document.querySelector("#current-icon");
    iconElement.src = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
    iconElement.alt = response.data.condition.description;
  }
  
  // Fetching weather data using Axios
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "b2a5adcct04b33178913oc335f405433"; // Consider hiding this in environment variables for security
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  // Formatting the current date and time
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  // Adding event listener to handle form submission
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  // Displaying current date and time on the page
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateELement.innerHTML = formatDate(currentDate);
  
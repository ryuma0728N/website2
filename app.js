function fetchWeather() {
  const city = document.getElementById('city-input').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const apiKey = 'your_api_key_here';  // 天気APIのAPIキーをここに挿入
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('weather-info').innerHTML = 'City not found';
      } else {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;

        document.getElementById('weather-info').innerHTML = `
          <h2>${city}</h2>
          <p>Temperature: ${temp}°C</p>
          <p>Condition: ${description}</p>
          <p>Humidity: ${humidity}%</p>
        `;
      }
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = 'Error fetching weather data';
      console.error('Error:', error);
    });
}

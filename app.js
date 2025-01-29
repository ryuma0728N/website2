function fetchWeather() {
  const city = document.getElementById('city-input').value.trim();
  if (!city) {
    alert('都市名を入力してください');
    return;
  }

  const apiKey = 'YOUR_API_KEY';  // ここにOpenWeatherMapのAPIキーを貼り付け
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},JP&appid=${apiKey}&units=metric&lang=ja`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('APIエラー: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('weather-info').innerHTML = '都市が見つかりませんでした';
      } else {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;

        document.getElementById('weather-info').innerHTML = `
          <h2>${city}の天気</h2>
          <p>気温: ${temp}°C</p>
          <p>天気: ${description}</p>
          <p>湿度: ${humidity}%</p>
        `;
      }
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = '天気データの取得に失敗しました: ' + error.message;
      console.error('エラー:', error);
    });
}

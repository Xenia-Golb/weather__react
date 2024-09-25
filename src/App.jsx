import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader/Loader';

function App() {

  const API_KEY = '5e389d25b4b042aaa9a200450242409';
  const BASE_URL = 'http://api.weatherapi.com/v1';

  const city = 'Москва';
  const defaultValue = {};
  const [weatherData, setWeatherData] = useState(defaultValue);
  const [town, newTown] = useState(city);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${town}&lang=ru`).then((response) => response.json());
      setWeatherData(response);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  }
  const fetchWeatherDataDays = async () => {
    try {
      const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${town}&days=6 &lang=ru`).then((response) => response.json());
      setWeatherData(response);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);

    }
  }
  useEffect(() => {
    fetchWeatherData();
    fetchWeatherDataDays();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    newTown(event.target.value);

  }

  return (
    < >
      {
        !isLoading ? (
          <Loader />
        ) : (
          <div className='component'>
            <header className='center'>
              <div className='img__main'>
                <img src="/headerSky.svg" alt="" />
                <img src="/headerSky copy.svg" alt="" />
              </div>
              <input autoFocus onChange={handleInputChange} type="text" placeholder='Введите город' />
              <button onClick={fetchWeatherDataDays} >
                Показать прогноз на 7 дней
              </button>

            </header>
            <main className=' main  center'>
              <div className='weather_card big  '>
                {
                  weatherData.current && (
                    <div className='weather_today'>
                      <h1>{weatherData.location.name}</h1>

                      <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} />
                      <p>{weatherData.current.condition.text}</p>
                      <p>Дата: {weatherData.location.localtime}</p>
                      <p>Температура: {weatherData.current.temp_c}°C</p>
                      <p>Влажность: {weatherData.current.humidity}%</p>
                      <p>Ощущается как: {weatherData.current.feelslike_c}°C</p>
                      <p>Скорость ветра: {weatherData.current.wind_kph} км/ч</p>
                      <p>Видимость: {weatherData.current.vis_km} км</p>
                    </div>
                  )
                }
              </div>

              <div className='container'>
                {
                  weatherData.forecast && weatherData.forecast.forecastday.map((day, index) => (
                    <div className='weather_card small '
                      key={index}>
                      <h2>{day.date}</h2>
                      <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
                      <p>Температура: {day.day.avgtemp_c}°C</p>
                      <p>Влажность: {day.day.avghumidity}%</p>
                      <p>Скорость ветра: {day.day.maxwind_kph} км/ч</p>
                    </div>))}
              </div>

            </main></div>
        )

      };



    </>)
}
export default App;

import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Background from "./components/Background/Background";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          // "https://api.open-meteo.com/v1/forecast?latitude=52.520008&longitude=13.404954&current_weather=true"
          "https://example-apis.vercel.app/api/weather"
        );
        const data = await response.json();
        // const realTemperature = data.current_weather.temperature;
        // const weatherCode = data.current_weather.weathercode;
        // const realCondition = (() => {
        //   switch (weatherCode) {
        //     case weatherCode === 0:
        //       return "☀️";
        //     case weatherCode === 1:
        //       return "🌤️";
        //     case weatherCode === 2:
        //       return "🌤️";
        //     case weatherCode === 3:
        //       return "☁️";
        //     case weatherCode === 45:
        //       return "☁️";
        //     case weatherCode === 48:
        //       return "☁️";
        //     case weatherCode === 51:
        //       return "☁️";
        //     case weatherCode === 53:
        //       return "☁️";
        //     case weatherCode === 55:
        //       return "🌧️";
        //     case weatherCode === 56:
        //       return "☁️";
        //     case weatherCode === 57:
        //       return "🌧️";
        //     case weatherCode === 61:
        //       return "🌧️";
        //     case weatherCode === 63:
        //       return "🌧️";
        //     case weatherCode === 65:
        //       return "🌧️";
        //     case weatherCode === 66:
        //       return "🌧️";
        //     case weatherCode === 67:
        //       return "🌧️";
        //     case weatherCode === 71:
        //       return "🌨️";
        //     case weatherCode === 73:
        //       return "🌨️";
        //     case weatherCode === 75:
        //       return "🌨️";
        //     case weatherCode === 77:
        //       return "🌨️";
        //     case weatherCode === 80:
        //       return "🌧️";
        //     case weatherCode === 81:
        //       return "🌧️";
        //     case weatherCode === 82:
        //       return "🌧️";
        //     case weatherCode === 85:
        //       return "🌨️";
        //     case weatherCode === 86:
        //       return "🌨️";
        //     case weatherCode === 95:
        //       return "⛈️";
        //     case weatherCode === 96:
        //       return "⛈️";
        //     case weatherCode === 99:
        //       return "⛈️";
        //     default:
        //         return "☀️";
        //   }
        // })();
        // const realIsGoodWeather = (() => {
        //   if (realCondition === "🌧️" || realCondition === "⛈️" || realCondition === "🌨️") {
        //     return false
        //   } else return true
        // })();
        // const realData = {location:"Berlin",temperature:realTemperature,condition:realCondition,isGoodWeather:realIsGoodWeather}
        // console.log(data.current_weather);
        // console.log(realData);
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();
    const intervalID = setInterval(fetchWeather, 3000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function handleAddActivity(newActivity) {
    setActivities((current) => [...current, newActivity]);
    console.log("App: ", activities);
  }

  function handleDeleteActivity(activityToDelete) {
    setActivities((current) =>
      current.filter((activity) => activity.id !== activityToDelete)
    );
  }

  return (
    <>
      <main className="main">
        <Header 
          className="header" 
          weather={weather} 
        />
        <List
          activities={activities.filter((activity) => activity.isGoodWeather === weather.isGoodWeather)}
          goodWeather={weather.isGoodWeather}
          onDeleteActivity={handleDeleteActivity}
        />
        <Form 
          className="form" 
          onAddActivity={handleAddActivity} 
        />
      </main>
      <Background 
        className="background"
        temperature={weather.temperature} 
        goodWeather={weather.isGoodWeather}>
      </Background>
    </>
    );
}

export default App;

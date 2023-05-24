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
  const [real, setReal] = useState(false);

  useEffect(() => {
    if(real === true) {
      async function fetchWeather() {
        try {
          const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=52.520008&longitude=13.404954&current_weather=true"
          );
          const data = await response.json();
          const roundedTemp = Math.round(data.current_weather.temperature)
          const realTemperature = roundedTemp;
          const weatherCode = data.current_weather.weathercode;
          const realCondition = (() => {
            switch (weatherCode) {
              case 1:
              case 2:
                return "🌤️"
              case 3:
              case 45:
              case 48:
              case 51:
              case 53:
              case 56:
                return "☁️" 
              case 55:
              case 57:
              case 61:
              case 63:
              case 65:
              case 66:
              case 67:
              case 80:
              case 81:
              case 82:
                return "🌧️"
              case 71:
              case 73:
              case 75:
              case 77:
              case 85:
              case 86:
                return "🌨️"
              case 95:
              case 96:
              case 99:
                return "🌨️"
              default:
                return "☀️";
              }
            })();
          const realIsGoodWeather = (() => {
            if (realCondition === "🌧️" || realCondition === "⛈️" || realCondition === "🌨️") {
              return false
            } else return true
          })();
          const realData = {location:"Berlin",temperature:realTemperature,condition:realCondition,isGoodWeather:realIsGoodWeather}
          console.log(realData);
          setWeather(realData);
        } catch (error) {
          console.log(error);
        }
      }
      fetchWeather();
      const intervalID = setInterval(fetchWeather, 3000);
      return () => {
        clearInterval(intervalID);
      };
    } else {
      async function fetchWeather() {
        try {
          const response = await fetch(
            "https://example-apis.vercel.app/api/weather"
          );
          const data = await response.json();
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
    }
  }, [real]);

  function handleAddActivity(newActivity) {
    setActivities((current) => [...current, newActivity]);
    console.log("App: ", activities);
  }

  function handleDeleteActivity(activityToDelete) {
    setActivities((current) =>
      current.filter((activity) => activity.id !== activityToDelete)
    );
  }

  function handleToggleReal() {
    setReal(!real)
  }

  return (
    <>
      <main className="main">
        <Header 
          className="header" 
          weather={weather}
          real={real}
          onToggleReal={handleToggleReal} 
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

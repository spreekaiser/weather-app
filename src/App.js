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
          console.log(data);
          const roundedTemp = Math.round(data.current_weather.temperature)
          const realTemperature = roundedTemp;
          const weatherCode = data.current_weather.weathercode;
          const realCondition = (() => {
              if (weatherCode === 0){
                return "☀️"}
              if (weatherCode === 1){
                return "🌤️";}
              if (weatherCode === 2){
                return "🌤️";}
              if (weatherCode === 3){
                return "☁️";}
              if (weatherCode === 45){
                return "☁️";}
              if (weatherCode === 48){
                return "☁️";}
              if (weatherCode === 51){
                return "☁️";}
              if (weatherCode === 53){
                return "☁️";}
              // if weatherCode === 55
              //   return "🌧️";
              // if weatherCode === 56
              //   return "☁️";
              // if weatherCode === 57
              //   return "🌧️";
              // if weatherCode === 61
              //   return "🌧️";
              // if weatherCode === 63
              //   return "🌧️";
              // if weatherCode === 65
              //   return "🌧️";
              // if weatherCode === 66
              //   return "🌧️";
              // if weatherCode === 67
              //   return "🌧️";
              // if weatherCode === 71
              //   return "🌨️";
              // if weatherCode === 73
              //   return "🌨️";
              // if weatherCode === 75
              //   return "🌨️";
              // if weatherCode === 77
              //   return "🌨️";
              // if weatherCode === 80
              //   return "🌧️";
              // if weatherCode === 81
              //   return "🌧️";
              // if weatherCode === 82
              //   return "🌧️";
              // if weatherCode === 85
              //   return "🌨️";
              // if weatherCode === 86
              //   return "🌨️";
              // if (weatherCode === 95){
              //   return "⛈️";}
              // if (weatherCode === 96){
              //   return "⛈️";}
              // if (weatherCode === 99){
              //   return "⛈️";}
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

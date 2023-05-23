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
          "https://example-apis.vercel.app/api/weather"
        );
        const data = await response.json();
        setWeather(data);
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
        <Header className="header" weather={weather} />
        <List
          activities={activities.filter(
            (activity) => activity.isGoodWeather === weather.isGoodWeather
          )}
          goodWeather={weather.isGoodWeather}
          onDeleteActivity={handleDeleteActivity}
        />
        <Form className="form" onAddActivity={handleAddActivity} />
      </main>
      <Background className="background" temp={weather.temperature}></Background>
    </>
    );
}

export default App;

import Form from "./components/Form/Form";
import List from "./components/List/List";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [goodWeather, setGoodWeather] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/weather"
        );
        const data = await response.json();
        console.log("Data: ", data);

        setGoodWeather(data.isGoodWeather);
      } catch (error) {
        console.log(error);
      }
    }
    // fetchWeather();
    const intervalID = setInterval(fetchWeather, 3000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  // console.log(goodWeather);

  function handleAddActivity(newActivity) {
    setActivities((current) => [...current, newActivity]);
    console.log("App: ", activities);
  }

  return (
    <main>
      <Form onAddActivity={handleAddActivity} />
      <List
        activities={activities.filter(
          (activity) => activity.isGoodWeather === goodWeather
        )}
      />
    </main>
  );
}

export default App;

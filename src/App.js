import Form from "./components/Form/Form";
import List from "./components/List/List";
// import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const goodWeather = true;

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

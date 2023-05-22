import Form from "./components/Form/Form";
import List from "./components/List/List";
import { useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);

  function handleAddActivity(newActivity) {
    setActivities(newActivity);
    console.log("App: ", activities);
  }

  return (
    <main>
      <Form onAddActivity={handleAddActivity} />
      <List />
    </main>
  );
}

export default App;

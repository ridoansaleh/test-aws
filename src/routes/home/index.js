import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import API, { graphqlOperation } from "@aws-amplify/api";
import "./home.css";

const ListTasks = `query ListTasks {
  listTasks {
    items {
      id
      name
      time
      userID
    }
  }
}`;

function Home() {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const allTasks = await API.graphql(graphqlOperation(ListTasks));
    // console.log("allTasks : ", allTasks);
    setTasks(allTasks?.data?.listTasks?.items || []);
  }, []);

  const handleLogoutClick = async () => {
    try {
      const response = await Auth.signOut({ global: true });
      // console.log("response : ", response);
      history.replace("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="home-container">
      <button className="logout-btn" onClick={handleLogoutClick}>
        Log Out
      </button>
      <h1>Task List</h1>
      <div>
        <ol>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.name}</span>
              <span>{task.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Home;

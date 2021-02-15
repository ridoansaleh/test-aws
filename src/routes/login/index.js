import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const history = useHistory();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setDisabledSubmit(true);
      try {
        const response = await Auth.signIn(email, password);
        setErrorMessage("");
        // console.log("response : ", response);
        history.replace("/home");
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Please Login!</h1>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={disabledSubmit}>
          Login
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;

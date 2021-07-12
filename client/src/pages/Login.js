import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import swal from "sweetalert";
import DataContext from "../store/data-context";
import { useHistory } from "react-router";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6MCrILR6Oz9A0El8za6cMxRTHQzosjI0";

function Login() {
  const history = useHistory();
  const { loginUser } = useContext(DataContext);

  const [email, setEmail] = useState("kratos101@gmail.com");
  const [password, setPassword] = useState("killzeus");

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const result = await axios.post(url, data, headers);
      // console.log(result.data);
      loginUser(result.data.idToken);
        setTimeout(() => {
          swal("Success!", "You are logged in!", "success");
          history.push("/home");
        }, 100);
    } catch (error) {
      swal("Error!", `${error.message}`, "error");
    }
  };

  return (
    <div className="form-container">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content">Log-in to your account</div>
          </h2>
          <form className="ui large form" onSubmit={handleSubmit}>
            <div className="ui stacked secondary  segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="E-mail address"
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ui fluid large teal submit button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

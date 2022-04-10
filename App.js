import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import cwSvg from "./assets/cw.svg";
import designSvg from "./assets/design.svg";
import growingUpManSvg from "./assets/growing-up-man.svg";
import growingUpWomanSvg from "./assets/growing-up-woman.svg";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import mapSvg from "./assets/map.svg";
import padlockSvg from "./assets/padlock.svg";
import phoneSvg from "./assets/phone.svg";
import womanSvg from "./assets/woman.svg";

const url = "https://randomuser.me/api/";

function App() {
  const [users, setUsers] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [person, setPerson] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get(url);
    setUsers(data.results);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOver = (e) => {
    // console.log(e.target);
    setKey(e.target.title);
    setValue(e.target.alt);
  };
  const handleNewUser = () => {
    fetchUsers();
  };
  const handleAddUser = () => {
    // console.log(person);
    // console.log(users[0]);
    if (!person.includes(users[0])) {
      setPerson([...person, users[0]]);
    }
  };
  return (
    <div className="App">
      {users.length > 0 && (
        <div className="container">
          <div className="header">
            <img src={cwSvg} alt="clarusway" />
          </div>
          <div className="main">
            <div className="image">
              <div className="line">
                <hr />
              </div>
              <img
                src={users[0].picture.large}
                alt={users[0].name.first + users[0].name.last}
              />
            </div>

            <div className="content">
              {key !== "" && value !== "" ? (
                <>
                  <p>My {key} is</p>
                  <h1>{value}</h1>
                </>
              ) : null}
            </div>
            <div className="logo">
              <button onMouseOver={handleOver}>
                <img
                  src={users[0].gender === "male" ? manSvg : womanSvg}
                  title="name"
                  alt={users[0].name.first + " " + users[0].name.last}
                />
              </button>
              <button onMouseOver={handleOver}>
                <img src={mailSvg} title="email" alt={users[0].email} />
              </button>
              <button onMouseOver={handleOver}>
                <img
                  src={
                    users[0].gender === "male"
                      ? growingUpManSvg
                      : growingUpWomanSvg
                  }
                  title="age"
                  alt={users[0].dob.age}
                />
              </button>
              <button onMouseOver={handleOver}>
                <img
                  src={mapSvg}
                  title="street"
                  alt={
                    users[0].location.street.number +
                    " " +
                    users[0].location.street.name
                  }
                />
              </button>
              <button onMouseOver={handleOver}>
                <img src={phoneSvg} title="phone" alt={users[0].phone} />
              </button>
              <button onMouseOver={handleOver}>
                <img
                  src={padlockSvg}
                  title="password"
                  alt={users[0].login.password}
                />
              </button>
            </div>
            <div className="button">
              <button onClick={handleNewUser}>NEW USER</button>
              <button onClick={handleAddUser}>ADD USER</button>
            </div>
            {/* true operator */}
            {person.length === 0 ? null : (
              <table>
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {person.map((user, index) => (
                    <tr key={index}>
                      <td>
                        {user.name.first} {user.name.last}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.dob.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="footer">
            <p>
              {/* <a href="https://www.github.com/mhmtclk1705" > */}
                <span>{"<mhmtclk/>"}</span>
              {/* </a> */}
              <img src={designSvg} />
              design
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

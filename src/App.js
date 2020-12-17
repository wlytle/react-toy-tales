import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toys: [],
      display: false,
      newToy: {
        name: "",
        image: "",
        likes: 0,
      },
    };
    this.url = "http://localhost:3000/toys";
  }

  //Get all them toys
  componentDidMount() {
    fetch(this.url)
      .then((resp) => resp.json())
      .then((toys) => {
        this.setState({
          toys,
        });
      });
  }

  // show form
  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  //update form fields in state
  handleInput = ({ target }) => {
    this.setState((prevState) => {
      return {
        newToy: {
          ...prevState.newToy,
          [target.name]: target.value,
        },
      };
    });
  };

  // create new toy
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.newToy),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        this.setState((prevState) => {
          return {
            toys: [toy, ...prevState.toys],
            newToy: {
              name: "",
              image: "",
              likes: 0,
            },
          };
        });
      });
  };

  // delete toy
  donate = ({ target }) => {
    const id = target.parentElement.id;
    fetch(this.url + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((toy) => {
        this.setState((prevState) => {
          let toys = prevState.toys.filter((toy) => toy.id !== +id);
          return { toys: toys };
        });
      });
  };

  //like toy
  like = ({ target }) => {
    console.log("Like");
    const id = target.parentElement.id;
    // not sure about this...
    let toy = { ...this.state.toys.find((toy) => toy.id === +id) };
    toy.likes += 1;
    fetch(this.url + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: toy.likes }),
    })
      .then((resp) => resp.json())
      .then((toy) => {
        this.setState((prevstate) => {
          prevstate.toys.find((toy) => toy.id === +id).likes += 1;
          return { toys: [...prevstate.toys] };
        });
      });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm
            newToy={this.state.newToy}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          toys={this.state.toys}
          donate={this.donate}
          like={this.like}
        />
      </>
    );
  }
}

export default App;

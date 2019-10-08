import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class NamePage extends Component {
  render() {
    return (
      <div className="page">
        <p className="nameStory">
          Greetings, traveler! What is your name?
          <br />
          <input
            type="text"
            className="name"
            placeholder="Name"
            value={this.props.data.name}
            onChange={event =>
              this.props.setStateFunction("name", event.target.value)
            }
          />
        </p>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(StartPage)}>
            Continue...
          </button>
        </div>
      </div>
    );
  }
}

class StartPage extends Component {
  render() {
    return (
      <div className="page">
        <p className="story">
          Welcome, {this.props.data.name}! How would you like to get to your
          destination?
        </p>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(TrainPage)}>
            Train
          </button>
          <button onClick={() => this.props.goFunction(ShipPage)}>Ship</button>
        </div>
      </div>
    );
  }
}

class TrainPage extends Component {
  render() {
    return (
      <div className="page">
        <p className="story">
          Welcome aboard the choo-choo train! Please make your way to your seat.
          What is the number?
        </p>
        <select
          value={this.props.data.seat}
          onChange={event =>
            this.props.setStateFunction("seat", event.target.value)
          }
        >
          <option>12</option>
          <option>24</option>
          <option>63</option>
          <option>53</option>
        </select>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(travelPage)}>
            Continue...
          </button>
        </div>
      </div>
    );
  }
}

class ShipPage extends Component {
  render() {
    return (
      <div className="page">
        <p className="story">
          Welcome aboard the choo-choo train! Please make your way to your seat.
          What is the number?
        </p>
        <select
          value={this.props.data.seat}
          onChange={event =>
            this.props.setStateFunction("seat", event.target.value)
          }
        >
          <option>12</option>
          <option>24</option>
          <option>63</option>
          <option>53</option>
        </select>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(travelPage)}>
            Continue...
          </button>
        </div>
      </div>
    );
  }
}

class travelPage extends Component {
  render() {
    return (
      <div className="page">
        <p className="story">
          Ah, seat {this.props.data.seat}, excelent choice. Right this way.
        </p>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(walkPage)}>Walk</button>
          <button onClick={() => this.props.goFunction(walkPage)}>Run</button>
        </div>
      </div>
    );
  }
}

class walkPage extends Component {
  render() {
    if (this.props.data.seat % 2 === 0) {
      return (
        <div className="page">
          <p className="story">
            Looking to the right for {this.props.data.seat}. Your walking
            continues and eventually you stumble upon a booth with a plaque
            reading {this.props.data.seat}.
          </p>
          <div className="btn-area">
            <button onClick={() => this.props.goFunction(seatPage)}>
              Sit down
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="page">
          <p className="story">
            Looking to the left for {this.props.data.seat}. Your walking
            continues and eventually you stumble upon a booth with a plaque
            reading {this.props.data.seat}.
          </p>
          <div className="btn-area">
            <button onClick={() => this.props.goFunction(seatPage)}>
              Sit down
            </button>
          </div>
        </div>
      );
    }
  }
}

class seatPage extends Component {
  componentDidMount() {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/9784ffd20a55d7d2e8df4dfb110df5fc/${lat},${long}`;

        fetch(api)
          .then(data => {
            return data.json();
          })
          .then(data => {
            const { temperature, summary } = data.currently;

            //Set elements from API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
          });
      });
    } else {
      h1.textContent = "Please enable your browser's geolocation";
    }
  }

  render() {
    return (
      <div className="page">
        <p className="story">
          As you take your seat, you notice the spectacular weather out of the
          window. Looking down at your phone it says:
        </p>
        <div className="weatherApp">
          <div className="location">
            <h1 className="location-timezone">Loading Weather…</h1>
          </div>
          <div className="temperature">
            <div className="degree-section">
              <h2 className="temperature-degree">00</h2>
              <span>F</span>
            </div>
            <div className="temperature-description">enable geolocation</div>
          </div>
        </div>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(walkPage)}>
            Look up
          </button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/9784ffd20a55d7d2e8df4dfb110df5fc/${lat},${long}`;

        fetch(api)
          .then(data => {
            return data.json();
          })
          .then(data => {});
      });
    } else {
      h1.textContent = "Please enable your browser's geolocation";
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      pageClass: NamePage
    };
  }

  goToPage(pageClass) {
    this.setState({
      pageClass: pageClass
    });
  }

  render() {
    var app = this;

    function setState(key, value) {
      let newState = {};
      newState[key] = value;
      app.setState(newState);
    }

    function goFunction(pageClass) {
      app.goToPage(pageClass);
    }

    return (
      <div className="App">
        <this.state.pageClass
          data={this.state}
          setStateFunction={setState}
          goFunction={goFunction}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";

const styles = {
  transition: 'all 1s ease-in'
};

class NamePage extends Component {
  render() {
    return (
      <div className="page">
        <span role="img" aria-label="space"> </span>
        <div className= "play-area">
        <p className="story nameStory">
          Greetings, traveler! What is your name?      
          <img className="img-name" src="" />
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
      </div>
    );
  }
}

class StartPage extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
        <p className="story">
          Welcome, {this.props.data.name}! You've been accepted into Evian Industries, congratulations! 
        </p>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(TrainPage)}>
            What is Evian Industries?
          </button>
          <button onClick={() => this.props.goFunction(ShipPage)}>
            Okay…
            </button>
          </div>
          </div>
      </div>
    );
  }
}

class TrainPage extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
        <p className="story">
          Evian Industries is the largest industrial corps. in this sector of the galaxy.
        </p>
        
          <div className="btn-area">
            <button onClick={() => this.props.goFunction(willI)}>
              What will I be doing for Evian Industries?
            </button>
            <button onClick={() => this.props.goFunction(galaxy)}>
              Did you say sector of the galaxy?
            </button>
          <button onClick={() => this.props.goFunction(travelPage)}>
            Continue...
          </button>
          </div>
          </div>
      </div>
    );
  }
}

class galaxy extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
          <p className="story">
            That's right, we own 66% of all of the Mid-Eastern parts of the Milky Way.
        </p>

          <div className="btn-area">
            <button onClick={() => this.props.goFunction(noChoices)}>
              So I don't get to choose?
            </button>
            <button onClick={() => this.props.goFunction(travelPage)}>
              Fine, continue...
          </button>
          </div>
        </div>
      </div>
    );
  }
}

class willI extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
          <p className="story">
            Evian Industries processes all of our recruits and places them in the most appropriate positions.
        </p>

          <div className="btn-area">
            <button onClick={() => this.props.goFunction(noChoices)}>
              So I don't get to choose?
            </button>
            <button onClick={() => this.props.goFunction(travelPage)}>
              Fine, continue...
          </button>
          </div>
        </div>
      </div>
    );
  }
}

class noChoices extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
          <p className="story">
            Evian Industries processes all of our recruits and places them in the most appropriate positions.
        </p>

          <div className="btn-area">
            <button onClick={() => this.props.goFunction(noChoices)}>
              So I don't get to choose?
            </button>
            <button onClick={() => this.props.goFunction(travelPage)}>
              Fine, continue...
          </button>
          </div>
        </div>
      </div>
    );
  }
}

class ShipPage extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
        <p className="story">
          Now tell me a few things:
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
      </div>
    );
  }
}

class travelPage extends Component {
  render() {
    return (
      <div className="page">
        <div className="play-area">
        <p className="story">
          Ah, seat {this.props.data.seat}, excelent choice. Right this way.
        </p>
        <div className="btn-area">
          <button onClick={() => this.props.goFunction(walkPage)}>Walk</button>
          <button onClick={() => this.props.goFunction(walkPage)}>Run</button>
          </div>
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
          <div className="play-area">
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
        </div>
      );
    } else {
      return (
        <div className="page">
          <div className="play-area">
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
    } 
  }

  render() {
    return (
      <div className="page">
        <div className="play-area">
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

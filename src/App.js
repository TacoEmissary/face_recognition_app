import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
// import Clarifai from '../node_modules/clarifai/dist/index.js';
// const Clarifai = require('clarifai');
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: '8b6cdc8d154e42efaf48d8bdaf6ec19c'
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict({
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    },
      this.state.input)
    .then((response) => {
      this.displayFaceBoxthis(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({isSignedIn: false})
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: "home"})
  }

  render() {
    const { isSignedIn, imageURL, box, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={2} type="square" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === "home" ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition imageURL={imageURL} box={box}/>
            </div>
          : (
            route === "signin" ?
            <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
        {/* <script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script> */}
      </div>
    );
  }
}

export default App;
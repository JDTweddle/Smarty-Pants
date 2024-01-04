import React, { Component } from 'react';
import Particles from './Components/Particles/Particles.js';
import Clarifai from 'clarifai';
import Recognition from './Components/Recognition/Recognition.js';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';

window.process = {};

const app = new Clarifai.App({
  apiKey: 'eb9dac37032d467f9b5330841b227b91'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      concepts: [],
      route: 'signin',
    }
  }

  calculateDetectionBoxes = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const boxes = regions.map((region) => {
      const clarifaiBox = region.region_info.bounding_box;

      return {
        leftCol: clarifaiBox.left_col * width,
        topRow: clarifaiBox.top_row * height,
        rightCol: width - (clarifaiBox.right_col * width),
        bottomRow: height - (clarifaiBox.bottom_row * height)
      };
    });

    return boxes;
  };

  extractConcepts = (data) => {
    const regions = data.outputs[0].data.regions;
    const concepts = regions.map((region) => {
      return region.data.concepts;
    });
    return concepts;
  };

  displayData = (boxes, concepts) => {
    console.log('Boxes:', boxes);
    console.log('Concepts:', concepts);
    this.setState({ boxes, concepts });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict('general-image-detection', this.state.input)
      .then((response) => {
        const boxes = this.calculateDetectionBoxes(response);
        const concepts = this.extractConcepts(response);
        this.displayData(boxes, concepts);
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({ route: route});
  }

  render() {
    const { concepts } = this.state;
    return (
      <div className='App'>
        <Particles />
        { this.state.route === 'home'
          ? <div>
              <Navigation 
                onRouteChange={this.onRouteChange}/>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}/>
              <Recognition 
                boxes={this.state.boxes} imageUrl={this.state.imageUrl} concepts={concepts} />
            </div>
          : (
          this.state.route === 'signin'
          ? <Signin 
              onRouteChange={this.onRouteChange}/>
          : <Register 
              onRouteChange={this.onRouteChange}/>
          )
         
        }
      </div>
    );
  }
}
export default App;
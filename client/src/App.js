import React, { Component } from 'react';
import Logo from './components/Logo'
import Nav from './components/Nav'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';




const particleOption = ("particles-js", { "particles": { "number": { "value": 160, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true })

const app = new Clarifai.App({
  apiKey: 'be39db3b073b42979b3ac8980aeceb31'
});


class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entry,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {

    const Clarifai = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('image');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      w: (Clarifai.right_col - Clarifai.left_col) * width,
      h: (Clarifai.bottom_row - Clarifai.top_row) * height,
      t: Clarifai.top_row * height,
      l: Clarifai.left_col * width
    }
  }

  displayBox = (box) => {
    this.setState({ box: box })
  }




  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(resp => {
        if (resp) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              console.log('count', count)
              this.setState(Object.assign(this.state.user, { entries: count[0].entry }))
            })
        }
        this.displayBox(this.calculateFaceLocation(resp))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    else if (route === 'signin') {
      this.setState({
        isSignedIn: false
      })
    }
    this.setState({ route: route })
  }

  render() {
    const { box, imageUrl, route, isSignedIn } = this.state
    return (
      <div className='app'>
        <Particles
          className="particles"
          params={particleOption} />
        <Nav
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    )
  }
}

export default App;

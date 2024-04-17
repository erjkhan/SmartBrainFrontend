import React , { Component } from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';

import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';


 


const initialState = {
           input :'',
           imageUrl : '',
           box :{},
           route : 'signin',
           isSignedIn : false,
           user : {

                name :'',
                id:'',
                email :'',
                entries: 0 ,
                joined : ''
           }
        
        } 
           
   

class App extends Component{
          constructor() {
        super();
           this.state =  initialState 
       }


    loadUser = (data) =>

    {
       this.setState( { user : {
                name :data.name,
                id:data.id,
                email :data.email,
                entries: data.entries ,
                joined : data.joined
           }
            })
    }

 calculateFaceLocation =  (data) => { 
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 console.log(clarifaiFace);
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol :clarifaiFace.left_col* width,
    topRow : clarifaiFace.top_row * height,
    rightCol : width - (clarifaiFace.right_col * width ),
    bottomRow : height - ( clarifaiFace.bottom_row * height)
  }
           

         }

DisplayfaceBox =( box)=>{

this.setState({box:box});

}


onInputChange=(event)=>{
this.setState({input:event.target.value});
}

onRouteChange = (route) =>

{
  if(route==='signout'){
    this.setState(initialState)
  }
  else if (route === 'home') {
    this.setState({isSignedIn:true})
  }
  this.setState({route:route});
}

onClick = ()=>
{
 this.setState({ imageUrl: this.state.input });
  fetch('http://localhost:3000/imageUrl',{
                method:'post',
                headers :{'Content-type':'application/json'},
                body : JSON.stringify({
                    input : this.state.input
                  
                })
                  })
  .then(response=>response.json())
    .then(response => {

            if (response)
            {

            fetch('http://localhost:3000/image',{
                method:'put',
                headers :{'Content-type':'application/json'},
                body : JSON.stringify({
                    id : this.state.user.id
                  
                })
            })

            .then(response=>response.json())
            .then(count => {
                this.setState(Object.assign(this.state.user , {entries:count}))

            })
            .catch(err=> {console.log(err)})
        }
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.outputs && data.outputs[0].data) {
                this.DisplayfaceBox(this.calculateFaceLocation(data));
            } else {
                throw new Error('Invalid response format');
            }
        })
        .catch(err => console.error(err));
      
  
}


  render(){
    const {isSignedIn,imageUrl,route,box} = this.state
  return (
    <div className="App">
        
        <ParticlesBg  className='particles' type="circle" bg={true} />
     
      
 <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
 
  { route==='home' ?   
      <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm  onInputChange={this.onInputChange} onClick={this.onClick} />
        <FaceRecognition  box={box} imageUrl={imageUrl}/>
     </div>  
     : 
     ( route==='signin' ?

        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                            
                                             )

      
   }
 </div>
  
  );
}

}

export default App;

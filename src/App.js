import React , {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

firebase.initializeApp({
  apiKey: "AIzaSyA_kvHvhV4DNfgxWMvoPRatQB0VhKcMIPU",
  authDomain: "reactfirebaseproject1.firebaseapp.com",
  databaseURL: "https://reactfirebaseproject1.firebaseio.com",
  projectId: "reactfirebaseproject1",
  storageBucket: "reactfirebaseproject1.appspot.com",
  messagingSenderId: "166245078377",
  appId: "1:166245078377:web:681fd5ce294c56a3c499f8",
  measurementId: "G-C1JR4RZVVN"
});

class App extends Component {
  state = { isSignedIn:false }
  uiConfig ={
    signInFlow:"popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess: () => false
    }
  }
  
  componentDidMount=() =>{
    
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({ isSignedIn : !!user })
    })
  }
  render() {
  return (
    
    <div className="App">
      {this.state.isSignedIn ?
    ( <span>
        <Typography variant="h5" component="h3" color="primary">
          Welcome {firebase.auth().currentUser.displayName}
        </Typography>
      <Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} className="center" />
      <Button variant="contained" color="primary" onClick={()=>firebase.auth().signOut()}>SignOut</Button>
      </span>
    )
    :
    (
      <StyledFirebaseAuth
        uiConfig = {this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )
    }
    </div>
    
  )
  }
}

export default App;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component'
import { auth, createUserProfileDocument } from './db/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
  unSubscribeFromAuth =null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        });
        
      }
      setCurrentUser(userAuth)
    });
  }
 
  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(App);

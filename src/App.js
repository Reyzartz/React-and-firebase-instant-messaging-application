import React from 'react';
import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import Sign_up from './components/Sign-up/Sign-up';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/sign-up' component={Sign_up}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Redirect from="" to="/login"/>
          </Switch>
        </div>
    </BrowserRouter>
    
  );
}

export default App;

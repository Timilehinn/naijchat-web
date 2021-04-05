import {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Login from './components/login'
import Register from './components/register'
import Dash from './components/dashboard/dashboard'
import Four from './components/404'
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import {AuthContext} from './contexts/authContextApi'
import Settings from './components/dashboard/settings'
import Create_topic from './components/dashboard/create_topic'
import Room from './components/dashboard/room';
import Search from './components/dashboard/search';
function App() {
  const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

  return (
    <div> 
      <Switch>
          <Route path='/' component={Home} exact />
          {/* <Route path='http://localhost:3333/api/download-the-app' component={Home} /> */}
          <Route path='/signin' component={Login} />
          <Route path='/signup' component={Register} />
          <Route path='/d/:user' render={(props) => !auth ? <Redirect to="/" /> : <Dash {...props}/> }/>
          <Route path='/create-topic' render={(props) => !auth ? <Redirect to="/" /> : <Create_topic {...props}/> } />
          <Route path='/settings' render={(props) => !auth ? <Redirect to="/" /> : <Settings {...props}/> } />
          <Route path='/search' render={(props) => !auth ? <Redirect to="/" /> : <Search {...props}/> } />
          <Route path='/topic/:room' render={(props) => !auth ? <Redirect to="/" /> : <Room {...props}/> } />
          <Route component={Four} />
      </Switch>
    </div>
  );
}

export default App;

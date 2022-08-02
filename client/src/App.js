import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/DogDetail/DogDetail';
import DogCreate from './components/DogCreate/DogCreate';
import Error404 from './components/ErrorNotFound/ErrorNotFound';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ={'/'} component={LandingPage}/>
        <Route exact path ={'/home'} component={Home}/>
        <Route path ={'/dog'} component={DogCreate}/>
        <Route path ={'/home/:id'} component={Detail}/>
        <Route path= '*' component = {Error404}/>
      </Switch>
      {/* <h1>Henry Dogs</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default App;

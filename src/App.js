import Login from './components/auth/login';
import Register from './components/auth/register';
import Chat from './components/chat/chat';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import './App.scss'
import ProtectedRouter from './components/routers/protectedRouter';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faSmile, faImage, faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell)

function App() {
  return (
    <Router>
      <div className="App">
        <Switch> {/*Renders only one maching path*/}
          <ProtectedRouter exact path='/' component={Chat} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route render={()=> <h1>404 Page not found</h1>} />
        </Switch>  
      </div>
    </Router>
  );
}

export default App;

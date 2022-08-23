import {useEffect,useRef,useState} from 'react'
import {io} from 'socket.io-client'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserLogin from './components/userlogin';
import CounterLogin from './components/counterlogin';
import Countercall from './components/countercall';
import Counter from './components/counter';
import Issueinput from './components/issueinput';
import RequireAuth from './components/RequireAuth';
import RequireAuth2 from './components/RequireAuth2';
import Notifications from './components/notifications';
import Queuedisplay from './components/queuedisplay';
import Socket from './components/socket';
function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/userlogin" element={<UserLogin/>} />
      <Route path="/counterlogin" element={<CounterLogin/>} />
  


      <Route element={<RequireAuth />}>
     
      <Route path="/issueinput" element={<Issueinput/>}/>
      <Route path="/notifications" element={<Notifications/>} />
      <Route path="/queuedisplay" element={<Queuedisplay/>}/>
      </Route>

      <Route element={<RequireAuth2 />}>

      <Route path="/countercall/:id"
        element={<Countercall/>}/>

      <Route path="/counter" element={<Counter />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;

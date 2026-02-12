import { Routes, Route, BrowserRouter } from "react-router-dom";
import Body  from "./Body";
import Login from "./Login"
import Profile from "./Profile"
import {Provider} from "react-redux";
import Feed from "./Feed"
import appStore from "./utils/appStore";
import Connection from "./Connection";
import Request from "./Request";
import NotFound from "./NotFound";

function App() {
  return (
    
   <Provider store={appStore}>
       <Routes>
        <Route path="/" element={<Body/>}>
        <Route index element={<Login />} />

        <Route path="/login" element={<Login/>}/>
        <Route path="/feed" element={<Feed/>}/>
           <Route path="/profile" element={<Profile/>}/>
                 <Route path="/connections" element={<Connection/>}/>
                   <Route path="/request" element={<Request/>}/>
         


          <Route path="*" element={<NotFound/>} />
        </Route>
        
    </Routes>
    </Provider>
 
    
    
  )
}

export default App

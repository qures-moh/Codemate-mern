import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";
import { useNavigate} from "react-router-dom";
import Request from "./Request";
import axios from "axios"
import api from "./utils/api";

const NavBar=()=>{
      const user=useSelector(store=>store.user); 
      const dispatch=useDispatch();
      const navigate=useNavigate()
     
      const handleLogout=async()=>{
        try{
        await api.post("/logout",{},{
          withCredentials:true
        });
        dispatch(removeUser());
        navigate("/login")


      }
      catch(err){
 
      }
    }
    const avatar =
  user?.photoUrl ||
  `https://api.dicebear.com/7.x/personas/svg?seed=${user?._id || "guest"}`;
 
  
  return(
            <>
   
    <div className="navbar bg-base-200 text-base-content shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">CodeMate</a>
  </div>
  <div className="flex gap-2">
  
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       {user && <div className="w-10 rounded-full">
       <img
  alt="User avatar"
  src={avatar}
/>
        </div>}
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile</Link>
          
         
        </li>
        <li>
          <Link to="/feed" className="justify-between">
            Feed</Link>
          
         
        </li>
        <li>
          <Link to="/connections" className="justify-between">
            Friends</Link>
          
         
        </li>
        <li>
          <Link to="/request" className="justify-between">
           Friend Requests</Link>
          
         
        </li>
         {/* <li>
          <Link to="/request" className="justify-between">
            Request</Link>
            <span className="badge">New</span>
         
        </li> */}
       
      <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  </div>
</div>
    </>
        )
}
export default NavBar;
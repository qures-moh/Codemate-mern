import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
// import axios from "axios"
import api from "./utils/api";
// import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import Footer from "./Footer";
export default function Body(){
    const dispatch=useDispatch();
    const user=useSelector(store=>store.user);
    const handleLoggedData=async()=>{
        try{
       if(!user){
      const res= await api.get("/profile");
        

     

        dispatch(addUser( res.data));
       }
}catch(err){
   
     
      if (err.response?.status === 401) {

        return;
      }
}
    }
    useEffect(()=>{
   handleLoggedData()
    },[])
    return(
        <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* pushes footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
    
}
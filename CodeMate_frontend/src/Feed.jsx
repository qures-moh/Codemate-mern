import { useEffect } from "react";
import {BASE_URL} from "./utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";
import api from "./utils/api";
const Feed=()=>{
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);

    const getFeed=async()=>{
      
      
       if (feed !== null) {
    console.log("Feed already exists → API NOT called");
    return;
  }

  console.log("Feed is NULL → API will be called");
        const res= await api.get("/feed");
        console.log(res)
        dispatch(addFeed(res.data));
    };
    useEffect(()=>{
     if (feed === null) {
      getFeed();
    }
},[]);



  if (feed === null) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  if (feed.length === 0) {
    return (
      <div className="flex justify-center mt-10 text-gray-500">
        <h2 className="text-lg font-semibold">
          No profiles available right now 😔
        </h2>
      </div>
    );
  }

 const {_id,firstName,lastName,age,photoUrl,about,skills}=feed[0];
 console.log(firstName,lastName,age,photoUrl,about,skills);
  return(
  <UserCard id={_id} firstName={firstName} lastName={lastName} age={age} photoUrl={photoUrl} about={about} skills={skills}/>
    )
};
export default Feed;
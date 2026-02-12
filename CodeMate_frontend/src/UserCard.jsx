import api from "./utils/api";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard=({id,firstName,lastName,age,photoUrl,about})=>{
  const dispatch=useDispatch();
  const handleIntersted=async(status,userId)=>{
    try{
    const data= await  api.post(`/request/send/${status}/${userId}`,{});
    console.log(data.data);
    dispatch(removeFeed(userId));

    }catch(err){
      console.log("STATUS:", err.response?.status);
    console.log("ERROR:", err.response?.data);




    }
  }
    return(
         <div className="flex justify-center">
            <div className="card bg-gray-200 w-96 shadow-sm my-10 ">
  <figure>
   {photoUrl && <img
      src={photoUrl}
      alt="Photo_Url" />}
  </figure>
  <div className="card-body  text-black">
    <h2 className="card-title flex justify-center">{firstName} {lastName}</h2>
    
     <p>{about}
      {age&&<p>Age:{age}</p>} </p>

 
    
    <div className="card-actions  flex justify-center">
      <button className="btn btn-primary" onClick={()=>handleIntersted("interested",id)}>Interested</button>
      <button className="btn btn-neutral" onClick={()=>handleIntersted("ignored",id)}>Ignore</button>
    </div>
  </div>
</div>
        </div>
    )
}
export default UserCard;
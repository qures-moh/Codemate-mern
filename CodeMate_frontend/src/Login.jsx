import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
// import { BASE_URL } from "./utils/constants";
import api from "./utils/api";

const Login = () => {
    const [firstName,SetFirstName]=useState("");
    const [LastName,setLastName]=useState("");
    const [isLogin,setIsLogin]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

   const handleLogin=async()=>{
    try{
     const res=
      await api.post("/login", {
 emailId: email,
  password,
});
     
      dispatch(addUser(res.data))
      navigate("/feed");
}catch(err){
setError(err.response?.data?.error || "Login failed");
}
   }

   const handleSignUp=async()=>{
      try {
    const res=await api.post("/signup",{firstName,lastName:LastName,emailId:email,password});
     dispatch(addUser(res.data));
      navigate("/profile");
      }
      catch (err) {
    console.log(err.response?.data || "Signup failed");
setError(err.response?.data?.error || "Signup failed");
  }

   }
    return (
        <div className="flex justify-center py-5">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body items-center text-center">

                    <h2 className="card-title mb-4">{isLogin ? "Login": "SignUp"}</h2>
                     { !isLogin &&<> 
                       <input
                        className="input input-bordered w-3/4 mb-3"
                        type="text"
                        placeholder="Enter FirstName"
                        value={firstName}
                        onChange={(e)=>SetFirstName(e.target.value)}
                    />
                     <input
                        className="input input-bordered w-3/4 mb-3"
                        type="text"
                        placeholder="Enter Last Name"
                        value={LastName}
                        onChange={(e)=>setLastName(e.target.value)}
                    />
                  </>   }

                    <input
                        className="input input-bordered w-3/4 mb-3"
                        type="text"
                        placeholder="Enter Email Id"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                     
                    <input
                        className="input input-bordered w-3/4 mb-4"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-3/4" onClick={isLogin ?handleLogin:handleSignUp}>{isLogin ? "Login" :"SignUp"}</button>

                    <h1 className="text-red-500  my-1">{error +""}</h1>
                   <h1 className="py-1">
  {isLogin ? (
    <>
      Existing user?{" "}
      <span
        className="cursor-pointer underline text-blue-600"
        onClick={() => setIsLogin(false)}
      >
        Sign in
      </span>
    </>
  ) : (
    <>
      Already have an account?{" "}
      <span
        className="cursor-pointer underline text-blue-600"
        onClick={() => setIsLogin(true)}
      >
        Log in
      </span>
    </>
  )}
</h1>


                </div>
            </div>
        </div>
    );

}
export default Login;

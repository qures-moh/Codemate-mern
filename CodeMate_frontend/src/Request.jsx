import api from "./utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "./utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequest = async () => {
    const request = await api.get("/user/request/recieved");
    console.log(request);
    dispatch(addRequest(request.data.data));
  };

 const handleReview = async (status, requestId) => {
    try {
      const res = await api.post(
        `/request/review/${status}/${requestId}`
      );
      console.log(res.data);

      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
//   const { firstName, lastName, about } = request;

 
  
  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
  {requests.length === 0 ? (
    <p className="text-center text-gray-500">No requests found</p>
  ) : (
    requests.map((req) => {
      const { _id,firstName, lastName, about, photoUrl } = req.fromUserId;

      return (
        <div
          key={req._id}
          className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between"
        >
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <img
              src={photoUrl || "/default-avatar.png"}
              alt={`${firstName} ${lastName}`}
              className="w-14 h-14 rounded-full object-cover border"
            />

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {firstName} {lastName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{about}</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-3">
            <button className="px-4 py-1.5 rounded-lg bg-blue-900 text-white text-sm hover:bg-green-600 transition"
             onClick={()=>{handleReview("accepted",req._id)}}>

      
              Accept
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
            onClick={()=>{
              handleReview("rejected",req._id)
            }}>
              Reject
            </button>
          </div>
        </div>
      );
    })
  )}
</div>

  )}
          



export default Request;

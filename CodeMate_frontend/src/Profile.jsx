import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import api from "./utils/api";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
   const navigate=useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || null);
      setGender(user.gender || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const payload = { firstName, lastName, about };
      if (gender) payload.gender = gender;
      if (photoUrl) payload.photoUrl = photoUrl;
      if (age !== null) payload.age = age;

     const res= await api.patch("/profile/update", payload);
     console.log(res)
      console.log("Profile updated successfully");
        setStatusMessage("Profile updated successfully");
       dispatch(addUser(res.data.data));
       navigate("/feed")

    setTimeout(() => {
      setStatusMessage("");
    }, 3000);
    } catch (err) {
      console.log("Backend error:", err.response?.data);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        
        {/* PROFILE FORM */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title text-2xl">Edit Profile</h2>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="About you"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Age"
              value={age ?? ""}
              onChange={(e) =>
                setAge(e.target.value === "" ? null : Number(e.target.value))
              }
            />

            <button className="btn btn-primary w-full" onClick={handleUpdate}>
              Update Profile
            </button>
            
{statusMessage && (
  <p className="text-sm text-green-500 text-center mt-2">
    {statusMessage}
  </p>
)}
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="flex justify-center">
          <UserCard
            firstName={firstName}
            lastName={lastName}
            age={age}
            photoUrl={photoUrl}
            about={about}
            gender={gender}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;

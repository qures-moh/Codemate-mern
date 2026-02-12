const validator=require("validator");

const validateSignUp=(data={})=>{
  const{firstName,lastName,emailId,password}=data;
 
  if(!firstName || !lastName || !emailId || !password){
    throw new Error("Missing fields");
  }
  else if(!validator.isEmail(emailId))
    {
       throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
         throw new Error("Enter Strong Password");
    }
}



const validateUpdateProfile = (data = {}) => {
  const { firstName, lastName, photoUrl, age, gender, about } = data;


  if (firstName !== undefined) {
    if (typeof firstName !== "string" || firstName.trim().length < 2) {
      throw new Error("First name must be at least 2 characters");
    }
  }

  if (lastName !== undefined) {
    if (typeof lastName !== "string" || lastName.trim().length < 2) {
      throw new Error("Last name must be at least 2 characters");
    }
  }

  
  if (photoUrl !== undefined) {
    if (!validator.isURL(photoUrl)) {
      throw new Error("Photo URL is not valid");
    }
  }


  if (age !== undefined) {
    if (!Number.isInteger(age) || age < 18 || age > 100) {
      throw new Error("Age must be between 18 and 100");
    }
  }

 
  if (gender !== undefined) {
    const allowedGenders = ["male", "female", "other"];
    if (!allowedGenders.includes(gender.toLowerCase())) {
      throw new Error("Gender must be male, female, or other");
    }
  }

  if (about !== undefined) {
    if (typeof about !== "string" || about.length > 300) {
      throw new Error("About must be a string with max 300 characters");
    }
  }
};

module.exports = {
  validateUpdateProfile,
};


module.exports={
    validateSignUp,
    validateUpdateProfile
};

const socket = require("socket.io");
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat",({firstName,userId,id})=>{
        
        const roomId= [userId,id].sort().join("_");
       console.log(firstName+" "+roomId)
        socket.join(roomId)
    });
    socket.on("sendMessage",({firstName,userId,id,text})=>{
         const roomId= [userId,id].sort().join("_");
         console.log(firstName +" "+text)
         io.to(roomId).emit("messageRecieved",{firstName,text})
    })
  });
};
module.exports=initializeSocket;
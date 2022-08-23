import  "reflect-metadata"
import { DataSource } from "typeorm"
import { Nuser } from "./entities/Nuser"
import { Notification } from "./entities/Notification" 
import { Issue } from "./entities/Issue"
import { Counter } from "./entities/Counter"
import { Cuser } from "./entities/Cuser"
import express  from "express"
import { appendFile } from "fs"
import cuserrouter from "./routes/cuserRoutes"
import Cors from 'cors'
import dotenv from 'dotenv'
import { Server, Socket } from 'socket.io'
import http from 'http'
import {getcurruntnext2} from './controllers/issuecontroller'
import {getcurruntnext3} from './controllers/issuecontroller'
import {getcurruntnext4} from './controllers/issuecontroller'

dotenv.config();



const app = express()

const server = http.createServer(app)


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "queueapp",
    entities: [Nuser,Notification,Issue,Counter,Cuser],
    synchronize: true,
    logging: false,
})

 //middleware
 app.use(express.json())
 app.use(Cors())
 

 //routes
 app.use(cuserrouter)
 
//initialize
AppDataSource.initialize()
    .then(() => {
      console.log('db connected')
      
    })
    
    .catch((error) => console.log(error))

   //socket.io
 


   export const io = new Server(server,{cors: {origin:"http://localhost:3000"}})

   let onlineUsers:any = [];

   const addNewUser = (username:any, socketId:any) => {
     !onlineUsers.some((user:any) => user.username === username) &&
       onlineUsers.push({ username, socketId });
   };

   const getUser = (username:any) => {
    return onlineUsers.find((user:any) => user.username === username);
  };

        io.on("connection",(socket)=>{
        
          //add new user
          socket.on("newUser", (username) => {
            addNewUser(username, socket.id);
          });
          console.log('online users',onlineUsers)


         //remove user
         const removeUser = (socketId:any) => {
          onlineUsers = onlineUsers.filter((user:any) => user.socketId !== socketId);
        };

        //send notifications
        socket.on("sendNotification", ({ receiverName, type,id }) => {
          const receiver = getUser(receiverName);
          console.log("receiver cheking");
          console.log(receiver);
          console.log(onlineUsers)
          console.log(getUser(receiverName))
         
        io.to(receiver.socketId).emit("getNotification", {
            id,
            type
          });


        });
         
           
        setInterval(function(){
      
          getcurruntnext2().then((Counter) => {
            io.emit('getqueuenum1', Counter);            
        });

        getcurruntnext3().then((Counter) => {
          io.emit('getqueuenum2', Counter);            
      });

      getcurruntnext4().then((Counter) => {
        io.emit('getqueuenum3', Counter);            
    });
          
      }, 1000);
      
        socket.on('disconnect',()=>{
          removeUser(socket.id);
        })
        })

    

    server.listen(8000, ()=>{
      
      console.log('app runing on server 8000')
     })

import { Issue } from '../entities/Issue';
import {Request,Response,NextFunction} from 'express'
import { AppDataSource } from "../index"
import { Counter } from '../entities/Counter';



export const GenarateQueueNum = async (req:Request,res:Response,next:NextFunction) =>{
    console.log("line 10");
    try {
       
        const counters = await AppDataSource.getRepository(Counter) 
           .createQueryBuilder("counter")
           .where("counter.isOnline = :val", { val: 1 }).getRawMany();
          
        console.log(counters);
        let selectedMinQNumber = -1;
        let counterId = -1;
        for (let i=0;i<counters.length;i++)        {
            const c = counters[i];
            console.log(c)
            if(selectedMinQNumber==-1 || c.counter_next_num < selectedMinQNumber){
                selectedMinQNumber= c.counter_next_num;
                counterId=c.counter_id;
            }
        }
        console.log({
            counterId,
            selectedMinQNumber
        });
        if(counterId==-1){
            throw "No counter available";   
        }
    req.body.queue_num=selectedMinQNumber;
    req.body.counter_id=counterId;
  
    return next();
        
    } catch (error) {
       return  res.status(500).json(error);
    }

   
}
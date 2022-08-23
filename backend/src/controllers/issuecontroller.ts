import { Request,Response } from "express";
import { Issue } from "../entities/Issue";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { AppDataSource } from "../index"
import { Counter } from "../entities/Counter";
import { Nuser } from "../entities/Nuser";

export const createissue =async (req:Request,res:Response) =>{
    
   try {
      console.log("reg.body",req.body)
    let{name,tel,email,issue,counter_id} =req.body

 
    const issues = new Issue();
    issues.name =name
    issues.tel =tel
    issues.email =email
    issues.issue =issue
    issues.nuser =req.body.userId
    issues.counter =counter_id;
    issues.queue_num =req.body.queue_num;  

    
    const savedissue=await issues.save();
      console.log("savedissue",savedissue);

          await AppDataSource.getRepository(Counter)
                .createQueryBuilder()
                .update(Counter)
                .set({  next_num: req.body.queue_num+1 })
                .where("id = :id", { id: counter_id })
                .execute();


   //  const havingissue = await AppDataSource.getRepository(Nuser)
   //              .createQueryBuilder()
   //              .update(Nuser)
   //              .set({ havingissue: true })
   //              .where("id = :id", { id: req.body.userId })
   //              .execute();


     res.json(savedissue)

   } catch (error) {

     res.status(500).json({message:error.message})
   }
    
}



export const getissue =async (req:Request,res:Response) =>{
    
    try {
    
   /*   console.log(req.body.userId);
     const issue = await Issue.findOneBy({nuser: req.body.userId})
      res.json(issue)
   */
   const issueRepository = await AppDataSource.getRepository(Issue) 
     
          .createQueryBuilder("issue")
          .where("issue.nuser = :nuser", { nuser: req.body.userId })
          .andWhere("issue.isDone = :isDone", { isDone: false })
          .getMany();

          res.json(issueRepository.length)

     } catch (error) {
 
        res.status(500).json({message:error.message})
     }


    
     
 }

   

 export const 
 getcurruntnext2 =async (): Promise<Counter[]> =>{
    
   try {
     const issueRepository = await AppDataSource.getRepository(Counter) 
    
         .createQueryBuilder("counter")
         .where("counter.id = :id", { id: 2 })
         .getRawOne();
        
         return(issueRepository)

    } catch (error) {

      return[]
    }


   
    
}

export const getcurruntnext3 =async (): Promise<Counter[]> =>{
    
   try {
     const issueRepository = await AppDataSource.getRepository(Counter) 
    
         .createQueryBuilder("counter")
         .where("counter.id = :id", { id: 3 })
         .getRawOne();
        
         return(issueRepository)

    } catch (error) {

      return[]
    }


   
    
}

export const getcurruntnext4 =async (): Promise<Counter[]> =>{
    
   try {
     const issueRepository = await AppDataSource.getRepository(Counter) 
    
         .createQueryBuilder("counter")
         .where("counter.id = :id", { id: 4 })
         .getRawOne();
        
         return(issueRepository)

    } catch (error) {

      return[]
    }


   
    
}

 export const getsingleissue =async (req:Request,res:Response) =>{
    
   try {
   
  const {id}= req.params
  const issueRepository = await AppDataSource.getRepository(Issue) 
    
         .createQueryBuilder("issue")
         .where("issue.id = :id", { id: parseInt(id) })
         .getOne();

         res.json(issueRepository)

    } catch (error) {

       res.status(500).json({message:error.message})
    }


   
    
}

 export const deleteissue =async (req:Request,res:Response) =>{
   
    try {

      // const {id}= req.params;

       const result = await Issue.delete({nuser: req.body.userId})

       if(result.affected ===0){
        return res.status(404).json({ message: "user does not exists"});
       } 

   
       return  res.json({message:"Primaryfully deleted"});
    
 
   } catch (error) {

    return  res.status(500).json({
       //message:error.message
      })
   }
    
}

export const getcounterissues =async (req:Request,res:Response) =>{
    
    try {
    
   const counterRepository = await AppDataSource.getRepository(Counter) 
     
          .createQueryBuilder("counter")
          .where("counter.cuser = :cuser", { cuser: req.body.userId })
          .getRawOne();

       console.log(counterRepository.counter_id)

          
          const issueRepository = await AppDataSource.getRepository(Issue)
          .createQueryBuilder("issue")
          .where("issue.counter = :counter", { counter: counterRepository.counter_id })
          .andWhere("issue.isDone = :isDone", { isDone: false })
          .orderBy("issue.queue_num", "ASC")
          .getMany();
           
          res.json(issueRepository)
 

     } catch (error) {
 
        res.status(500).json({message:error.message})
     }


    
     
 }

 export const issuecalled =async (req:Request,res:Response) =>{
    
    try {
    
        const {id}= req.params;
         //req.body.isCalled="true";
        const user = await Issue.findOneBy({id: parseInt(req.params.id)})

        if(!user)  return res.status(404).json({ message: "issue does not exists"});

        
               const issueRepository = await AppDataSource.getRepository(Issue)
                .createQueryBuilder()
                .update(Issue)
                .set({ isCalled: true })
                .where("id = :id", { id: id })
                .execute();

                return res.json({message:"Primaryfully updated"});

     } catch (error) {
 
       return res.status(500).json({message:error.message})
     }


    
     
 }

 export const issuedone =async (req:Request,res:Response) =>{
    
    try {
    
        const {id}= req.params;
         //req.body.isCalled="true";
        const user = await Issue.findOneBy({id: parseInt(req.params.id)})

        if(!user)  return res.status(404).json({ message: "issue does not exists"});

        
               const issueRepository = await AppDataSource.getRepository(Issue)
                .createQueryBuilder()
                .update(Issue)
                .set({ isDone: true })
                .where("id = :id", { id: id })
                .execute();

                return res.json({message:"Primaryfully updated"});

     } catch (error) {
 
       return res.status(500).json({message:error.message})
     }


    
     
 }


 export const doneandnext =async (req:Request,res:Response) =>{
    
   try {
   
       const {id}= req.params;
        //req.body.isCalled="true";
       const user = await Issue.findOneBy({id: parseInt(req.params.id)})

       if(!user)  return res.status(404).json({ message: "issue does not exists"});

       
              const issueRepository = await AppDataSource.getRepository(Issue)
               .createQueryBuilder()
               .update(Issue)
               .set({ isDone: true })
               .where("id = :id", { id: id })
               .execute();

               const getnext = await AppDataSource.getRepository(Issue)
               .createQueryBuilder("Issue")
               .where("id = :id", { id: id })
               .getOne();

               return res.json(getnext);

    } catch (error) {

      return res.status(500).json({message:error.message})
    }


   
    
}


 export const nextissuecalled =async (req:Request,res:Response) =>{
    
    try {
      
        const counterRepository = await AppDataSource.getRepository(Counter) 
        .createQueryBuilder("counter")
        .where("counter.cuser = :cuser", { cuser: req.body.userId })
        .getRawOne();
        console.log(counterRepository.counter_id)
        //res.json(counterRepository.counter_id)
        
        const nextnum = await AppDataSource.getRepository(Issue)
        .createQueryBuilder("issue")
        .select("MIN(issue.queue_num)","min")
        .where("issue.counter = :counter", { counter:counterRepository.counter_id })
        .andWhere("issue.isCalled = :isCalled", { isCalled: false })
        .andWhere("issue.isDone = :isDone", { isDone: false }) 
        .getRawOne();
        let nextnum1=nextnum.min
        const currunt =parseInt(req.params.id)

          if(nextnum1==null)
          { nextnum1=0}
   
        const counterassign = await AppDataSource.getRepository(Counter) 
        .createQueryBuilder()
        .update(Counter)
        .set({ current_num:currunt, next_num:nextnum1})
        .where("counter.id = :id", { id: counterRepository.counter_id })
        .execute();

       res.json(counterassign)
        
         
   

     } catch (error) {
 
        res.status(500).json({message:error.message})
     }


    
     
 }

 export const getnextissue =async (req:Request,res:Response) =>{
    
   try {

               const {id}= req.params;
         //req.body.isCalled="true";

        
               const issueRepository = await AppDataSource.getRepository(Issue)
                .createQueryBuilder()
                .update(Issue)
                .set({ isDone: true })
                .where("id = :id", { id: id })
                .execute();

                console.log(id)
                console.log(req.body.userId)

               const counterRepository = await AppDataSource.getRepository(Counter) 
               .createQueryBuilder("counter")
               .where("counter.cuser = :cuser", { cuser: req.body.userId })
              
               .getRawOne();
               console.log(counterRepository.counter_next_num)
               //res.json(counterRepository.counter_id)

               const doiscalled = await AppDataSource.getRepository(Issue)
                .createQueryBuilder()
                .update(Issue)
                .set({ isCalled: true })
                .where("queue_num = :queue_num", { queue_num: counterRepository.counter_next_num})
                .andWhere("counter = :counter", { counter:counterRepository.counter_id })
                .execute();
                console.log(doiscalled)
       
               const nextissue = await AppDataSource.getRepository(Issue)
               .createQueryBuilder("issue")
               .where("issue.queue_num = :queue_num", { queue_num:counterRepository.counter_next_num })
               .andWhere("issue.counter = :counter", { counter:counterRepository.counter_id })
               .getOne();
               console.log(nextissue)

               
               const nextnum = await AppDataSource.getRepository(Issue)
               .createQueryBuilder("issue")
               .select("MIN(issue.queue_num)","min")
               .where("issue.counter = :counter", { counter:counterRepository.counter_id })
               .andWhere("issue.isCalled = :isCalled", { isCalled: false })
               .andWhere("issue.isDone = :isDone", { isDone: false }) 
               .getRawOne();
               let nextnum1=nextnum.min
               const currunt =counterRepository.counter_next_num

                  if(nextnum1==null)
                  { nextnum1=0}
                  console.log(nextnum1)
                  console.log(currunt)

               const counterassign = await AppDataSource.getRepository(Counter) 
               .createQueryBuilder()
               .update(Counter)
               .set({ current_num:currunt, next_num:nextnum1})
               .where("counter.id = :id", { id: counterRepository.counter_id })
               .execute();
               console.log(counterassign)
            
      

               res.json(nextissue)
       
        
  

    } catch (error) {

       res.status(500).json({message:error.message})
    }


   
    
}

 export const counterclose =async (req:Request,res:Response) =>{
    
   try {
    
      
      const counterRepository = await AppDataSource.getRepository(Counter) 
        
             .createQueryBuilder("counter")
             .update(Counter)
             .set({ isOnline: false })
             .where("counter.cuser = :cuser", { cuser: req.body.userId })
             .execute();

              
             res.json({message:"Counter closed"});
    
   
        } catch (error) {
    
           res.status(500).json({message:error.message})
        }


   
    
}

export const closecounter =async (req:Request,res:Response) =>{
    
   try {
    
      
      const counteRepository = await AppDataSource.getRepository(Counter) 
        
                     .createQueryBuilder()
                     .update(Counter)
                     .set({ isOnline: false })
                     .where("counter.cuser = :cuser", { cuser: req.body.userId })
                     .execute();
              
             res.json({message:"Counter closed"});
    
   
        } catch (error) {
    
           res.status(500).json({message:error.message})
        }


   
    
}
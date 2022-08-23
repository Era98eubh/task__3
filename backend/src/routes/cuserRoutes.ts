import {Router}  from "express";
import { TokenValidation } from "../libs/verifyToken";
import { createCuser,getCusers,getCuser,updateCusers,deleteCusers,loginCuser } from "../controllers/cusercontroller"
import { createNuser,getNusers,getNuser,loginNuser,havingissue } from "../controllers/nusercontroller"
import { createissue,getissue,deleteissue,getcounterissues,issuecalled,getsingleissue,closecounter,getnextissue, issuedone,nextissuecalled,counterclose} from "../controllers/issuecontroller"
import {GenarateQueueNum} from "../libs/GenerateQueue"
import  cors from "cors";

const router = Router();

//cuser routes
router.post('/api/cuser',createCuser);
router.post('/api/cuser/login',loginCuser);
router.get('/api/cuser',getCusers);
router.get('/api/cuser/:id',getCuser);
router.put('/api/cuser/:id',updateCusers)
router.delete('/api/cuser/:id',deleteCusers)


//nuser routes
router.post('/api/nuser',createNuser);
router.post('/api/nuser/login',loginNuser);
router.get('/api/nuser',TokenValidation,getNusers);
router.get('/api/nuser/:id',getNuser);


//issue routes
router.post('/api/nuser/createissue',TokenValidation,GenarateQueueNum,createissue);
router.post('/api/nuser/havingissue',TokenValidation,havingissue);
router.post('/api/nuser/getissue',TokenValidation,getissue);
router.delete('/api/nuser/deleteissue',TokenValidation,deleteissue);
router.get('/api/cuser/issue/:id',TokenValidation,getsingleissue);

//counter routes
router.post('/api/cuser/getcounterissues',TokenValidation,getcounterissues);

router.put('/api/cuser/issuecalled/:id',TokenValidation,issuecalled);
router.put('/api/cuser/nextissuecalled/:id',TokenValidation,nextissuecalled);
router.put('/api/cuser/issuedone/:id',TokenValidation,issuedone);
router.put('/api/cuser/getnextissue/:id',TokenValidation,getnextissue);
router.put('/api/cuser/counterclose',TokenValidation,counterclose);


export default router;            
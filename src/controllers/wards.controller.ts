import Parent from '../models/parents.model'
import Stakeholder from '../models/stakeholders'
import { Request, Response } from 'express'


export const getWards = async(req:Request, res: Response) => {
    try{
        const ward = await Parent.find()
        console.log(ward)
        res.status(200).json({ message: 'successful', ward })
        
    }
    catch(err:any){
        console.log(err)
        res.status(400).send(err.message)
    }
}

export const getAsingleWard = async(req:Request, res:Response) => {
    try{
        const ward = await Parent.findOne({userId:req.params.id});
        if (!ward) {
            throw new Error(`No user with id : ${req.params.id}`);
           }
        res.status(201).json({message:"successful", ward})
    }
    catch(err){
        console.log(err)
    res.status(400).send('Not Found')
    }
}

export const updateParentWard = async(req:Request, res:Response) =>{
    console.log('looool')
    try{
        const wards = await Parent.findOneAndUpdate({userId:req.params.id}, {
            $push: {
                ward: req.body
            }
        }, {new:true})
        res.status(200).json({ message: 'successful', wards })
    }
    catch (err: any) {
        console.log(err)
        res.status(400).send(err.message)
    }
    
}

// export const updateParentWard = async(req:Request, res:Response) =>{
//     try{
//         const ward = await Parent.findOneAndUpdate({userId:req.params.id, ward: {$elemMatch:{fullname:req.body.fullname}}}, {
//             $set:{"fullname":req.body.fullname}
//         }, {new:true, safe:true, upsert: true})

//         console.log(ward.fullname)
//         res.status(200).json({ message: 'successful', })
//     } 
//     catch(err:any){
//         console.log(err)
//         res.status(400).send(err.message)
//     }      
// }
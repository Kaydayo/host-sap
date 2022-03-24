import {Request, Response} from 'express'
import Teacher from '../models/teacher.model'

export const getAllTeacherSubject = async(req:Request, res:Response) => {
    try{
        const subject = await Teacher.find();
        res.status(201).json({message:"successful", subject})
    }
    catch(err){
        console.log(err)
        res.status(400).send('Not Found')
    
    }
}

export const getTeacherSubjects = async(req:Request, res:Response) => {
    try{
        const subject = await Teacher.findOne({userId:req.params.id});
        if (!subject) {
            throw new Error(`No user with id : ${req.params.id}`);
           }
        res.status(201).json({message:"successful", subject})
    }
    catch(err){
        console.log(err)
    res.status(400).send('Not Found')
    }
}

export const updateTeacherSubjects = async(req:Request, res:Response) =>{
    try{
        const subject = await Teacher.findOneAndUpdate({userId:req.params.id}, {
            $push: {
                subjects: req.body.subjects
            }
        }, {new:true})
        
        res.status(200).json({ message: 'successful', subject })
    }
    catch (err: any) {
        console.log(err)
        res.status(400).send(err.message)
    }
    
}


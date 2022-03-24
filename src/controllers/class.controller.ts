import Class from '../models/teacher.model'
import {Request, Response} from 'express'

export const getAllClasses = async(req:Request, res:Response) =>{
    try{
        const data = await Class.find()
    res.status(200).json({ message: 'successful', data})
    } catch (err) {
        console.log(err)
        res.status(400).send('Not Found')
    }    
}

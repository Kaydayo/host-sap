import Stakeholder from '../models/stakeholders';
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import Student from '../models/students.model'
import Teacher from '../models/teacher.model'
import Parent from '../models/parents.model'
import bcrypt from 'bcryptjs'

const generateToken = (userId: string, email:string) => {
    const token = jwt.sign({email}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token;
}
export const register = async (req:Request, res:Response) => {
    try{
     const userAlreadyExists = await Stakeholder.findOne({ email: req.body.email })
    if (userAlreadyExists) {
    return res.status(403).json({message:'Email already exists'});
    }
    const newData = {...req.body}
    const stakeholder = await Stakeholder.create({...newData})
    console.log(stakeholder)
    const token = generateToken(stakeholder._id, newData.email);

    if(stakeholder.user === 'student'){
        await Student.create({ fullname: `${req.body.firstname} ${req.body.middlename} ${req.body.lastname}`, userId: stakeholder._id, subjects: [], class: "", parentEmail:"", parentName:""})
    }
    else if(stakeholder.user === 'teacher'){
        await Teacher.create({fullname: `${req.body.firstname} ${req.body.middlename} ${req.body.lastname}`, email:req.body.email, phoneNo: req.body.phoneNo, address:req.body.address, gender: req.body.gender, userId: stakeholder._id, subjects: [], class: [] })
    }
    else if (stakeholder.user === 'parent'){
        await Parent.create({ fullname: `${req.body.firstname} ${req.body.middlename} ${req.body.lastname}`, userId: stakeholder._id, ward:[]})
    }

    stakeholder.password = undefined;
    res.status(200).json({ message: 'signup successful', stakeholder, token })
    } 
    catch (err) {
    console.log(err)
    res.status(400).send('invalid')
    }
}

export const deleteUser = async (req: Request, res: Response) => {
   
    const user = await Stakeholder.findOneAndDelete({ _id: req.params.id});
   
    if (!user) {
     throw new Error(`No product with id : ${req.params.id}`)
    }
   
    await user.remove();
    res.status(200).json({ message: 'successfully deleted student' })
   };
 

export const login = async (req:Request, res:Response) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
        throw new Error('Please provide email and password');
        }
        const user = await Stakeholder.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({message:'Invalid login credentials'});  
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match){
            return res.status(400).json({
                message: 'invalid login credentials'
            })
        }

        const token = generateToken(user._id, user.email);
        user.password = undefined;
        res.status(201).json({
            status: 'login successful',
            data: {user, token}
        })

    }
    catch (err){
        console.log(err)
    res.status(400).send('invalid')
    }
}


export const logout = async (req:Request, res:Response) => {
    try{
        res.cookie('token', 'logout', {
         httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
        res.status(200).json({ msg: 'user logged out!' })
    } 
    catch(err){
    console.log(err)
    res.status(400).send('user not recorded')
    }
}


//update user's admin status



// export const updateUserAuth = async(req:Request, res:Response) =>{
//     try{
//         const subject = await Stakeholder.findOneAndUpdate({_id: req.params.id}, {$set: {admin: req.body}}, {upsert:true})
//         res.status(200).json({ message: 'successful', subject })
//     }
//     catch (err: any) {
//         console.log(err)
//         res.status(400).send(err.message)
//     }
    
// }
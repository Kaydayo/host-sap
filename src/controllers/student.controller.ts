import Stakeholder from '../models/stakeholders';
import { Request, Response } from 'express'


//GET all students
export const getAllStudents = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const students = await Stakeholder.find({user:'student'});
  res.status(200).json({ message: 'successful', students })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


//GET A Student
export const getSingleStudent = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const student = await Stakeholder.findOne({ _id: req.params.id }).select('-password');
  if (!student) {
   throw new Error(`No user with id : ${req.params.id}`);
  }

  console.log(student)
  res.status(200).json({ message: 'successful', student })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


export const createStudent = async(req:Request, res:Response) =>{
    try{

        const studentL = await Stakeholder.find({user:'student'}).sort({_id:-1}).limit(1);
        let generateId;
        if(studentL.length === 0){
            generateId = 'stf-1';
        }
        else{
            generateId = `stf-${parseInt(studentL[0].generateId.split('-')[1]) + 1}`
        }
        const newData = {generateId, ...req.body}
        const student = await Stakeholder.create({...newData})


        

        res.status(200).json({ message: 'successful', student })
 } catch (err) {
  console.log(err)
  res.status(400).send('invalid')
 }
}



export const updateStudent = async (req: Request, res: Response) => {
 const id = req.params.id
 console.log(id)
 try {
  const students = await Stakeholder.findOneAndUpdate({_id: id}, req.body, {new:true})
  res.status(200).json({ message: 'successful', students })
 } catch (err: any) {
  console.log(err)
  res.status(400).send(err.message)
 }
}

export const deleteStudent = async (req: Request, res: Response) => {
 const { id } = req.params;

 const student = await Stakeholder.findOneAndDelete({ _id: req.params.id});

 if (!student) {
  throw new Error(`No product with id : ${req.params.id}`)
 }

 await student.remove();
 res.status(200).json({ message: 'successfully deleted student' })
};


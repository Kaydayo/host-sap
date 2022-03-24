import Stakeholder from '../models/stakeholders';
import Parent from '../models/parents.model'
import { Request, Response } from 'express'


//GET all parents
export const getAllParents = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const parents = await Stakeholder.find({user:'parent'});
  res.status(200).json({ message: 'successful', parents })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


//GET A parent
export const getSingleParent = async (req: Request, res: Response) => {
 console.log('its working')
 try {
  const parent = await Stakeholder.findOne({ _id: req.params.id }).select('-password');
  if (!parent) {
   throw new Error(`No user with id : ${req.params.id}`);
  }

  console.log(parent)
  res.status(200).json({ message: 'successful', parent })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}


export const createParent = async(req:Request, res:Response) =>{
    try{

        const parentL = await Stakeholder.find({user:'parent'}).sort({_id:-1}).limit(1);
        let generateId;
        if(parentL.length === 0){
            generateId = 'pat-1';
        }
        else{
            generateId = `pat-${parseInt(parentL[0].generateId.split('-')[1]) + 1}`
        }
        const newData = {generateId, ...req.body}
        const parent = await Stakeholder.create({...newData, DOB: new Date(req.body.DOB)})
        res.status(200).json({ message: 'successful', parent })
 } catch (err) {
  console.log(err)
  res.status(400).send('invalid')
 }
}



export const updateParent = async (req: Request, res: Response) => {
 try {
  const parents = await Stakeholder.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
  res.status(200).json({ message: 'successful', parents })
 } catch (err: any) {
  console.log(err)
  res.status(400).send(err.message)
 }
}



export const deleteParent = async (req: Request, res: Response) => {

 const parent = await Stakeholder.findOneAndDelete({ _id: req.params.id});

 if (!parent) {
  throw new Error(`No product with id : ${req.params.id}`)
 }

 await parent.remove();
 res.status(200).json({ message: 'successfully deleted parent' })
};


import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare module "express-serve-static-core" {
 interface Request {
  user?: string | JwtPayload;
 }
}

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
 const token =
  req.body.token || req.cookies['x-access-token'] || req.query.token || req.headers["x-access-token"];

 if (!token) {
  return res.status(403).send("You are not logged in");
 }
 try {
  const decoded = jwt.verify(token, config.TOKEN_KEY as string);
  req.user = decoded;
 } catch (err) {
  return res.status(401).send("Invalid Token");
 }
 return next();
};

export default verifyToken;
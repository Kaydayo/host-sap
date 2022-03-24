import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import connectDB from './db/connect'
import studentsRouter from './routes/students'
import teachersRouter from './routes/teachers'
import parentsRouter from './routes/parents'
import authRouter from './routes/authRoutes'
import classesRouter from './routes/classes'
import subjectsRouter from './routes/subjects'
import teacherSubjectRouter from './routes/teacherSubject'
import wardsRouter from './routes/wards'
import dotenv from 'dotenv'
import cors from 'cors'

var app = express();
dotenv.config()


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentsRouter)
app.use('/teacher', teachersRouter)
app.use('/parent', parentsRouter)
app.use('/classes', classesRouter)
app.use('/subjectReg', subjectsRouter)
app.use('/ward', wardsRouter)
app.use('/teacherSubject', teacherSubjectRouter)
app.use('/', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const start = async () => {
  try {
    await connectDB('mongodb+srv://project:project@cluster0.le2cx.mongodb.net/schoolmgt?retryWrites=true&w=majority');
    console.log('Connecected to DB')
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;

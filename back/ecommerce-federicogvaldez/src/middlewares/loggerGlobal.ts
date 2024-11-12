import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  console.log(
    `Estas ejecutando la ruta ${req.url} con el metodo ${req.method} a las ${date.getHours()}:${date.getMinutes()} el dia ${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  );
  next();
}

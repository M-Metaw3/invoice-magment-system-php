// IController.ts
const { Request, Response } =require ('express');
import { IService } from './IService';

// define the interface for the controller methods
export interface IController {
  get(req: Request, res: Response): Promise<void>;
  post(req: Request, res: Response): Promise<void>;
  put(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}

// define an abstract class for the controller constructor
export abstract class Controller implements IController {
  // define a protected property for the service instance
  protected service: IService;

  // define the constructor that takes a service instance as a parameter
  constructor(service: IService) {
    this.service = service;
  }

  // define the abstract methods for the controller class
  abstract get(req: Request, res: Response): Promise<void>;
  abstract post(req: Request, res: Response): Promise<void>;
  abstract put(req: Request, res: Response): Promise<void>;
  abstract delete(req: Request, res: Response): Promise<void>;
}

import {ConflictException} from "@nestjs/common";

export class ReferencedConflictException extends ConflictException{

  // Statuscode Conflict Exception 409
  statusCode: number = 409;
  message: string;

  constructor(message?: string) {
    super(message)
  }

  setStatus(statusCode: number){
    this.statusCode = statusCode;
  }

  getStatus(){
    return this.statusCode;
  }

  setMessage(message?: string){
    this.message = message;
  }

  getMessage(){
    return this.getMessage();
  }
}
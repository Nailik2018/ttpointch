import {ApiProperty} from '@nestjs/swagger';

export class ConflictExceptionResponse {

  @ApiProperty({example: 409})
  statusCode: number = 409;

  @ApiProperty({example: 'Der Eintrag ist bereits vorhanden!'})
  message: string

  @ApiProperty({example: 'Conflict'})
  error: string;

  constructor(message: string) {
    this.message = message;
  }
}
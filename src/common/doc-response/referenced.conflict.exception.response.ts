import {ApiProperty} from '@nestjs/swagger';

export class ReferencedConflicExceptionResponse{

  @ApiProperty({example: 409})
  statusCode: number;

  @ApiProperty({example: 'Der Eintrag konnte nicht gelöscht werden da dieser noch weiter verwendet wird!'})
  message: string

  @ApiProperty({example: 'Conflict'})
  error: string;
}
import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class CreateAssociationDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the association',
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'MTTV',
    description: 'Shortname of the association',
  })
  @IsNotEmpty()
  @IsString()
  shortName: string;

  @ApiProperty({
    example: 'Mittelländischer Tischtennis Verband',
    description: 'Fullname of the association',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

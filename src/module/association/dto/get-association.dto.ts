import {ApiProperty} from '@nestjs/swagger';

export class GetAssociationDto {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: "MTTV"})
  shortName: string;

  @ApiProperty({example: "Mittelländischer Tischtennis Verband"})
  fullName: string;
}
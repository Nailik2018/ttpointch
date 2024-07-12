import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Association {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortName: string;

  @Column()
  fullName: string;
}

import {Module} from '@nestjs/common';
import {AssociationService} from './association.service';
import {AssociationController} from './association.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Association} from './entities/association.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association])],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports: [AssociationService]
})
export class AssociationModule {}

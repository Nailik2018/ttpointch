import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAssociationDto} from './dto/create-association.dto';
import {UpdateAssociationDto} from './dto/update-association.dto';
import {AppCustomLogger} from '../../app.custom.logger';
import {InjectRepository} from '@nestjs/typeorm';
import {Association} from './entities/association.entity';
import {DeleteResult, Repository } from 'typeorm';
import {DeleteResponseOk} from '../../common/doc-response/delete.response';
import {ReferencedConflictException} from '../../common/custom-exception/referenced.conflict.exception';

@Injectable()
export class AssociationService {

  private readonly logger: AppCustomLogger = new AppCustomLogger(AssociationService.name);
  constructor(@InjectRepository(Association) private readonly associationRepository: Repository<Association>) {
  }

  async create(createAssociationDto: CreateAssociationDto): Promise<Association> {
    try {
      this.logger.log(`Create customer ID [post]`);
      return await this.associationRepository.save(createAssociationDto);
    } catch (error) {
      this.logger.error(`The association could not be created! [create] ${error.code}`);
      throw new BadRequestException(`The association could not be created!`);
    }
  }

  async findAll(): Promise<Association[]> {
    this.logger.log(`All associations [get]`);
    return await this.associationRepository.find();
  }

  async findOne(id: number): Promise<Association> {
    this.logger.log(`Find customer ID ${id} [get id]`);
    const entity: Association = await this.associationRepository.findOne({
      where: {
        id
      },
    });
    return entity;  }

  async update(id: number, updateAssociationDto: UpdateAssociationDto) {
    const existingCustomer: Association = await this.associationRepository.findOne({where: {id}});
    if (!existingCustomer) {
      this.logger.error(`The association with the ID ${id} could not be changed! [update]`);
      throw new BadRequestException(`The association with the ID ${id} could not be changed!`);
    }
    try {
      // Object.assign(existingCustomer, updateCustomerDto);
      const updatedCustomer = this.associationRepository.merge(existingCustomer, updateAssociationDto);
      this.logger.log(`Update association ID ${id} [put]`);
      return this.associationRepository.save(updatedCustomer);
    } catch (error) {
      this.logger.error(`The association with the ID ${id} could not be changed! [update] ${error.code}`);
      throw new BadRequestException(`The association with the ID ${id} could not be changed!`);
    }  }

  async remove(id: number): Promise<DeleteResponseOk> {
    try {
      const deleteResult: DeleteResult = await this.associationRepository.delete(id);
      if (deleteResult.affected !== 1) {
        throw new Error();
      }
      this.logger.log(`Delete customer ID ${id} [delete]`);
      return new DeleteResponseOk(`Der Kunde mit der ID ${id} wurde erfolgreich gelöscht!`);
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        this.logger.error(`The customer with the ID ${id} could not be deletet because it is still in use! [remove] ${error.code}`);
        throw new ReferencedConflictException(`Der Standort mit der ID ${id} konnte nicht gelöscht werden da dieser noch weiter verwendet wird!`);
      } else {
        this.logger.error(`The customer with the ID ${id} could not be deleted! [remove]`);
        throw new NotFoundException(`Der Kunde mit der ID ${id} konnte nicht gelöscht werden!`);
      }
    }
  }
}

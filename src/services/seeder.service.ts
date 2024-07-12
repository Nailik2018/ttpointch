import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {AppCustomLogger} from '../app.custom.logger';
import {AssociationService} from '../module/association/association.service';
import {Association} from '../module/association/entities/association.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {

  private readonly logger: AppCustomLogger = new AppCustomLogger(SeederService.name);

  constructor(
    private readonly associationService: AssociationService
  ) {
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.createAssociations();
  }

  private async createAssociations(): Promise<void> {
    const associations: Association[] = await this.associationService.findAll();
    if (associations.length !== 0) {
      return;
    }
    await this.associationService.create({
      id: 1,
      shortName: 'AGTT',
      fullName: "Association Genevoise de Tennis de Table"
    });
    await this.associationService.create({
      id: 2,
      shortName: 'ANJTT',
      fullName: "Association Neuchâteloise et Jurassienne de Tennis de"
    });
    await this.associationService.create({
      id: 3,
      shortName: 'ATTT',
      fullName: "Associazione Ticinese Tennis Tavolo"
    });
    await this.associationService.create({
      id: 4,
      shortName: 'AVVF',
      fullName: "Championnat Vaud Valais Fribourg"
    });
    await this.associationService.create({
      id: 5,
      shortName: 'STTV',
      fullName: "Schweizerischer Tischtennis Verband"
    });
    await this.associationService.create({
      id: 5,
      shortName: 'MTTV',
      fullName: "Mittelländischer Tischtennisverband"
    });
    await this.associationService.create({
      id: 6,
      shortName: 'NWTTV',
      fullName: "Nordwestschweizer Tischtennisverband"
    });
    await this.associationService.create({
      id: 7,
      shortName: 'OTTV',
      fullName: "Nordwestschweizer Tischtennisverband"
    });
    await this.associationService.create({
      id: 8,
      shortName: 'TTVI',
      fullName: "Tischtennisverband Innerschweiz"
    });
    await this.associationService.create({
      id: 9,
      shortName: 'STTV',
      fullName: "Schweizerischer Tischtennis Verband"
    });
  }
}

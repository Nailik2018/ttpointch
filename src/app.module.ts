import {Module} from '@nestjs/common';
import {AssociationModule} from './module/association/association.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SeederService} from './services/seeder.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,}),
      inject: [ConfigService],
    }),
    AssociationModule,
    AuthModule],
  controllers: [],
  providers: [SeederService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const option = {
      type               : this.configService.get('database.type'),
      url                : this.configService.get('database.url'),
      host               : this.configService.get('database.host'),
      port               : this.configService.get('database.port'),
      username           : this.configService.get('database.username'),
      password           : this.configService.get('database.password') as string,
      database           : this.configService.get('database.name'),
      synchronize        : this.configService.get('database.synchronize'),
      dropSchema         : false,
      keepConnectionAlive: true,
      useUTC             : true,
      logging            : this.configService.get('database.log') === 'true',
      entities           : [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations         : [__dirname + '/migrations/**/*{.ts,.js}'],
      cli                : {
        entitiesDir   : 'src/database/entities',
        migrationsDir : 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra              : {
        trustServerCertificate: true,
      },
      options            : {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
      },
    };

    return option;
  }
}

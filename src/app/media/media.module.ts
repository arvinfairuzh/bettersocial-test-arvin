import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MulterModule } from "@nestjs/platform-express";
import { MediaService } from "@src/app/media/media.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "@src/database/entities/media.entity";

@Module({
  imports    : [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register(),
    TypeOrmModule.forFeature([Media])
  ],
  controllers: [MediaController],
  providers  : [MediaService],
  exports    : [MediaService]
})
export class MediaModule {
}
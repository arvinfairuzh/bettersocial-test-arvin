import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "@src/database/entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediaService {
  constructor(
    private config: ConfigService,
    @InjectRepository(Media) private readonly mediaRepository: Repository<Media>
  ) {
  }

  async create(file: any) {
    if (!file) {
      throw new HttpException(
        {
          message   : "Upload File Failed",
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          data      : {
            file: "File cant be empty"
          }
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const media = this.mediaRepository.create({
      path    : file.path,
      mimeType: file.mimetype,
      size    : file.size,
      url     : `${this.config.get("DOMAIN")}/uploads/${file.filename}`
    });

    return await this.mediaRepository.save(media);
  }
}
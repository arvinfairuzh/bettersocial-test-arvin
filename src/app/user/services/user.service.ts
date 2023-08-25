import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "@src/app/user/dtos/register.dto";
import { User } from "@src/database/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { Media, MEDIA_STATUS } from "@src/database/entities/media.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async register(dto: RegisterDto) {
    return await this.dataSource.transaction(async (manage) => {
      const userEntity = this.userRepository.create({
        ...dto,
        password: btoa(dto.password)
      });

      if (dto.photoMediaId) {
        await manage.save(Media, {
          id    : dto.photoMediaId,
          status: MEDIA_STATUS.USED
        });
      }

      return await manage.save(userEntity);
    });
  }
}
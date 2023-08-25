import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@src/app/user/controllers/user.controller";
import { UserService } from "@src/app/user/services/user.service";
import { User } from "@src/database/entities/user.entity";

@Module({
  imports    : [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [
    UserController
  ],
  providers  : [
    UserService
  ],
  exports    : [UserService]
})
export class UserModule {

}
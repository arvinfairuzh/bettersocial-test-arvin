import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "@src/app/user/services/user.service";
import { BaseResponse } from "@src/core/base-response";
import { RegisterDto } from "@src/app/user/dtos/register.dto";
import { ApiTags } from "@nestjs/swagger";

// @UseGuards(AuthGuard("jwt"))
@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("User")
// @ApiBearerAuth("access-token")
// @UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(
    public service: UserService
  ) {
  }

  @Post("register")
  @HttpCode(HttpStatus.OK)
  public async register(
    @Body() registerDto: RegisterDto
  ) {
    const create = await this.service.register(registerDto);

    return new BaseResponse<any>(HttpStatus.OK, "Create User Success", create);
  }

}

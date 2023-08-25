import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Media } from "@src/database/entities/media.entity";
import { IsExist } from "@src/common/validators/is-exist.decorator";
import { IsNotExist } from "@src/common/validators/is-not-exist.decorator";
import { User } from "@src/database/entities/user.entity";


export class RegisterDto {

  @IsNotExist(User, "username")
  @Length(1, 60)
  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @Length(1, 60)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsExist(Media, "id")
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional()
  photoMediaId: string;
}
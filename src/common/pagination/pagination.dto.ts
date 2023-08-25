import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto implements IPaginationOptions {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  sort?: string;

  @IsIn(["asc", "desc"])
  @IsOptional()
  sortBy?: "asc" | "desc";

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional()
  limit: string;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional()
  page: string;
}
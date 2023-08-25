import { Controller, HttpCode, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 } from "uuid";
import { MediaService } from "@src/app/media/media.service";
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Media")
@Controller("media")
export class MediaController {
  constructor(
    private readonly mediaService: MediaService
  ) {
  }

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type      : "object",
      properties: {
        file: {
          type  : "string",
          format: "binary"
        }
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file", {
    fileFilter: (request, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return callback(
          new HttpException(
            {
              message   : "Upload File Failed",
              statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
              errors    : {
                file: `file must be image`
              }
            },
            HttpStatus.UNPROCESSABLE_ENTITY
          ),
          false
        );
      }

      callback(null, true);
    },
    storage   : diskStorage({
      destination: "./uploads",
      filename   : (request, file, callback) => {
        callback(
          null,
          // @ts-ignore
          `${v4()}.${file.originalname
            .split(".")
            .pop()
            .toLowerCase()}`
        );
      }
    }),
    limits    : {
      fileSize: 5242880 //5mb
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.mediaService.create(file);

    return {
      statusCode: HttpStatus.OK,
      message   : "Upload File Success",
      data      : data
    };
  }
}
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";
import validationConfig from "@src/config/validation.config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const options = new DocumentBuilder()
    .setTitle("Better Social")
    .setDescription("API docs")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type        : "http",
        scheme      : "Bearer",
        bearerFormat: "Bearer",
        name        : "Authorization",
        description : "Enter JWT token",
        in          : "Header"
      },
      "access-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(configService.get("app.port"));
  console.log(`${configService.get("app.name")} started at port : ${configService.get("app.port")}`);

}

void bootstrap();

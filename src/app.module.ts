import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { join } from "path";

import databaseConfig from "@src/config/database.config";
import appConfig from "@src/config/app.config";
import authConfig from "@src/config/auth.config";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource } from "typeorm";
import { UserModule } from "@src/app/user/user.module";
import { LoggerMiddleware } from "@src/common/middlewares/logger.middleware";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseInterceptor } from "@src/common/interceptors/response.interceptor";
import { MediaModule } from "@src/app/media/media.module";

@Module({
  imports    : [
    ServeStaticModule.forRoot({
      serveRoot: "/public/",
      rootPath : join(__dirname, "..", "public"),
      exclude  : ["/api/(.*)"]
    }),
    ConfigModule.forRoot({
      isGlobal   : true,
      load       : [
        databaseConfig,
        authConfig,
        appConfig
      ],
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync({
      useClass         : TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
    UserModule,
    MediaModule
  ],
  controllers: [],
  providers  : [
    {
      provide : APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}

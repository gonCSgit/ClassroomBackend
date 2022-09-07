import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppConfigurationModule } from './app-config.module';
import { AppConfigurationService } from './app-config.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    UsersModule,
    ClassesModule,
    AppConfigurationModule,
    // To give this module the database’s connection string,
    // you have to get it from the .env file and the only way to do it
    // is by using the AppConfigurationService.
    // Therefore you need to inject it inside the MongooseModule so you can
    // configure the MongooseModuleOptions to use the right connection string.
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

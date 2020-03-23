import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TestModule} from './test/test.module';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [
        TypeOrmModule.forRoot(
        ),
        TestModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

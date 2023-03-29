import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { LoggedInGuard } from './logged-in.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { RedisClient } from 'redis';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, UsersModule, RedisModule, FilesModule],
  controllers: [],
  providers: [LocalAuthGuard, LoggedInGuard],
})
export class AppModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: 'ivu0q4ec3m',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 6000000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

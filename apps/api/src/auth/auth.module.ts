import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthStrategy } from "./auth.strategy";
import { UsersModule } from '../users/users.module';
import { AuthSerializer } from './auth.serializer';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, AuthSerializer],
  exports: [AuthService, AuthStrategy]
})
export class AuthModule {
}

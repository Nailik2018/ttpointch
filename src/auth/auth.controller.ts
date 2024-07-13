import { Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import {AuthService} from './auth.service';
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }
  @HttpCode(HttpStatus.OK)
  @Get('login/:username/:password')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'username', required: true, description: 'The username of the user' })
  @ApiParam({ name: 'password', required: true, description: 'The password of the user' })
  signIn(@Param('username') username: string, @Param('password') password: string) {
    return this.authService.signIn(username, password);
  }
}

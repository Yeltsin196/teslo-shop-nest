import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/users.entity';
import { Auth, RawHeaders } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';
import { META_ROLES, RoleProtrected } from './decorators/role-protrected/role-protrected.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check authentication status and renew token' })
  @ApiResponse({ status: 200, description: 'Returns user with new token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Test private route' })
  @ApiResponse({ status: 200, description: 'Returns user info and headers' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  testPrivateRoute(
    @Req() req: Request,
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hello World',
      user,
      email,
      rawHeaders,
      headers,
    };
  }

  @Get('private2')
  @RoleProtrected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Test private route with role protection (admin/superUser)' })
  @ApiResponse({ status: 200, description: 'Returns user info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient role' })
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hello World - Private',
      user,
    };
  }

  @Get('private3')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Test private route with Auth decorator' })
  @ApiResponse({ status: 200, description: 'Returns user info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'Hello World - Private',
      user,
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Execute database seed' })
  @ApiResponse({ status: 200, description: 'Seed executed successfully' })
  //@Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserInfoType } from 'src/user/vo/login-user.vo';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post('create')
  @RequireLogin()
  async createWork(
    @Body() createWorkDto: CreateWorkDto,
    @UserInfo() userInfo: UserInfoType,
  ) {
    return await this.workService.createWork(createWorkDto, userInfo);
  }
}

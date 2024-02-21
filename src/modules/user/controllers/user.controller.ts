import { Response as Res } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Response,
  Header,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dto';
import { IdParams } from 'src/shared/dto/id-params.dto';
import { AuthRole } from 'src/shared/decorators/authRole.decorator';
import { Roles } from 'src/shared/enums';
import { GetUser } from 'src/shared/decorators';
import { UserGeneric } from 'src/shared/interfaces';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @AuthRole(Roles.TEACHER)
  @Header('access-control-expose-headers', '*')
  @Get()
  async findAll(
    @Query() queryDto: QueryUserDto,
    @Response({ passthrough: true }) res: Res,
  ) {
    const [users, total] = await this.userService.findAll(queryDto);
    res.set({ 'X-Total-Count': total });
    return users;
  }

  @AuthRole(Roles.TEACHER, Roles.STUDENT)
  @Get('/profile')
  getProfile(@GetUser() user: UserGeneric) {
    return this.userService.findOne(+user.sub);
  }

  @Put('/profile')
  @AuthRole(Roles.TEACHER, Roles.STUDENT)
  updateProfile(
    @GetUser() user: UserGeneric,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+user.sub, updateUserDto);
  }

  @AuthRole(Roles.TEACHER)
  @Get(':id')
  findOne(@Param() params: IdParams) {
    return this.userService.findOne(+params.id);
  }

  @AuthRole(Roles.TEACHER)
  @Put(':id')
  update(@Param() params: IdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+params.id, updateUserDto);
  }

  @AuthRole(Roles.TEACHER)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: IdParams) {
    return this.userService.remove(+params.id);
  }
}

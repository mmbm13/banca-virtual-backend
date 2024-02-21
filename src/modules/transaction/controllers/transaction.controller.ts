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
  UseInterceptors,
  Header,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto, QueryTransactionDto } from '../dto';
import { IdParams } from 'src/shared/dto/id-params.dto';
import { AuthRole, GetUser } from 'src/shared/decorators';
import { UserGeneric } from 'src/shared/interfaces';
import { FilterStudentInterceptor } from '../interceptors';
import { Roles } from 'src/shared/enums';
import { Status } from '../enums';

@Controller({ path: 'transactions', version: '1' })
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @AuthRole(Roles.TEACHER)
  create(
    @Body() createUserDto: CreateTransactionDto,
    @GetUser() user: UserGeneric,
  ) {
    return this.transactionService.create(user, createUserDto);
  }

  @Header('access-control-expose-headers', '*')
  @Get()
  @AuthRole(Roles.TEACHER, Roles.STUDENT)
  @UseInterceptors(FilterStudentInterceptor)
  async findAll(
    @Query() query: QueryTransactionDto,
    @Response({ passthrough: true }) res: Res,
  ) {
    const [transactions, total] = await this.transactionService.findAll(query);
    res.set({ 'X-Total-Count': total });
    return transactions;
  }

  @Header('access-control-expose-headers', '*')
  @Get('/pending')
  @AuthRole(Roles.STUDENT)
  @UseInterceptors(FilterStudentInterceptor)
  async findAllPending(
    @Query() query: QueryTransactionDto,
    @Response({ passthrough: true }) res: Res,
  ) {
    query.status = Status.PENDING;
    const [transactions, total] = await this.transactionService.findAll(query);
    res.set({ 'X-Total-Count': total });
    return transactions;
  }

  @Get(':id')
  @AuthRole(Roles.STUDENT, Roles.TEACHER)
  findOne(@Param() params: IdParams, @GetUser() user: UserGeneric) {
    return this.transactionService.findOne(+params.id, user);
  }

  @Get(':id/claim')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param() params: IdParams, @GetUser() user: UserGeneric) {
    return this.transactionService.claim(+params.id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: IdParams) {
    return this.transactionService.remove(+params.id);
  }
}

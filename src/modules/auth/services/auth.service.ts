import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto';
import { UserService } from 'src/modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'src/shared/utils';
import { IdentificationType } from 'src/shared/enums';
import { User } from 'src/modules/user/schemas';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(signInDto: SignInDto) {
    let user: User;

    if (signInDto.type === IdentificationType.EMAIL) {
      user = await this.userService.findByEmail(signInDto.email);
    } else if (signInDto.type === IdentificationType.TI) {
      user = await this.userService.findByIdentification(
        signInDto.identification,
      );
    }
    if (user?.password !== hash(signInDto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: await this.jwtService.signAsync(payload),
    };
  }
}

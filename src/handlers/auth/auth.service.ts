import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../../models/user.model';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, AuthDto } from '../../utils/data/dtos/auth.dto';
import { IRegisterUserResponseObject } from 'src/utils/data/responseObjects/auth.responseObjects';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private generateUuid(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  async registerUser(
    registerDto: RegisterDto,
  ): Promise<IRegisterUserResponseObject> {
    const { email, password, country_code, date_of_birth, name } = registerDto;

    const hashedPassword = this.hashPassword(password);

    const user = new this.userModel({
      email: email,
      password: hashedPassword,
      country_code: country_code,
      date_of_birth: date_of_birth,
      name: name,
    });

    await user.save();

    const accessToken: string = this.jwtService.sign({ userId: user._id });
    return { accessToken };
  }

  async loginUser(authDto: AuthDto): Promise<IRegisterUserResponseObject> {
    const { email, password } = authDto;

    const user = await this.userModel.findOne({ email });
    const hashedPassword = this.hashPassword(password);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (hashedPassword !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken: string = this.jwtService.sign({ userId: user._id });

    return { accessToken };
  }
}

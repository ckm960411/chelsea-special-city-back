import { CustomRepository } from 'src/typeorm/typeorm-ex.decarator';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User, UserStatus } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signUpDto: SignUpDto) {
    const { username, password, userStatus } = signUpDto;
    const user = this.create({
      username,
      password,
      userStatus: userStatus ?? UserStatus.PUBLIC,
    });

    await this.save(user);
  }
}

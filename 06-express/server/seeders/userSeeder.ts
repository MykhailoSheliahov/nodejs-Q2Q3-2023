import { EntityManager } from '@mikro-orm/postgresql';

import { DI } from '../app';
import { User as userType } from '../types';
import { User } from '../entities/User';

export class UserSeeder {
  static populateDB(data: userType) {
    DI.userRepository.create({ ...data });
  }

  static async seed(em: EntityManager) {
    em.create(
      User,
      {
        first_name: 'Admin',
        last_name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'owner',
      },
      { persist: true },
    );

    em.create(
      User,
      {
        first_name: 'Sara',
        last_name: 'Conor',
        email: 'saraconor@gmail.com',
        password: 'saraconor',
        role: 'owner',
      },
      { persist: true },
    );

    em.create(
      User,
      {
        first_name: 'Toni',
        last_name: 'Stark',
        email: 'tonistark@gmail.com',
        password: 'tonistark',
        role: 'reader',
      },
      { persist: true },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UnitOfWorkService {
  constructor(private readonly dataSource: DataSource) { }

  async executeInTransaction<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
    return await this.dataSource.transaction(operation);
  }
}

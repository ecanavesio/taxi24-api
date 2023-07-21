import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class DatabaseManager {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async transactional<T>(fn: (transactionalManager: TransactionalManager) => Promise<T>): Promise<T> {
    return this.manager.transaction((transactionManager: EntityManager) => {
      const transactionalManager = new TransactionalManagerImp(transactionManager);
      return fn(transactionalManager);
    });
  }
}

class TransactionalManagerImp implements TransactionalManager {
  constructor(private readonly manager: EntityManager) {}

  getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
    return this.manager.getRepository(entity);
  }
}

export interface TransactionalManager {
  getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity>;
}

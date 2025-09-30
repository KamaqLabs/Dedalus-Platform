import {IBaseRepository} from "../../../../domain/repositories/i-base-repository";
import { EntityManager, Repository } from 'typeorm';

export abstract class BaseRepository<TEntity> implements IBaseRepository<TEntity> {
    protected constructor(
        protected readonly ormRepo: Repository<TEntity>
    ) { }
    async addAsync(entity: TEntity, manager?: EntityManager): Promise<TEntity> {
        const repo = manager ? manager.getRepository(this.ormRepo.target) : this.ormRepo;
        const createdEntity = repo.create(entity);
        await repo.save(createdEntity);
        return createdEntity;
    }

    async deleteAsync(entity: TEntity): Promise<void> {
        await this.ormRepo.remove(entity);
    }

    async findByIdAsync(id: number): Promise<TEntity | null> {
        return await this.ormRepo.findOne({
            where: { id } as any,
            select: undefined
        });
    }

    async updateAsync(entity: TEntity, manager?: EntityManager): Promise<TEntity> {
        const repo = manager ? manager.getRepository(this.ormRepo.target) : this.ormRepo;
        const entityToUpdate = await repo.preload(entity);
        if (!entityToUpdate) throw new Error("Entity not found");

        return await this.ormRepo.save(entityToUpdate);

    }

    async findAllAsync(): Promise<TEntity[]> {
        return await this.ormRepo.find();
    }


}
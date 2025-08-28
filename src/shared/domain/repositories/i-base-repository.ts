export interface IBaseRepository<TEntity> {
    addAsync(entity: TEntity): Promise<TEntity>;
    updateAsync(entity: TEntity): Promise<TEntity>;
    deleteAsync(entity: TEntity): Promise<void>;
    findByIdAsync(id: number): Promise<TEntity | null>;
}
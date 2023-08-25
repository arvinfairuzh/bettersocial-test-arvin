import { DataSource, EntityTarget, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { PaginationDto } from "@src/common/pagination/pagination.dto";
import { PaginationEnum } from "@src/common/pagination/pagination.enum";

export class BaseRepository<Entity> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async list(paginationDto: PaginationDto, query: FindOptionsWhere<Entity> | FindManyOptions<Entity>): Promise<Pagination<Entity>> {
    const paginationOption: IPaginationOptions = {
      page : paginationDto.page ? paginationDto.page : PaginationEnum.PAGE,
      limit: paginationDto.limit ? paginationDto.limit : PaginationEnum.LIMIT
    };

    const sortBy = paginationDto.sortBy ? paginationDto.sortBy : PaginationEnum.SORT_BY;
    const sort = paginationDto.sort ? paginationDto.sort : PaginationEnum.SORT;
    let order = {};
    order[sortBy] = sort;

    return await paginate<Entity>(this, paginationOption, query);
  }

  async baseCreate(dto): Promise<Entity> {
    const data = this.create(dto);

    return await this.save<Entity>(data) as Entity;
  }

  async baseUpdate(entity: Entity, dto: any): Promise<Entity> {

    return this.save({
      ...entity,
      ...dto
    });
  }
}
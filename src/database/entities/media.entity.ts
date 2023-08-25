import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, UpdateDateColumn } from "typeorm";
import { CoreEntity } from "@src/common/entity/core.entity";
import { User } from "@src/database/entities/user.entity";

export enum MEDIA_STATUS {
  UNUSED = "unused",
  USED   = "used",
}

@Index("PK_media_id", ["id"], { unique: true })
@Entity("media")
export class Media extends CoreEntity {
  @Column("varchar", { length: 100 })
  mimeType: string;

  @Column("float8")
  size: number;

  @Column("varchar")
  url: string;

  @Column("varchar")
  path: string;

  @Column("varchar", { length: 50, default: MEDIA_STATUS.UNUSED })
  status: MEDIA_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => User, (entity) => entity.photoMedia)
  users: User[];
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { CoreEntity } from "@src/common/entity/core.entity";
import { Media } from "@src/database/entities/media.entity";

export enum USER_STATUS {
  ACTIVE   = "active",
  INACTIVE = "inactive",
}

@Index("PK_user_id", ["id"], { unique: true })
@Index("IDX_user_username", ["username"], { unique: true })
@Entity("user")
export class User extends CoreEntity {
  @Column("varchar", { length: 60 })
  username: string;

  @Column("varchar")
  fullName: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  phoneNumber: string;

  @Column("varchar", { length: 60 })
  password: string;

  @Column("uuid", { nullable: true })
  photoMediaId: string;

  @Column("varchar", { length: 50, default: USER_STATUS.ACTIVE })
  status: USER_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Media, (entity) => entity.users, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL"
  })
  @JoinColumn([{ name: "photoMediaId", referencedColumnName: "id" }])
  photoMedia: Media;

}

import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";


export class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
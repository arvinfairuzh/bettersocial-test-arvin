import { Raw } from "typeorm";
import { FindOperator } from "typeorm/find-options/FindOperator";

export function whereLikeHelper(data: string): FindOperator<any> {
  return Raw(alias => `LOWER(${alias}) Like '%${data.toLowerCase()}%'`);
}
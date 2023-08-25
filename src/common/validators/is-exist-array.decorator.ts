import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { In } from "typeorm";

@ValidatorConstraint({ async: true })
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor() {
  }

  async validate(value: any, args: ValidationArguments) {
    const [entity, columnName] = args.constraints;
    const find = await entity.find({
      where: {
        [columnName]: In(value)
      }
    });
    return find.length === value.length;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityName, columnName] = args.constraints;
    return `One of ${args.property} ${columnName} Not Found`;
  }
}

export function IsExistArray(entity: EntityClassOrSchema, columnName: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {

    registerDecorator({
      target      : object.constructor,
      async       : true,
      propertyName: propertyName,
      options     : validationOptions,
      constraints : [entity, columnName],
      validator   : IsExistConstraint
    });
  };
}
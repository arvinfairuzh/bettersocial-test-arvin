import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@ValidatorConstraint({ async: true })
export class IsNotExistConstraint implements ValidatorConstraintInterface {
  constructor() {
  }

  async validate(value: any, args: ValidationArguments) {
    const [entity, columnName] = args.constraints;
    const find = await entity.findOne({
      where: {
        [columnName]: value
      }
    });

    return find === null;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityName, columnName] = args.constraints;
    return `${columnName} already exist`;
  }
}

export function IsNotExist(entity: EntityClassOrSchema, columnName: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {

    registerDecorator({
      target      : object.constructor,
      async       : true,
      propertyName: propertyName,
      options     : validationOptions,
      constraints : [entity, columnName],
      validator   : IsNotExistConstraint
    });
  };
}
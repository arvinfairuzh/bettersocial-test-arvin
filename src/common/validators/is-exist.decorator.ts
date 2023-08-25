import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@ValidatorConstraint({ async: true })
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor() {
  }

  async validate(value: any, args: ValidationArguments) {
    const [entity, columnName] = args.constraints;
    const find = await entity.findOne({
      where: {
        [columnName]: value
      }
    });
    return !!find;
  }

  defaultMessage(args: ValidationArguments) {
    const [entityName] = args.constraints;
    return `${entityName} Not Found`;
  }
}

export function IsExist(entity: EntityClassOrSchema, columnName: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    // const repository = InjectRepository(entity).name;
    //
    // console.log(repository);

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
import { HttpException, HttpStatus, ValidationPipeOptions } from "@nestjs/common";
import { ValidationError } from "class-validator";

function mapChildren(errors: ValidationError[]) {
  let res: any = {};

  errors.forEach((e, index) => {
    if (e.children && e.children.length > 0) {
      res[e.property] = mapChildren(e.children);
    } else {
      res[e.property] = Object.values(e.constraints)[0];
    }
  });

  return res;
  
}

const validationConfig: ValidationPipeOptions = {
  transform          : true,
  whitelist          : true,
  stopAtFirstError   : true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory   : (errors: ValidationError[]) => {
    let res: any = {};


    errors.forEach((e, index) => {
      if (e.children && e.children.length > 0) {
        res[e.property] = {
          ...mapChildren(e.children)
        };
      } else {
        res[e.property] = Object.values(e.constraints)[0];
      }
    });

    return new HttpException(
      {
        status : HttpStatus.UNPROCESSABLE_ENTITY,
        message: "Validation Failed",
        data   : res
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
};

export default validationConfig;

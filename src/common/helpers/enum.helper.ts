export class EnumHelper {
  static getValue(enums: Array<Record<string, any>>, key: string) {
    let find = enums.findIndex((e) => {
      return e.key === key;
    });

    if (find !== -1) {
      return enums[find].value;
    } else {
      return null;
    }
  }
}
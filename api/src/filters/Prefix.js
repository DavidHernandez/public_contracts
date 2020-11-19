export default class Prefix {
  static toJson(field, value) {
    const json = {
      prefix: {
        [field]: value,
      }
    }
    return json
  }
}


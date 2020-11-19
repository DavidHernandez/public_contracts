export default class Terms {
  static toJson(field, value) {
    const values = value.split(' ')
    return { terms: { [field]: values } }
  }
}

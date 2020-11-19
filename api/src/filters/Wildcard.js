export default class Wildcard {
  static toJson(field, value) {
    return { term: { [field]: value } }
  }
}

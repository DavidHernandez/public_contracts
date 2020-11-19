export default class Term {
  static toJson(field, value) {
    return { term: { [field]: value } }
  }
}

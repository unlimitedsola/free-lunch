module.exports = class Discount {
  constructor (pre, discount) {
    this.pre = pre
    this.discount = discount
  }

  toString () { return `${this.pre}-${this.discount}`}
}

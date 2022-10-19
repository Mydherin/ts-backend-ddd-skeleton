export default abstract class ValueObject<E> {
  value: E
  constructor (value: E) {
    this.isValid(value)
    this.value = value
  }

  protected abstract isValid (value: E): void
}

import InvalidUuidError from './errors/InvalidUuidError'
import StringValueObject from './StringValueObject'

export default class Uuid extends StringValueObject {
  protected isValid (value: string): void {
    // Define regex for uuid
    const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    if (!regex.test(value)) {
      throw new InvalidUuidError(`The uuid <${value}> is not a valid uuid.`)
    }
  }
}

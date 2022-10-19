import InvalidUsernamedError from './errors/InvalidUsernameError'
import StringValueObject from './StringValueObject'

export default class Username extends StringValueObject {
  protected isValid (value: string): void {
    // Define regex for username
    const regex = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/

    if (!regex.test(value)) {
      throw new InvalidUsernamedError(`The username <${value}> is not a valid username.`)
    }
  }
}

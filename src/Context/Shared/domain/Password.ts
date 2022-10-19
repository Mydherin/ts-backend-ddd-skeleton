import InvalidPasswordError from './errors/InvalidPasswordError'
import StringValueObject from './StringValueObject'

export default class Password extends StringValueObject {
  protected isValid (value: string): void {
    // Define regex for password
    /// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regex.test(value)) {
      throw new InvalidPasswordError(`The password <${value}> is not a valid password.`)
    }
  }
}

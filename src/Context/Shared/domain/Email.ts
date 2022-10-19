import InvalidEmailError from './errors/InvalidEmailError'
import StringValueObject from './StringValueObject'

export default class Email extends StringValueObject {
  protected isValid (email: string): void {
    // Define regex for email
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regex.test(email)) {
      throw new InvalidEmailError(`The email <${email}> is not a valid email.`)
    }
  }
}

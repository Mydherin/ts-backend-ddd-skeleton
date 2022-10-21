import UserRequest from './UserRequest'
import UserEmail from './value-objects/UserEmail'
import UserName from './value-objects/UserName'
import UserPassword from './value-objects/UserPassword'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserRequestFactory {
  static create ({ name, password, email }: { name: string, password: string, email: string }): UserRequest {
    return {
      name: new UserName(name),
      password: new UserPassword(password),
      email: new UserEmail(email)
    }
  }
}

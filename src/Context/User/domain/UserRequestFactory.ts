import User from './User'
import UserEmail from './value-objects/UserEmail'
import UserId from './value-objects/UserId'
import UserName from './value-objects/UserName'
import UserPassword from './value-objects/UserPassword'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserRequestFactory {
  static create ({ id, name, password, email }: { id: string, name: string, password: string, email: string }): User {
    return new User({
      id: new UserId(id),
      name: new UserName(name),
      password: new UserPassword(password),
      email: new UserEmail(email)
    })
  }
}

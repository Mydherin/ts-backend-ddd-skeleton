import Aggregate from '../../Shared/domain/Aggregate'
import UserRequest from './UserRequest'
import UserEmail from './value-objects/UserEmail'
import UserId from './value-objects/UserId'
import UserName from './value-objects/UserName'
import UserPassword from './value-objects/UserPassword'

export default class User implements Aggregate {
  readonly id: UserId
  readonly name: UserName
  readonly password: UserPassword
  readonly email: UserEmail

  constructor (request: UserRequest) {
    this.id = request.id
    this.name = request.name
    this.password = request.password
    this.email = request.email
  }

  toPrimitives (): Object {
    return {
      id: this.id.value,
      name: this.name.value,
      password: this.password.value,
      email: this.email.value
    }
  }
}

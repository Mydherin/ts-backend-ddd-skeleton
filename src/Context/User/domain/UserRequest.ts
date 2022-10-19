import UserEmail from './value-objects/UserEmail'
import UserId from './value-objects/UserId'
import UserName from './value-objects/UserName'
import UserPassword from './value-objects/UserPassword'

export default interface UserRequest {
  id: UserId
  name: UserName
  password: UserPassword
  email: UserEmail
}

import UserEmail from './value-objects/UserEmail'
import UserName from './value-objects/UserName'
import UserPassword from './value-objects/UserPassword'

export default interface UserRequest {
  name: UserName
  password: UserPassword
  email: UserEmail
}

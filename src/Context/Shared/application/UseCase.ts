export default interface UseCase<E> {
  run: (reqeust: E) => void
}

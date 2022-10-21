export default interface UseCase<E> {
  run: (request: E) => Promise<void>
}

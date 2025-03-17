export type Result<T, E> = Ok<T> | Err<E>;
export type Ok<T> = { _type: 'ok'; unwrap(): T };
export type Err<E> = { _type: 'err'; err: E };
export const Ok = <T>(value: T): Ok<T> => {
  return {
    _type: 'ok',
    unwrap() {
      return value;
    },
  };
};
export const Err = <E>(error: E): Err<E> => {
  return { _type: 'err', err: error };
};
export const Success = <T, E>(result: Result<T, E>): result is Ok<T> => {
  return result._type === 'ok';
};

export type AsyncResult<T, E> = Promise<Result<T, E>>;

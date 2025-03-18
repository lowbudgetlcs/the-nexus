import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitize(str: string): string;
export function sanitize(str: string | null): string | null;
export function sanitize(str: string | null): string | null {
  return str?.trim() ?? null;
}

// Defualt error message to users
export const unexpectedError: string = 'An unexpected error has occured.';

// Result Type
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

// Parsing multi.op.gg links

export const parseMulti = (url: string | null): Array<string> => {
  if (url === null) return [];
  const [_, queryString] = url.split('?');
  const params = new URLSearchParams(queryString);
  const summonersParam = params.get('summoners');
  if (summonersParam) {
    return summonersParam.split(',');
  }
  return [];
}

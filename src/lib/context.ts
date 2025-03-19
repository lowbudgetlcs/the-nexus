import { getContext, setContext } from 'svelte';

export function setCtx<T>(key: string | symbol, service: T) {
  setContext(key, service);
  return service;
}

export function getCtx<T>(key: string | symbol): () => T {
  return () => getContext(key) as T;
}

export function defineCtx<T>(key: string | symbol = Symbol()): [() => T, (service: T) => T] {
  return [
    getCtx<T>(key),
    (service: T) => {
      return setCtx(key, service);
    },
  ];
}

export type Result<T> =
  | {
      type: 'success';
      data: T;
    }
  | {
      type: 'error';
      reason: string;
    };

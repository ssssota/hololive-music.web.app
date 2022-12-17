export const sequence = <T>(promises: (() => Promise<T>)[]): Promise<T[]> => {
  return promises.reduce<Promise<T[]>>(
    (accPromise, promise) =>
      accPromise.then((acc) => promise().then((cur) => [...acc, cur])),
    Promise.resolve([])
  );
};

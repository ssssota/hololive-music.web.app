export const shuffle = <T>(array: T[] | readonly T[]): T[] => {
  const result = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const target = Math.floor(Math.random() * i);
    const temp1 = result[i];
    const temp2 = result[target];
    if (temp1 === undefined || temp2 === undefined) continue;
    result[i] = temp2;
    result[target] = temp1;
  }
  return result;
};

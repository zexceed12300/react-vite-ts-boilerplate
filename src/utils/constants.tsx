// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  timeout = 300
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedProperty = (obj: any, path = ""): any => {
  return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
};

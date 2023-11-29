export function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((res: Response): Promise<T> => res.json() as Promise<T>);
}

import { HTTP_METHODS } from '../utils/constants';

export async function useFetch(url: string, method = HTTP_METHODS.GET, body: any = null) {
  let data;

  try {
    const response = await fetch(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        ...(body != null && { body: JSON.stringify(body) }),
        mode: 'no-cors'
      }
    );

    data = await response.json();

  } catch(error) {
    return { data, error }
  }

  return { data };
}
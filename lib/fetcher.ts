import { HTTP_METHODS } from '../utils/constants';

export async function useFetch(url: string, method = HTTP_METHODS.GET, body: any = null) {
  let data;

  try {
    console.log('passa')
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
    console.log(response)

    data = await response.json();
    console.log(data)

  } catch(error) {
    console.log(error)
    return { data, error }
  }

  return { data };
}
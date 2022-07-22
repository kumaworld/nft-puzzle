import useSWR from "swr";

export async function useFetch(url, revalidateOnFocus = false) {
  let data;

  try {
    const response = await fetch(url);
    console.log(response)
    data = await response.json();

  } catch(error) {
    console.log(error)
    return { data, error }
  }

  return { data };
}
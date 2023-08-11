const BASE_URL = 'https://dummyjson.com/';

interface Response<T = any> {
  status: number;
  message: string;
  data: T;
}

const fetchData = async (url: string, options: object): Promise<Response> => {
  console.log('fetchData_req', url, options);
  const res = await fetch(url, options);
  console.log('fetchData_res', res);
  if (!res.ok) {
    return {
      status: res.status,
      message: res.statusText,
      data: null,
    };
  }
  const data = await res.json();
  return {
    status: res.status,
    message: res.statusText,
    data: data,
  };
};

const fetchProducts = async <T>(
  url: string,
  options: object,
): Promise<Response<T>> => {
  const data = await fetchData(BASE_URL + 'products/category/' + url, options);
  return data;
};

const fetchCarts = async (
  userId: string,
  options: object,
): Promise<Response> => {
  const data = await fetchData(BASE_URL + 'carts/user/' + userId, options);
  return data;
};

export default fetchData;
export {fetchProducts, fetchCarts};

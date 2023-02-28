import { config } from './config';
import { wallet } from '@shared/wallet';
import { observable } from '@legendapp/state';

const baseUrl = config.baseUrl;

export function httpObservableFetch<RESPONSE_DATA = any, QUERY_PARAMS = any>(
  path: string,
  params?: RequestInit & { query?: QUERY_PARAMS }
) {
  const url = getUrl(path, params);
  const obs = observable<{
    data?: RESPONSE_DATA;
    error?: any;
    errorStr?: string;
    loading: boolean;
  }>({
    data: undefined,
    error: undefined,
    errorStr: undefined,
    loading: true,
  });
  httpFetch(url, params)
    .then(async (response) => {
      const responseData = await response['json']();
      if (!response.ok) {
        throw JSON.stringify(responseData);
      }
      obs.set({ data: responseData, loading: false });
    })
    .catch((error) =>
      obs.set({ loading: false, error, errorStr: error?.toString?.() })
    );
  return obs;
}

export async function httpFetch<RESPONSE_DATA = any, QUERY_PARAMS = any>(
  path: string,
  params?: RequestInit & { query?: QUERY_PARAMS }
): Promise<RESPONSE_DATA> {
  const url = getUrl(path, params);
  const res = await fetch(url, {
    ...params,
    headers: {
      ...params?.headers,
      ...(params?.method !== 'GET' && {
        'Content-Type': 'application/json',
      }),
      Authorization: `Bearer ${wallet.publicKey.toBase58()}`,
    },
  });

  const data = await res.json();
  if (res.ok) {
    return data as RESPONSE_DATA;
  }
  console.error(`[httpFetch] ${url} ${JSON.stringify(data)}`);
  throw data;
}

function getUrl<QUERY_PARAMS extends any>(
  path: string,
  params?: RequestInit & { query?: QUERY_PARAMS }
) {
  let url = baseUrl;
  if (!path.startsWith('/')) {
    url += '/';
  }
  url += path;
  if (params?.query) {
    url += '?' + toUrlSearchParams(params.query);
  }
  return url;
}

function toUrlSearchParams<QUERY_PARAMS extends object>(
  query: QUERY_PARAMS
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();
  const addParam = (key: string, value: any) => {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        urlSearchParams.append(`${key}[${i}]`, value[i]);
      }
    } else if (value !== null && value !== undefined) {
      urlSearchParams.append(key, value);
    }
  };
  for (const [key, value] of Object.entries(query)) {
    addParam(key, value);
  }
  return urlSearchParams;
}

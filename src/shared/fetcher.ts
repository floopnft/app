import { config } from './config';
import { wallet } from '@shared/wallet';
import { observableFetch } from '@legendapp/state/helpers/fetch';

const baseUrl = config.baseUrl;

export function httpObservableFetch<RESPONSE_DATA = any, QUERY_PARAMS = any>(
  path: string,
  params?: RequestInit & { query?: QUERY_PARAMS }
) {
  const url = getUrl(path, params);
  return observableFetch<RESPONSE_DATA>(url, {
    ...params,
    headers: {
      ...{
        ...(params?.method !== 'GET' && {
          'Content-Type': 'application/json',
        }),
        ...params?.headers,
      },
      Authorization: `Bearer ${wallet.publicKey.toBase58()}`,
    },
  });
}

export async function httpFetch<QUERY_PARAMS extends object, R extends any>(
  path: string,
  params?: RequestInit & { query?: QUERY_PARAMS }
): Promise<R> {
  const url = getUrl(path, params);
  const res = await fetch(url, {
    ...params,
    headers: {
      ...params?.headers,
      Authorization: `Bearer ${wallet.publicKey.toBase58()}`,
    },
  });

  const data = await res.json();
  if (res.ok) {
    return data as R;
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

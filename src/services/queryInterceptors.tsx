/* eslint-disable react-refresh/only-export-components */
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { message } from 'antd'

export const baseUrl = import.meta.env.VITE_API_URL;
export const baseQueryWithOutToken = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers) => {
    return headers
  },
})

export const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/admin`,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('authToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Accept', 'application/json')
    return headers
  },
})

export const baseQueryWithoutAdmin = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('authToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Accept', 'application/json')
    return headers
  },
})

export const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQuery(args, api, extraOptions)
  // Check if the response has a status code of 401
  if (result.error?.status === 401 || result.error?.originalStatus === 401) {
    sessionStorage.removeItem("authToken");
    window.location.href = "/notAuthorized";

  }
  if (result.error?.status === 403 || result.error?.originalStatus === 403) {
    sessionStorage.removeItem("authToken");
    message.error("Method Not Allowed");
    // window.location.href = "/";
  }
  if (result.error?.status === 404 || result.error?.originalStatus === 404) {
    message.error("Not Found");
    // window.location.href = "/*";
  }
  if (result.error?.status === 503 || result.error?.originalStatus === 503) {
    // sessionStorage.removeItem("authToken");
    message.error("Under Maintenance");

    // window.location.href = "/underMaintenance";
  }
  if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    // sessionStorage.removeItem("authToken");
    message.error("Server Error");
    // window.location.href = "/serverError";
  }
  return result;
}

export const baseQueryWithoutAdminWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQueryWithoutAdmin(args, api, extraOptions)
  // Check if the response has a status code of 401
  if (result.error?.status === 401 || result.error?.originalStatus === 401) {
    sessionStorage.removeItem("authToken");
    window.location.href = "/";

  }
  if (result.error?.status === 403 || result.error?.originalStatus === 403) {
    sessionStorage.removeItem("authToken");
    message.error("Method Not Allowed");
    // window.location.href = "/";
  }
  if (result.error?.status === 404 || result.error?.originalStatus === 404) {
    message.error("Not Found");
    // window.location.href = "/*";
  }
  if (result.error?.status === 503 || result.error?.originalStatus === 503) {
    sessionStorage.removeItem("authToken");
    message.error("Under Maintenance");

    // window.location.href = "/underMaintenance";
  }
  if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    sessionStorage.removeItem("authToken");
    message.error("Server Error");
    // window.location.href = "/serverError";
  }
  return result;
}

export const baseQueryForAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 403 || result.error?.originalStatus === 403) {
    sessionStorage.removeItem("authToken");
    window.location.href = "/";
  }

  if (result.error?.status === 405 || result.error?.originalStatus === 405) {
    sessionStorage.removeItem("authToken");
    // window.location.href = "/";

  }
  if (result.error?.status === 503 || result.error?.originalStatus === 503) {
    sessionStorage.removeItem("authToken");
    // window.location.href = "/underMaintenance";
    message.error("Under Maintenance");

  }

  if (result.error?.status === 500 || result.error?.originalStatus === 500) {
    // sessionStorage.removeItem("authToken");
    message.error("Server Error");

    // window.location.href = "/serverError";
  }
  return result;
}
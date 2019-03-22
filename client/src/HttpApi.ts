import "whatwg-fetch";

export enum HttpRequestMethod {
  Delete = "DELETE",
  Get = "GET",
  Head = "HEAD",
  Patch = "PATCH",
  Post = "POST",
  Put = "PUT"
}

export interface ErrorDetail {
  errorCode: number;
  payload: string;
  errorMessage: string;
}

export interface ErrorResponse {
  errors: ErrorDetail[];
  data: string;
  correlationId: string;
}

export class HttpApi {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    const baseUrlLastChar = baseUrl.length - 1;

    this.baseUrl =
      baseUrl.substring(baseUrlLastChar) === "/"
        ? baseUrl.substring(0, baseUrlLastChar)
        : baseUrl;
  }

  trimPath(path: string) {
    return path.substring(0, 1) == "/" ? path.substring(1) : path;
  }
  request<T>(
    path: string,
    method: HttpRequestMethod,
    body?: object
  ): [Promise<T>, AbortController] {
    const abort = new AbortController();

    const options: RequestInit = {
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      method,
      signal: abort.signal
    };

    const request = fetch(
      `${this.baseUrl}/${this.trimPath(path)}`,
      options
    ).then(this.handleResponse, this.handleNetworkFailure);

    return [request, abort];
  }

  handleResponse(res: Response) {
    if (res.ok) {
      return res
        .json()
        .catch(() =>
          Promise.reject(new BadResponseError("Failed to decode JSON response"))
        );
    }
    if (res.status === 503) {
      return Promise.reject(new ServerUnavailableError(res.statusText));
    }
    if (res.status === 500) {
      return Promise.reject(new ServerError(res.statusText));
    }
    if (res.status === 401) {
      return Promise.reject(new UnauthorizedError(res.statusText));
    }
    if (res.status === 403) {
      res
        .json()
        .catch(() =>
          Promise.reject(new BadResponseError("Failed to decode JSON response"))
        )
        .then((x: ErrorResponse) =>
          Promise.reject(
            new PermissionError(x.errors.map(s => s.errorMessage).join(","))
          )
        );
    }
    if (res.status === 400) {
      res
        .json()
        .catch(() =>
          Promise.reject(new BadResponseError("Failed to decode JSON response"))
        )
        .then(x => Promise.reject(new BadRequestError(x)));
    }
  }

  handleNetworkFailure(e: DOMException) {
    if (e.name === "AbortError") {
      return Promise.reject(new AbortError(e.message));
    }

    return Promise.reject(new NetworkError(e.message));
  }

  //   handleError = <T>(
  //       errors:Error[],
  //     test: (x: ApiError) => boolean,
  //     action: ){}
}

export class ApiError {
  constructor(readonly message: string) {}

  toString() {
    return `${this.constructor.toString()}: ${this.message}`;
  }
}

export class TransientFailure extends ApiError {}
export class AbortError extends TransientFailure {}
export class NetworkError extends TransientFailure {}
export class ServerUnavailableError extends TransientFailure {}

export class ClientError extends ApiError {}
export class UnauthorizedError extends ClientError {}
export class PermissionError extends ClientError {}
export class BadRequestError extends ClientError {}

export class ServerError extends ApiError {}
export class BadResponseError extends ServerError {}

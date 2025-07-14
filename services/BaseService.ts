export interface RequestConfig {
  headers?: Record<string, string | undefined>;
  timeout?: number;
  withCredentials?: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export class BaseService {
  private baseURL: string;
  private defaultConfig: RequestConfig;

  constructor(baseURL: string, config: RequestConfig = {}) {
    this.baseURL = baseURL.replace(/\/$/, ''); // Remove trailing slash
    this.defaultConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      timeout: 30000, // 30 seconds
      withCredentials: true,
      ...config,
    };
  }

  /**
   * Make a GET request
   */
  async get<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  /**
   * Make a POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  /**
   * Make a PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  /**
   * Upload file with FormData
   */
  async uploadFile<T = any>(
    endpoint: string,
    file: File,
    fieldName: string = 'file',
    additionalData?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return this.request<T>('POST', endpoint, formData, {
      ...config,
      headers: {
        ...config?.headers,
        // Remove Content-Type to let browser set it with boundary
        'Content-Type': undefined,
      },
    });
  }

  /**
   * Upload multiple files
   */
  async uploadFiles<T = any>(
    endpoint: string,
    files: File[],
    fieldName: string = 'files',
    additionalData?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`${fieldName}[${index}]`, file);
    });

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return this.request<T>('POST', endpoint, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': undefined,
      },
    });
  }

  /**
   * Download file
   */
  async downloadFile(
    endpoint: string,
    filename?: string,
    config?: RequestConfig
  ): Promise<void> {
    const response = await this.request<Blob>('GET', endpoint, undefined, {
      ...config,
      headers: {
        ...config?.headers,
        Accept: 'application/octet-stream',
      },
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Make a request with XML content type
   */
  async postXML<T = any>(
    endpoint: string,
    xmlData: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, xmlData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/xml',
      },
    });
  }

  /**
   * Make a request with form data (application/x-www-form-urlencoded)
   */
  async postForm<T = any>(
    endpoint: string,
    formData: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const urlEncodedData = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      urlEncodedData.append(key, value);
    });

    return this.request<T>('POST', endpoint, urlEncodedData.toString(), {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Make a request with plain text
   */
  async postText<T = any>(
    endpoint: string,
    textData: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, textData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'text/plain',
      },
    });
  }

  /**
   * Core request method
   */
  private async request<T = any>(
    method: string,
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const finalConfig = this.mergeConfig(config);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout);

    try {
      const requestInit: RequestInit = {
        method,
        headers: finalConfig.headers as HeadersInit,
        signal: controller.signal,
        credentials: finalConfig.withCredentials ? 'include' : 'omit',
      };

      if (data !== undefined) {
        if (data instanceof FormData || data instanceof URLSearchParams) {
          requestInit.body = data;
          // Remove Content-Type for FormData to let browser set it
          if (data instanceof FormData) {
            delete (requestInit.headers as Record<string, string>)[
              'Content-Type'
            ];
          }
        } else if (typeof data === 'string') {
          requestInit.body = data;
        } else {
          requestInit.body = JSON.stringify(data);
        }
      }

      const response = await fetch(url, requestInit);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw this.createError(response);
      }

      let responseData: T;
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType.includes('text/')) {
        responseData = (await response.text()) as T;
      } else if (
        contentType.includes('application/octet-stream') ||
        contentType.includes('blob')
      ) {
        responseData = (await response.blob()) as T;
      } else {
        responseData = (await response.text()) as T;
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  /**
   * Merge configuration with defaults
   */
  private mergeConfig(config?: RequestConfig): RequestConfig {
    return {
      ...this.defaultConfig,
      ...config,
      headers: {
        ...this.defaultConfig.headers,
        ...config?.headers,
      },
    };
  }

  /**
   * Create error object from response
   */
  private createError(response: Response): ApiError {
    return {
      message: `HTTP ${response.status}: ${response.statusText}`,
      status: response.status,
      data: null,
    };
  }

  /**
   * Handle fetch errors
   */
  private handleError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return {
        message: 'Request timeout',
        status: 408,
      };
    }

    if (error instanceof TypeError) {
      return {
        message: 'Network error',
        status: 0,
      };
    }

    return {
      message: error.message || 'Unknown error',
      status: error.status,
      data: error.data,
    };
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.defaultConfig.headers = {
      ...this.defaultConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Remove authentication token
   */
  removeAuthToken(): void {
    const headers = { ...this.defaultConfig.headers };
    delete headers['Authorization'];
    this.defaultConfig.headers = headers;
  }

  /**
   * Set base URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL.replace(/\/$/, '');
  }

  /**
   * Get base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Update default configuration
   */
  updateConfig(config: Partial<RequestConfig>): void {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...config,
      headers: {
        ...this.defaultConfig.headers,
        ...config.headers,
      },
    };
  }
}

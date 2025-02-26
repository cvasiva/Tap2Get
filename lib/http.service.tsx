import axios, { AxiosRequestConfig } from "axios";

export class HttpService {
    public async get<T>(url: string, params?: any): Promise<T> {
        const config: AxiosRequestConfig = this.getAxiosConfig("", url, "GET", {}, undefined, params);
        return this.call<T>(config);
    }

    private async call<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios(config);
            return response.data as T;
        } catch (error: any) { 
            throw new Error(`HTTP Error: ${(error as any).message}`);
        }
    }

    private getAxiosConfig(baseURL: any, url: any, method: any, headers: any, data?: any, params?: any): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            baseURL,
            url,
            method,
            headers,
            timeout: 20000,
            data,
            params,
        };
        return config;
    }
}

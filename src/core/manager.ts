import axios, { AxiosError, AxiosInstance } from 'axios';
import { Credentials, JSONType } from '../types';
import NginxAPI from './api';

export class NginxManager {
	public token: string | null = null;
	public expiresAt: number | null = null;
	public credentials: Credentials;

	private axiosInstance: AxiosInstance;
	public api: NginxAPI;

	constructor(url: string, credentials: Credentials) {
		if (!url) throw new Error('URL is required.');
		else if (Object.keys(credentials).length === 0) throw new Error('Credentials are required.');

		this.axiosInstance = axios.create({ baseURL: url.replace(/\/$/, '').endsWith('/api') ? url : url + '/api' });
		this.axiosInstance.interceptors.request.use(async (config) => {
			if ((this.token === null || this.expiresAt === null || Date.now() >= this.expiresAt) && !config.url?.includes('/tokens')) {
				await this.api.login();
				if (config.headers.Authorization) config.headers.Authorization = `Bearer ${this.token}`;
			}

			return config;
		}, (error) => {
			return Promise.reject(error);
		});

		this.credentials = credentials;
		this.api = new NginxAPI(this);
	}

	public async request<O, T = unknown>(data: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		endpoint: string; body?: T; auth?: boolean;
	}) {
		return await this.axiosInstance.request<O>({
			url: data.endpoint,
			method: data.method,
			data: data.body ? JSON.stringify(data.body) : undefined,
			headers: {
				'Content-Type': 'application/json',
				...(data.auth ? { 'Authorization': `Bearer ${this.token}` } : {}),
			},
		}).then((res) => res.data).catch((error: AxiosError) => {
			throw new Error(this.readableError(error));
		});
	}

	private readableError(error: unknown) {
		if (error instanceof AxiosError) return error.response?.data?.message || error.message;
		else if (error instanceof Error) return error.message;
		else if (typeof error === 'string') return error;
		else return 'Unknown error.';
	}

	public qp<T extends Record<string, JSONType>>(url: string, params?: T) {
		if (!params) return url;

		const query = new URLSearchParams();

		for (const [key, value] of Object.entries(params)) {
			if (value === undefined) continue;
			else if (Array.isArray(value)) query.append(key, value.join(','));
			else query.append(key, String(value));
		}

		return url + '?' + query.toString();
	}
}

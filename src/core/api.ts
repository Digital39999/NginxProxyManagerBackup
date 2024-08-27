import { CreateUserType, DeadHostCreateType, ProxyHostCreateType, RedirectHostCreateType, StreamHostCreateType, DeadHostType, ProxyHostType, RedirectHostType, StreamHostType, SettingType, TokenResponse, UserType } from '../types';
import { NginxManager } from './manager';

export default class NginxAPI {
	constructor(private manager: NginxManager) { }

	async login() {
		const res = await this.manager.request<TokenResponse>({
			method: 'POST',
			endpoint: this.manager.qp('/tokens'),
			body: {
				identity: this.manager.credentials.username,
				secret: this.manager.credentials.password,
			},
		});

		console.log(res);

		this.manager.token = res.token;
		this.manager.expiresAt = res.expiresAt;
	}

	// Settings.
	async getSettings() {
		return await this.manager.request<SettingType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/settings'),
			auth: true,
		});
	}

	async updateSetting(setting: SettingType) {
		return await this.manager.request<SettingType>({
			method: 'PUT',
			endpoint: this.manager.qp(`/settings/${setting.id}`),
			body: setting,
			auth: true,
		});
	}

	// Users.
	async getAllUsers() {
		return await this.manager.request<UserType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/users', { expand: 'permissions' }),
			auth: true,
		});
	}

	async createUser(user: CreateUserType) {
		return await this.manager.request<UserType>({
			method: 'POST',
			endpoint: this.manager.qp('/users'),
			body: user,
			auth: true,
		});
	}

	async updateUser(user: UserType) {
		return await this.manager.request<UserType>({
			method: 'PUT',
			endpoint: this.manager.qp(`/users/${user.id}`),
			body: user,
			auth: true,
		});
	}

	async deleteUser(user: UserType | { id: number; }) {
		return await this.manager.request<UserType>({
			method: 'DELETE',
			endpoint: this.manager.qp(`/users/${user.id}`),
			auth: true,
		});
	}

	// Hosts.
	async getProxyHosts() {
		return await this.manager.request<ProxyHostType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/nginx/proxy-hosts', { expand: 'owner,access_list,certificate' }),
			auth: true,
		});
	}

	async getRedirectionHosts() {
		return await this.manager.request<RedirectHostType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/nginx/redirection-hosts', { expand: 'owner,certificate' }),
			auth: true,
		});
	}

	async getDeadHosts() {
		return await this.manager.request<DeadHostType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/nginx/dead-hosts', { expand: 'owner,certificate' }),
			auth: true,
		});
	}

	async getStreamHosts() {
		return await this.manager.request<StreamHostType[]>({
			method: 'GET',
			endpoint: this.manager.qp('/nginx/streams', { expand: 'owner' }),
			auth: true,
		});
	}

	async createProxyHost(host: ProxyHostCreateType) {
		return await this.manager.request<ProxyHostType>({
			method: 'POST',
			endpoint: this.manager.qp('/nginx/proxy-hosts'),
			body: host,
			auth: true,
		});
	}

	async createRedirectionHost(host: RedirectHostCreateType) {
		return await this.manager.request<RedirectHostType>({
			method: 'POST',
			endpoint: this.manager.qp('/nginx/redirection-hosts'),
			body: host,
			auth: true,
		});
	}

	async createDeadHost(host: DeadHostCreateType) {
		return await this.manager.request<DeadHostType>({
			method: 'POST',
			endpoint: this.manager.qp('/nginx/dead-hosts'),
			body: host,
			auth: true,
		});
	}

	async createStreamHost(host: StreamHostCreateType) {
		return await this.manager.request<StreamHostType>({
			method: 'POST',
			endpoint: this.manager.qp('/nginx/streams'),
			body: host,
			auth: true,
		});
	}
}

export type JSONType = string | number | boolean | null | JSONType[]; // Query doesn't support objects.

export type Credentials = {
	username: string;
	password: string;
};

export type TokenResponse = {
	token: string;
	expiresAt: number;
};

export type StatusType = {
	status: string;
	version: {
		major: number;
		minor: number;
		revision: number;
	};
};

export type SettingType = {
	id: string;
	name: string;
	description: string;
	value: 'congratulations' | '404' | '400' | 'redirect' | 'html';
	meta: Partial<{
		redirect: string;
		html: string;
	}>;
};

export type UserType = {
	id: number;
	created_on: string;
	modified_on: string;
	is_disabled: number;
	email: string;
	name: string;
	nickname: string;
	avatar: string;
	roles: string[];
	permissions: {
		id: number;
		created_on: string;
		modified_on: string;
		user_id: number;
		visibility: string;
		proxy_hosts: string;
		redirection_hosts: string;
		dead_hosts: string;
		streams: string;
		access_lists: string;
		certificates: string;
	};
};

export type CreateUserType = Pick<UserType, 'name' | 'nickname' | 'email' | 'roles' | 'is_disabled'>;

export type ProxyHostType = {
	id: number;
	created_on: string;
	modified_on: string;
	owner_user_id: number;
	domain_names: string[];
	forward_host: string;
	forward_port: number;
	access_list_id: number;
	certificate_id: number;
	ssl_forced: number;
	caching_enabled: number;
	block_exploits: number;
	advanced_config: string;
	meta: Partial<{
		letsencrypt_agree: boolean;
		dns_challenge: boolean;
		nginx_online: boolean;
		nginx_err: unknown;
	}>;
	allow_websocket_upgrade: number;
	http2_support: number;
	forward_scheme: string;
	enabled: number;
	locations: unknown;
	hsts_enabled: number;
	hsts_subdomains: number;
	owner: {
		id: number;
		created_on: string;
		modified_on: string;
		is_deleted: number;
		is_disabled: number;
		email: string;
		name: string;
		nickname: string;
		avatar: string;
		roles: string[];
	};
	access_list: unknown;
	certificate: unknown;
};

export type ProxyHostCreateType = Pick<ProxyHostType, 'forward_scheme' | 'forward_host' | 'forward_port' | 'advanced_config' | 'domain_names' | 'allow_websocket_upgrade' | 'access_list_id' | 'certificate_id' | 'meta' | 'locations' | 'block_exploits' | 'caching_enabled' | 'http2_support' | 'hsts_enabled' | 'hsts_subdomains' | 'ssl_forced'>;

export type RedirectHostType = {
	id: number;
	created_on: string;
	modified_on: string;
	owner_user_id: number;
	domain_names: string[];
	forward_domain_name: string;
	preserve_path: number;
	certificate_id: number;
	ssl_forced: number;
	block_exploits: number;
	advanced_config: string;
	meta: Partial<{
		letsencrypt_agree: boolean;
		dns_challenge: boolean;
		nginx_online: boolean;
		nginx_err: unknown;
	}>;
	http2_support: number;
	enabled: number;
	hsts_enabled: number;
	hsts_subdomains: number;
	forward_scheme: string;
	forward_http_code: number;
	owner: {
		id: number;
		created_on: string;
		modified_on: string;
		is_deleted: number;
		is_disabled: number;
		email: string;
		name: string;
		nickname: string;
		avatar: string;
		roles: string[];
	};
	certificate: unknown;
};

export type RedirectHostCreateType = Pick<RedirectHostType, 'domain_names' | 'forward_domain_name' | 'forward_scheme' | 'forward_http_code' | 'preserve_path' | 'certificate_id' | 'meta' | 'advanced_config' | 'block_exploits' | 'http2_support' | 'hsts_enabled' | 'hsts_subdomains' | 'ssl_forced'>;

export type DeadHostType = {
	id: number;
	created_on: string;
	modified_on: string;
	owner_user_id: number;
	domain_names: string[];
	certificate_id: number;
	ssl_forced: number;
	advanced_config: string;
	meta: Partial<{
		letsencrypt_agree: boolean;
		dns_challenge: boolean;
		nginx_online: boolean;
		nginx_err: unknown;
	}>;
	http2_support: number;
	enabled: number;
	hsts_enabled: number;
	hsts_subdomains: number;
	owner: {
		id: number;
		created_on: string;
		modified_on: string;
		is_deleted: number;
		is_disabled: number;
		email: string;
		name: string;
		nickname: string;
		avatar: string;
		roles: string[];
	};
	certificate: unknown;
};

export type DeadHostCreateType = Pick<RedirectHostType, 'domain_names' | 'certificate_id' | 'meta' | 'advanced_config' | 'http2_support' | 'hsts_enabled' | 'hsts_subdomains' | 'ssl_forced'>;

export type StreamHostType = {
	id: number;
	created_on: string;
	modified_on: string;
	owner_user_id: number;
	incoming_port: number;
	forwarding_host: string;
	forwarding_port: number;
	tcp_forwarding: number;
	udp_forwarding: number;
	meta: {
		nginx_online: boolean;
		nginx_err: string;
	};
	enabled: number;
	owner: {
		id: number;
		created_on: string;
		modified_on: string;
		is_deleted: number;
		is_disabled: number;
		email: string;
		name: string;
		nickname: string;
		avatar: string;
		roles: string[];
	};
};

export type StreamHostCreateType = Pick<StreamHostType, 'incoming_port' | 'forwarding_host' | 'forwarding_port' | 'tcp_forwarding' | 'udp_forwarding'>;

export type BackupType = {
    settings: SettingType[];
    users: UserType[];
    proxyHosts: ProxyHostType[];
    redirectionHosts: RedirectHostType[];
    deadHosts: DeadHostType[];
    streams: StreamHostType[];
};

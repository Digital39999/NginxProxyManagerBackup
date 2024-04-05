import { NginxManager } from './manager';
import { BackupType } from '../types';
import JSZip from 'jszip';
import fs from 'fs';

export class Backups {
	public static async createBackup(manager: NginxManager, type: 'zip' | 'json' = 'zip') {
		const settings = await manager.api.getSettings();
		const users = await manager.api.getAllUsers();

		const proxyHosts = await manager.api.getProxyHosts();
		const redirectionHosts = await manager.api.getRedirectionHosts();
		const deadHosts = await manager.api.getDeadHosts();
		const streams = await manager.api.getStreamHosts();

		const backup: BackupType = { settings, users, proxyHosts, redirectionHosts, deadHosts, streams };

		if (type === 'zip') {
			const zip = new JSZip();
			zip.file('backup.json', JSON.stringify(backup));
			const content = await zip.generateAsync({ type: 'nodebuffer' });
			fs.writeFileSync('backup.zip', content);
		} else {
			fs.writeFileSync('backup.json', JSON.stringify(backup));
		}
	}

	public static async restoreBackup(manager: NginxManager, type: 'zip' | 'json' = 'zip') {
		let backup: BackupType;

		if (type === 'zip') {
			const content = fs.readFileSync('backup.zip');
			const zip = await JSZip.loadAsync(content);
			const file = zip.file('backup.json');
			if (!file) throw new Error('Backup file not found in zip');
			backup = JSON.parse(await file.async('text'));
		} else {
			backup = JSON.parse(fs.readFileSync('backup.json').toString());
		}

		for (const setting of backup.settings) await manager.api.updateSetting(setting);
		for (const user of backup.users) await manager.api.createUser(user);

		for (const proxyHost of backup.proxyHosts) await manager.api.createProxyHost(proxyHost);
		for (const redirectionHost of backup.redirectionHosts) await manager.api.createRedirectionHost(redirectionHost);
		for (const deadHost of backup.deadHosts) await manager.api.createDeadHost(deadHost);
		for (const stream of backup.streams) await manager.api.createStreamHost(stream);
	}
}

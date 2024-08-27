import { NginxManager } from './manager';
import { BackupType } from '../types';
import fs from 'fs';

export class Backups {
	public static async createBackup(manager: NginxManager, outputDir: string) {
		const settings = await manager.api.getSettings();
		const users = await manager.api.getAllUsers();

		const proxyHosts = await manager.api.getProxyHosts();
		const redirectionHosts = await manager.api.getRedirectionHosts();
		const deadHosts = await manager.api.getDeadHosts();
		const streams = await manager.api.getStreamHosts();

		const backup: BackupType = { settings, users, proxyHosts, redirectionHosts, deadHosts, streams };

		if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
		if (!fs.lstatSync(outputDir).isDirectory()) throw new Error('Output directory is not a directory.');

		fs.writeFileSync(`${outputDir ? `${outputDir}/` : ''}` + 'backup.json', JSON.stringify(backup, null, 4));
	}

	public static async restoreBackup(manager: NginxManager, filePath: string) {
		if (!fs.existsSync(filePath)) throw new Error('File does not exist.');

		const backup = JSON.parse(fs.readFileSync(filePath).toString()) as BackupType;

		for (const setting of backup.settings) await manager.api.updateSetting(setting);
		for (const user of backup.users) await manager.api.createUser(user);

		for (const proxyHost of backup.proxyHosts) await manager.api.createProxyHost(proxyHost);
		for (const redirectionHost of backup.redirectionHosts) await manager.api.createRedirectionHost(redirectionHost);
		for (const deadHost of backup.deadHosts) await manager.api.createDeadHost(deadHost);
		for (const stream of backup.streams) await manager.api.createStreamHost(stream);
	}
}

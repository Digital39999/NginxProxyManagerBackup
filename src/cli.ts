import { NginxManager } from './core/manager';
import { Backups } from './core/backup';
import { Command } from 'commander';

const program = new Command();

program
	.command('create')
	.description('Create a backup of the Nginx Proxy Manager')
	.requiredOption('--url <url>', 'URL of the Nginx Proxy Manager instance')
	.requiredOption('--username <username>', 'Username for authentication')
	.requiredOption('--password <password>', 'Password for authentication')
	.requiredOption('--output-dir <outputDir>', 'Directory where the backup will be saved')
	.action(async (options) => {
		const manager = new NginxManager(options.url, {
			username: options.username,
			password: options.password,
		});

		await manager.api.login();
		await Backups.createBackup(manager, options.outputDir);

		console.log('Backup created successfully.');
	});

program
	.command('restore')
	.description('Restore a backup to the Nginx Proxy Manager')
	.requiredOption('--url <url>', 'URL of the Nginx Proxy Manager instance')
	.requiredOption('--username <username>', 'Username for authentication')
	.requiredOption('--password <password>', 'Password for authentication')
	.requiredOption('--file <file>', 'Path to the backup file')
	.action(async (options) => {
		const manager = new NginxManager(options.url, {
			username: options.username,
			password: options.password,
		});

		await manager.api.login();
		await Backups.restoreBackup(manager, options.file);

		console.log('Backup restored successfully.');
	});

program.parse(process.argv);

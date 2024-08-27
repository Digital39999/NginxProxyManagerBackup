# Nginx Proxy Manager Backup

The `Nginx Proxy Manager Backup` package provides an easy way to backup and restore configurations from Nginx Proxy Manager. It offers both programmatic access via a TypeScript API and a command-line interface (CLI) for ease of use.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Programmatic Use](#programmatic-use)
  - [CLI Usage](#cli-usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the `Nginx Proxy Manager Backup` package, you need to install it from npm:

```bash
npm install nginx-backup
```

## Usage

### Programmatic Use

To use the package in your TypeScript project, follow these steps:

1. **Import and Set Up**:

   ```typescript
   import { NginxManager } from 'nginx-backup';
   import { Backups } from 'nginx-backup';

   const manager = new NginxManager('https://your-nginx-url', {
     username: 'your-username',
     password: 'your-password',
   });
   ```

2. **Login**:

   Ensure you log in to obtain an authentication token:

   ```typescript
   await manager.api.login();
   ```

3. **Create a Backup**:

   ```typescript
   await Backups.createBackup(manager, './backup-directory');
   ```

4. **Restore a Backup**:

   ```typescript
   await Backups.restoreBackup(manager, './backup-directory/backup.json');
   ```

### CLI Usage

To use the package via CLI, follow these steps:

1. **Install Globally**:

   After publishing, install the package globally:

   ```bash
   npm install -g nginx-backup
   ```

2. **Create a Backup**:

   To create a backup, run:

   ```bash
   nginx-backup create --url <NPM_URL> --username <USERNAME> --password <PASSWORD> --output-dir <OUTPUT_DIR>
   ```

   Replace `<NPM_URL>`, `<USERNAME>`, `<PASSWORD>`, and `<OUTPUT_DIR>` with your Nginx Proxy Manager URL, credentials, and desired backup directory.

3. **Restore a Backup**:

   To restore a backup, run:

   ```bash
   nginx-backup restore --url <NPM_URL> --username <USERNAME> --password <PASSWORD> --file <BACKUP_FILE>
   ```

   Replace `<NPM_URL>`, `<USERNAME>`, `<PASSWORD>`, and `<BACKUP_FILE>` with your Nginx Proxy Manager URL, credentials, and path to the backup file.

## Configuration

### CLI Configuration

You can configure the CLI commands with the following options:

- `--url` - The URL of your Nginx Proxy Manager instance.
- `--username` - Your Nginx Proxy Manager username.
- `--password` - Your Nginx Proxy Manager password.
- `--output-dir` - Directory where the backup will be saved (for backup creation).
- `--file` - Path to the backup file to restore (for restore).

### Programmatic Configuration

Configure the `NginxManager` with your instance URL and credentials:

```typescript
const manager = new NginxManager('https://your-nginx-url', {
  username: 'your-username',
  password: 'your-password',
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/Digital39999/NginxProxyManagerBackup).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
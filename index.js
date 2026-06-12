#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.popapi');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

class PopApi {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  saveConfig() {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
  }

  async setup() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

    console.log('\n🚀 popApi Setup\n');
    
    const token = await question('Enter your GitHub token: ');
    const username = await question('Enter your GitHub username: ');
    const defaultRepo = await question('Enter default repository name (optional): ');

    this.config = {
      token,
      username,
      defaultRepo: defaultRepo || ''
    };

    this.saveConfig();
    console.log('\n✅ Configuration saved!\n');
    rl.close();
  }

  async uploadFiles(filesPath, repo, branch = 'main') {
    if (!this.config.token || !this.config.username) {
      console.log('❌ Not configured. Run: popapi setup');
      process.exit(1);
    }

    const files = this.getFilesRecursive(filesPath);
    
    if (files.length === 0) {
      console.log('❌ No files found');
      return;
    }

    console.log(`\n📦 Found ${files.length} files to upload\n`);

    let uploaded = 0;
    let failed = 0;

    for (const file of files) {
      try {
        await this.uploadFile(file, repo, branch);
        uploaded++;
        console.log(`✅ ${file.relativePath}`);
      } catch (error) {
        failed++;
        console.log(`❌ ${file.relativePath} - ${error.message}`);
      }
    }

    console.log(`\n📊 Results: ${uploaded} uploaded, ${failed} failed\n`);
  }

  getFilesRecursive(dirPath) {
    let files = [];

    if (!fs.existsSync(dirPath)) {
      throw new Error(`Path not found: ${dirPath}`);
    }

    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      if (item.startsWith('.')) continue; // Skip hidden files
      
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files = files.concat(this.getFilesRecursive(fullPath));
      } else {
        files.push({
          fullPath,
          relativePath: path.relative(dirPath, fullPath),
          dirPath
        });
      }
    }

    return files;
  }

  uploadFile(file, repo, branch) {
    return new Promise((resolve, reject) => {
      const content = fs.readFileSync(file.fullPath);
      const base64Content = content.toString('base64');
      const filePath = file.relativePath.replace(/\\/g, '/');

      const options = {
        hostname: 'api.github.com',
        path: `/repos/${this.config.username}/${repo}/contents/${filePath}`,
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/vnd.github.v3+json',
          'User-Agent': 'popApi'
        }
      };

      const data = JSON.stringify({
        message: `Upload ${path.basename(file.fullPath)} via popApi`,
        content: base64Content,
        branch: branch
      });

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode === 201 || res.statusCode === 200) {
            resolve();
          } else {
            try {
              const err = JSON.parse(body);
              reject(new Error(err.message || `HTTP ${res.statusCode}`));
            } catch (e) {
              reject(new Error(`HTTP ${res.statusCode}`));
            }
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  showHelp() {
    console.log(`
╔════════════════════════════════════╗
║          popApi v1.0               ║
║  GitHub Batch Upload Tool          ║
╚════════════════════════════════════╝

Usage:
  popapi setup                        - Setup GitHub credentials
  popapi push <path> <repo>           - Upload files to GitHub repo
  popapi push <path> <repo> <branch>  - Upload to specific branch
  popapi help                         - Show this help

Examples:
  popapi push ./src myrepo
  popapi push ./build myrepo main
  popapi setup

Environment:
  Works on: Windows, macOS, Linux, Termux
  Author: popApi Contributors
    `);
  }
}

async function main() {
  const api = new PopApi();
  const command = process.argv[2];

  try {
    switch (command) {
      case 'setup':
        await api.setup();
        break;
      case 'push':
        const filesPath = process.argv[3];
        const repo = process.argv[4];
        const branch = process.argv[5] || 'main';
        
        if (!filesPath || !repo) {
          console.log('❌ Usage: popapi push <path> <repo> [branch]');
          process.exit(1);
        }
        
        await api.uploadFiles(filesPath, repo, branch);
        break;
      case 'help':
      case '--help':
      case '-h':
        api.showHelp();
        break;
      default:
        api.showHelp();
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

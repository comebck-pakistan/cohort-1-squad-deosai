const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFiles(directories) {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    walkDir(dir, filePath => {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
      
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Skip if it's already using logger exclusively or if it's a client component
      if (content.includes('use client')) {
        // Client components: just remove noisy console.logs
        let original = content;
        content = content.replace(/console\.log\([^)]+\);\n?/g, '');
        // Keep console.error and console.warn for debugging client side as per essential requirement
        if (content !== original) {
          fs.writeFileSync(filePath, content);
          console.log('Cleaned console.log in client component:', filePath);
        }
        return;
      }
      
      let modified = false;
      
      if (content.match(/console\.(log|error|warn)\(/)) {
        if (!content.includes('import { logger }')) {
          content = 'import { logger } from "@/lib/logger";\n' + content;
        }
        
        // Simple replacements
        content = content.replace(/console\.log\(/g, 'logger.info(');
        content = content.replace(/console\.warn\(/g, 'logger.warn(');
        content = content.replace(/console\.error\(/g, 'logger.error(');
        
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log('Replaced console with logger in:', filePath);
      }
    });
  });
}

processFiles(['lib/whatsapp', 'lib/ai', 'app/api', 'app/dashboard']);

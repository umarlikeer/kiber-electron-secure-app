const bytenode = require('bytenode');
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const modulesDir = path.join(__dirname, '../src/main/modules');

function processModules() {
  const files = fs.readdirSync(modulesDir);

  files.forEach((file) => {
    if (file.endsWith('.js') && !file.endsWith('.jsc')) {
      const filePath = path.join(modulesDir, file);
      const rawCode = fs.readFileSync(filePath, 'utf8');

      const obfuscatedCode = JavaScriptObfuscator.obfuscate(rawCode, {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArrayEncoding: ['rc4']
      }).getObfuscatedCode();

      const tempJsPath = filePath + '.tmp';
      fs.writeFileSync(tempJsPath, obfuscatedCode);

      const jscPath = filePath.replace('.js', '.jsc');
      bytenode.compileFile({
        filename: tempJsPath,
        output: jscPath
      });

      fs.unlinkSync(tempJsPath);
      console.log(`[BYTECODE] Kompilyatsiya qilindi: ${file} -> ${path.basename(jscPath)}`);
    }
  });
}

processModules();
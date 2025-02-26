const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    'typst',
    {
      provideDocumentFormattingEdits(document) {
        return new Promise((resolve, reject) => {
          const text = document.getText();

          const process = exec('typstyle', (error, stdout, stderr) => {
            if (error) {
              vscode.window.showErrorMessage(
                `Typstyle format error: ${stderr || error.message}`
              );
              reject([]);
              return;
            }

            if (stderr) {
              vscode.window.showErrorMessage(
                `Typstyle format error: ${stderr || 'Unknown error'}`
              );
              reject([]);
              return;
            }

            const fullRange = new vscode.Range(
              document.lineAt(0).range.start,
              document.lineAt(document.lineCount - 1).range.end
            );

            resolve([vscode.TextEdit.replace(fullRange, stdout)]);
          });

          process.stdin.write(text);
          process.stdin.end();
        });
      },
    }
  );

  context.subscriptions.push(formatter);
}

module.exports = { activate };

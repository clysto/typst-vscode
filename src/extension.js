const vscode = require('vscode');
const { LanguageClient } = require('vscode-languageclient/node');
const { exec } = require('child_process');

let client;

async function activate(context) {
  try {
    await startClient(context);
  } catch (e) {
    void vscode.window.showErrorMessage(`Failed to activate tinymist: ${e}`);
    throw e;
  }
}

async function startClient(context) {
  const config = vscode.workspace.getConfiguration('typst');
  const executablePath = config.get('tinymistPath');

  const run = {
    command: executablePath,
    options: { env: Object.assign({}, process.env, { RUST_BACKTRACE: '1' }) },
  };

  const serverOptions = {
    run,
    debug: run,
  };

  const clientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'typst' },
      { scheme: 'untitled', language: 'typst' },
    ],
    initializationOptions: {
      formatterMode: 'typstyle',
    },
    middleware: {
      workspace: {
        configuration: (params, token, next) => {
          return params.items.map((item) => {
            const section = item?.section;

            if (section === 'formatterMode') {
              return 'typstyle';
            }

            return null;
          });
        },
      },
      provideCodeLenses: () => null,
    },
  };

  client = new LanguageClient(
    'tinymist',
    'Typst Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

async function deactivate() {
  await client?.stop();
}

module.exports = { activate, deactivate };

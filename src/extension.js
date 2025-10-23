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
  const fontPaths = config.get('fontPaths');
  const formatterMode = config.get('formatterMode');

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
      formatterMode,
      fontPaths: [...fontPaths],
    },
    middleware: {
      workspace: {
        configuration: (params, token, next) => {
          return params.items.map((item, i) => {
            const raw = item?.section ?? '';
            const scope = item?.scopeUri
              ? vscode.Uri.parse(item.scopeUri)
              : undefined;

            const isPrefixed = raw.startsWith('typst.');
            const key = isPrefixed ? raw.slice('typst.'.length) : raw;

            const cfg = vscode.workspace.getConfiguration('typst', scope);

            if (key === 'formatterMode') {
              return cfg.get('formatterMode', 'typstyle');
            }

            if (key === 'fontPaths') {
              const v = cfg.get('fontPaths');
              if (v === 'disable') return null;
              return Array.isArray(v) ? [...v] : v ?? null;
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

# Typst Basic VS Code Extension

A lightweight VS Code extension for Typst.

> This is an extremely minimal Typst extension. It only connects VS Code to your own Tinymist executable and omits many client‑side features. If you are not sure what you’re doing or want a full Typst experience (preview, UI tools, richer integrations), please use the official Tinymist VS Code extension.

## Usage

To use this extension, you must install Tinymist and configure the `typst` extension to work with the [Tinymist](https://github.com/Myriad-Dreamin/tinymist/releases) language server. You can install Tinymist via a package manager for convenience.

```sh
# Example: Install Tinymist using Homebrew
brew install tinymist
```

After installation, update your VS Code settings to specify the Tinymist path:

```json
{
    "typst.tinymistPath": "path/to/tinymist"
}
```

## Features

This extension does not provide additional functionality beyond what Tinymist offers. All features are powered by [Tinymist](https://github.com/Myriad-Dreamin/tinymist).

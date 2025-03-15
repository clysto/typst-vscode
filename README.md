# Typst Basic VS Code Extension

A lightweight VS Code extension for Typst.

> I prefer simplicity and don’t require PDF preview or UI enhancements. This extension solely leverages Tinymist’s LSP functionality. If you need additional features, consider using Tinymist’s official VS Code extension.

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

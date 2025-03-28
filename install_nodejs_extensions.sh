#!/bin/bash
cat vscode_nodejs_extensions.txt | xargs -n 1 code --install-extension

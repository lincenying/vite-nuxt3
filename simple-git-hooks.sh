#!/bin/sh

git config core.hooksPath .git/hooks/
rm -rf .git/hooks
npx simple-git-hooks

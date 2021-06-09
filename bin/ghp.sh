#! /bin/bash

npm run build
ghp-import -p -m "feat (deploy) - deploy demo to gh-pages" ./dist
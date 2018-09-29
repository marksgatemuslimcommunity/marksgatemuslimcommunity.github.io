#!/bin/bash  
cp -a _site/. ../marksgatemuslimcommunity.github.io/
cd ../marksgatemuslimcommunity.github.io/
git add .
git commit -m '$1'
git push

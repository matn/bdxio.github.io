#!/bin/bash -x

echo "----------------------"
echo "Deploying ${PWD##*/}"
echo "----------------------"

# Ensuring npm & bower deps are installed
npm install
./node_modules/.bin/bower install

# Cleaning dist directory
rm -Rf dist/
mkdir dist

# Cloning master branch into dist directory
git clone -b master git@github.com:bdxio/bdxio.github.io.git dist/

# Generating dist/
grunt build

# Checking in dist/
cd dist
# Adding files, removing missing files (including files with spaces as well)
git add .
if [ $(git ls-files --deleted | wc -l) -ne 0 ]; then git ls-files --deleted | sed -e 's/^/"/g' -e 's/$/"/g' | xargs git rm; fi;
git commit -m "Auto-deploy - ${PWD##*/}"

# Pushing to master branch, which is sync-ed with www.bdx.io ... only if there are more than 10 files in current directory
if [ $(ls -al | wc -l) -ge 10 ]; then git push origin master; else echo "Avoiding any push since there is an empty dist/ dir"; fi;
cd ..

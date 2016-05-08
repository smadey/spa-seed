#Spa Seed Project

init:
npm run init
npm run install
npm run dev

push:
git add lib-core
git commit lib-core -m "Commit the lib-core project"
npm run push:core

git add lib-components
git commit lib-components -m "Commit the lib-components project"
npm run push:components

# make new release of example apps

rm -rf ./electronReaderApp/node_modules

zip -r ./electron.zip electronReaderApp
zip -r ./phoneGap.zip phoneGapReaderApp


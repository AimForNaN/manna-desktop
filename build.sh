#! /bin/bash
if [ -d "build" ]; then
    rm -r build
fi

if [ ! -d "build" ]; then
    mkdir build
fi

python3 PolymerBundler/main.py --doc-root="." --source-file="resources/html/manna-desktop.html" --build-dir="build"

asar pack build resources/app.asar

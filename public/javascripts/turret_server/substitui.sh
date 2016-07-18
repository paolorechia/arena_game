#!/bin/bash
for f in *; do
    echo "$f"
    sed -e s:$1:$2:g $f > temp.js
    cat temp.js > $f
done
rm temp.js

#!/bin/bash

## usage: ./install.sh Nova.zip

zipfile=$1
if [ -z "$zipfile" ]; then
  echo "please supply a zipfile to install"
  exit 1
fi

filename="${zipfile%.*}"
filelower=`echo "$filename" | tr '[:upper:]' '[:lower:]'` 

unzip $zipfile -d "$filelower"
mv "$filelower/$filename" "$filelower/src"
rm -rf "$zipfile"


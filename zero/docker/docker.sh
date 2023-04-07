#!/bin/bash

opts=""
case "$1" in
  "build")
    opts="build"
    ;;
  "start")
    opts="up -d --build"
    ;;
  "stop")
    opts="down"
    ;;
  "logs")
    opts="logs -f"
    ;;
  "push")
    opts="push"
    ;;
  "pull")
    opts="pull"
    ;;
  *)
    echo "You have failed to specify what to do correctly."
    exit 1
    ;;
esac
command="docker compose -f docker/compose.yml $opts"
eval $command

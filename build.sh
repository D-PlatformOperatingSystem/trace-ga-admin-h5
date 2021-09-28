#!/bin/sh
# sed -i -e 's/\r$//'  build.sh
set -v on

echo "**** sasc-mobile-h5:v1  nginx ......"
docker build --no-cache -t sasc-mobile-h5:v1 .

echo "**** sasc-mobile-h5......"
docker rm -f sasc-mobile-h5
docker run -d --name sasc-mobile-h5 -p 7682:80 sasc-mobile-h5:v1

docker rmi $(docker images -f "dangling=true" -q)

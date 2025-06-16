#!/bin/sh

current_date=$(date +"%m%d%H%M")

git pull

echo '开始构建镜像 ========>'
docker build -t vite-nuxt3:1.0.${current_date} -f ./Dockerfile .
echo '<======== 镜像构建成功'
echo '开始停止容器 ========>'
docker stop vite-nuxt3
echo '<======== 停止容器成功'
echo '开始删除容器 ========>'
docker rm vite-nuxt3
echo '<======== 删除容器成功'
echo '开始运行容器 ========>'
docker run -d -p 4123:4123 --name vite-nuxt3 vite-nuxt3:1.0.${current_date}
echo '<======== 容器运行成功'

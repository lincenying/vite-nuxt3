ARG NODE_VERSION=node:22-alpine

# 阶段1: 构建
FROM $NODE_VERSION AS builder
ENV PNPM_HOME=/pnpm-store
ENV PATH="$PNPM_HOME:$PATH"
RUN npm config set registry https://registry.npmmirror.com && npm install -g pnpm && mkdir -p $PNPM_HOME

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --store-dir $PNPM_HOME
COPY . .
RUN pnpm run build

# 阶段2: 生产镜像
FROM $NODE_VERSION AS production
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.data ./.data
ENV NUXT_HOST=0.0.0.0 \
    NUXT_APP_VERSION=latest \
    NODE_ENV=production \
    PORT=4123 \
    NUXT_ENV_HOST_API_URL=https://php.mmxiaowu.com
EXPOSE 4123
CMD ["node", "./.output/server/index.mjs"]

# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
# docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
# docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
# docker build -t vite-nuxt:1.25.1029 -f ./Dockerfile .
# 运行镜像
# docker run -d -p 4123:4123 --add-host=host.docker.internal:host-gateway --name vite-nuxt vite-nuxt:1.25.1029
# 进入镜像
# docker exec -it vite-nuxt /bin/sh
# 停止容器
# docker stop vite-nuxt
# 删除容器
# docker rm vite-nuxt
# 删除镜像
# docker rmi vite-nuxt:1.25.1029

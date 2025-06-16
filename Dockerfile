ARG NODE_VERSION=node:22-alpine

# 阶段1: 构建
FROM $NODE_VERSION AS builder
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
ENV PNPM_HOME=/pnpm-store
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts --store-dir $PNPM_HOME
COPY . .
RUN pnpm run build

# 阶段2: 生产镜像
FROM $NODE_VERSION AS production
WORKDIR /app
COPY --from=builder /app/.output ./.output
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
# docker build -t vite-nuext3:1.0.0616 -f ./Dockerfile .
# 运行镜像
# docker run -d -p 7223:4123 --add-host=host.docker.internal:host-gateway --name vite-nuext3 vite-nuext3:1.0.0616
# 进入镜像
# docker exec -it vite-nuext3 /bin/sh
# 停止容器
# docker stop vite-nuext3
# 删除容器
# docker rm vite-nuext3
# 删除镜像
# docker rmi vite-nuext3

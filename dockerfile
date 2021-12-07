FROM node:alpine
WORKDIR /service
RUN npm -g i pnpm
COPY ./package.json .
RUN pnpm i --registry=https://registry.npm.taobao.org/
COPY ./src ./src
COPY ./nest-cli.json .
COPY ./tsconfig.json .
RUN pnpm build
EXPOSE 80
CMD pnpm prod
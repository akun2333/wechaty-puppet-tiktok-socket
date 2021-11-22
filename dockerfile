FROM node:alpine
RUN npm i -g pnpm
WORKDIR /service
COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN pnpm install --shamefully-hoist
COPY . .
EXPOSE 80
RUN pnpm build
CMD /bin/sh -c "pnpm prod"
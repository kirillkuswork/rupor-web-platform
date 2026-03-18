FROM registry-proxy.rutube.ru/node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./

ARG NEXT_PUBLIC_NODE_ENV
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_IMG_PROXY_KEY
ARG NEXT_PUBLIC_IMG_PROXY_SALT
ARG NEXT_PUBLIC_IMG_PROXY_URL
ARG NEXT_PUBLIC_API_COOKIE_DOMAIN
ARG I18_LANGUAGE_FOLDER
ARG NEXT_PUBLIC_AUTH_MODE_TYPE
ARG NEXT_PUBLIC_STUDIO_URL
ARG NEXT_PUBLIC_VERSION_ID
ARG NEXT_PUBLIC_LOCALIZE_URL
ARG NEXT_PUBLIC_METRICS_API_URL

ENV NEXT_PUBLIC_NODE_ENV=$NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_IMG_PROXY_KEY=$NEXT_PUBLIC_IMG_PROXY_KEY
ENV NEXT_PUBLIC_IMG_PROXY_SALT=$NEXT_PUBLIC_IMG_PROXY_SALT
ENV NEXT_PUBLIC_IMG_PROXY_URL=$NEXT_PUBLIC_IMG_PROXY_URL
ENV NEXT_PUBLIC_API_COOKIE_DOMAIN=$NEXT_PUBLIC_API_COOKIE_DOMAIN
ENV I18_LANGUAGE_FOLDER=$I18_LANGUAGE_FOLDER
ENV NEXT_PUBLIC_AUTH_MODE_TYPE=$NEXT_PUBLIC_AUTH_MODE_TYPE
ENV NEXT_PUBLIC_STUDIO_URL=$NEXT_PUBLIC_STUDIO_URL
ARG NEXT_PUBLIC_VERSION_ID=$NEXT_PUBLIC_VERSION_ID
ARG NEXT_PUBLIC_LOCALIZE_URL=$NEXT_PUBLIC_LOCALIZE_URL
ARG NEXT_PUBLIC_METRICS_API_URL=$NEXT_PUBLIC_METRICS_API_URL

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi && npm run postbuild

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

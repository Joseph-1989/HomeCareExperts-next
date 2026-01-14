FROM node:20.10.0-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20.10.0-alpine AS builder
WORKDIR /app

# Accept build arguments for API URLs
ARG REACT_APP_API_URL
ARG REACT_APP_API_GRAPHQL_URL
ARG REACT_APP_API_WS

# Set as environment variables for Next.js build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_GRAPHQL_URL=$REACT_APP_API_GRAPHQL_URL
ENV REACT_APP_API_WS=$REACT_APP_API_WS

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20.10.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000
CMD ["node", "server.js"]


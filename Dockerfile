FROM node:24-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json and pnpm-lock.yaml for install
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install

# Copy rest of the files
COPY . .

# Build the app (Next.js)
RUN pnpm run build

EXPOSE 3000

# Use pnpm to start the app or the correct start command for Next.js
CMD ["pnpm", "start"]


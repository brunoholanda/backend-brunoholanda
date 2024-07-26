npm install -g @nestjs/cli
npm install
npm install @nestjs/typeorm typeorm pg
npm install bcrypt @types/bcrypt
npm install @nestjs/config dotenv
npm install twilio
npm install class-validator class-transformer

npm install @nestjs/passport @nestjs/jwt passport-jwt passport-local passport

npm install @types/passport-jwt @types/passport-local @types/passport


coloque o .env com as chaves na raiz do projeto


docker
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose-db.yml down
docker-compose -f docker-compose.yml rm -f
docker-compose -f docker-compose-db.yml rm -f

docker build --no-cache -f Dockerfile -t backend:latest .

docker-compose -f docker-compose-db.yml up -d
docker-compose -f docker-compose.yml up -d

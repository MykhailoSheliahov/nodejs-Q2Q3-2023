# Run docker container

    docker-compose up -d --build

# Remove docker container

    docker-compose down

# Run server part

    ts-node app.ts

# Migrations

    1. Go to 06-server folder
    2. Create migration instance - npx mikro-orm migration:create --initial
    3. Run migration - npx mikro-orm migration:up

# Seeds

    1. Go to 06-server folder
    2. Run seeding - npx mikro-orm seeder:run

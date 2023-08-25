# Nestjs Boilerplate

## Quick run

```bash
npm install

setup env

npm run migration:run

npm run start:dev

```

## URL API Docs or Swagger

```bash
http://localhost:3000/docs
```

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/<migration-name>
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

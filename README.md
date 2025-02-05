# Talenta Timesheet

Talenta Timesheet is a project initiated by our team to simplify the process of inputting timesheets into the Talenta platform. This tool helps employees log their working hours efficiently and accurately.

## How to Run Development

```bash
npm install
npm run dev
```

## How to Run Production

```bash
npm install
npm run build
npm run start
```

## How to Run Tests

```bash
npm run test
```

## How to Run Unit Tests

```bash
npm run test ./test/unit/services/timesheet.service.test.ts
```

## How to Run Test Coverage

```bash
npm run test -- --coverage
```

## How to Run Test Coverage for a Specific File

```bash
npm run test ./test/unit/services/timesheet.service.test.ts -- --coverage
```

## Postman Collection

You can access the Postman collection at the following link:

[Postman Collection](https://www.postman.com/rochiyat-coding/workspace/share-api/collection/4389128-316bee17-4453-4107-8fd5-9f8c934ec86c?action=share&creator=4389128&active-environment=4389128-e5b122f3-7205-4c53-9081-b89dda0a293b)

## How to Run Postman Collection

To use the Postman collection, add an environment variable `cookie` with the value obtained from logging into Talenta.


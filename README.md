# KLM Techinal Assignment

## (András Barabás)

---

## Prerequisities:

-   Docker
-   Docker Compose (2.y.z <=)

## Running the development environment

Navigate to the root folder of the project, then type:

```
docker compose up --build
```

In case you want to use different ports for the services, create a copy of the existing `.env.example` file and fill it with your own values instead:

```
cp .env.example .env
```

Docker will automatically parse the `.env` file's content. Otherwise, the stack will fallback to the default values.

## Checking in

Use the following credentials to check in:

```
Booking code: PZIGZ3
Family name: HESP
```

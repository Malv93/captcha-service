# Captcha Service

The **Captcha Service** allows to generate new captchas and to validate previously generated captchas.

## Local environment

In order to run the **Captcha Service** locally you must first install [node](https://nodejs.org/en/download) and [docker](https://docs.docker.com/engine/install/).

Install the dependencies:

```bash
npm install
```

Spin up a mongodb docker container:

```bash
npm run start:mongodb
```

Run the server:

```bash
npm run dev
```

## Run tests

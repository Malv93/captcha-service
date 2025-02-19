# Captcha Service

The **Captcha Service** allows to generate new captchas and to validate previously generated captchas.

## Run unit tests

Install the dependencies:

```bash
npm install
```

Run the tests:

```bash
npm run coverage
```

## Set local environment

In order to run the **Captcha Service** locally you must first install [node](https://nodejs.org/en/download) and [docker](https://docs.docker.com/engine/install/).

Install the dependencies:

```bash
npm install
```

Spin up a mongodb docker container:

```bash
npm run start:mongodb
```

Start the server:

```bash
npm run dev
```

## Test manually

Start the service locally following [these steps](#set-local-environment).

Generate a new captcha with the [/generate-captcha](./docs/Usage.md#post-generate-captcha) endpoint:

```bash
curl -X POST "http://127.0.0.1:3000/generate-captcha"
```

Save the captcha id, copy paste the captcha svg tag in a viewer like [this one](https://www.svgviewer.dev/) and read the captcha text.

Validate the captcha with the [/validate-captcha](./docs/Usage.md#post-validate-captcha) endpoint. Specify the captcha id and the text in the request body:

```bash
curl -X POST "http://127.0.0.1:3000/validate-captcha" \
-H "Content-Type: application/json" \
-d '{"id":"$CAPTCHA_ID", "text": "$CAPTCHA_TEXT"}'
```

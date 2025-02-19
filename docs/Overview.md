# Captcha Service Overview

The microservice allows to generate new captchas and to validate previously generated captchas against an input text. It exposes a synchronous HTTP REST API with two endpoints: [POST /generate-captcha](#post-generate-captcha) and [POST /validate-captcha](#post-validate-captcha).

The following diagram shows how the Captcha service works.

## Sequence diagram

```mermaid
sequenceDiagram
    participant Client
    participant Captcha Service
    participant Database

    Client->>Captcha Service: POST /generate-captcha
    Captcha Service->>Database: Create new captcha
    Database->>Captcha Service: {id, svg}
    Captcha Service->>Client: {id, svg}
    Client->>Captcha Service: POST /validate-captcha {id, text}
    Captcha Service->>Database: Get captcha by id
    Database->>Captcha Service: {id, svg, text}
    Captcha Service->>Captcha Service: Validate captcha
    Captcha Service->>Database: Deprecate captcha
    Captcha Service->>Client: {validationResult}
```
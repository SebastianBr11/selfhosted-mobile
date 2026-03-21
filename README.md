# Self-Hosted Library

This app shows you your self-hosted services.

<img width="380" alt="Screenshot_20260321-122650" src="https://github.com/user-attachments/assets/4a95fb12-b90f-487d-9e4b-96b25f1b62c5" />

## Built-in Services

See [builtin-services.md](./builtin-services.md) for a list of built-in services.

There is a JSON schema for the services that you can find in [schema.json](./schema.json).
Each release also has a schema specific to that release.

You can also define custom services by supplying the following properties to the service object:

```ts
{
    id: string,
    name: string,
    url: string,
    description: string,
    appStoreLink?: string,
    packageName?: string,
    iconUrl: string
}
```

## Requirements

- [Mise](https://github.com/jdx/mise) can used for installing the following
  necessary dependencies:
  - Node
  - Java 17
  - Bun

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Run the app

   ```bash
   bun run android # Create an Android build and run the app
   bun start # Use an existing build and run the app
   ```

You can start developing by editing the files inside the **app** directory.
This project uses [file-based routing](https://docs.expo.dev/router/introduction).

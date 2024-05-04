# Test Cloudflare Pages - Nuxt - Mongoose

App created following [this official guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site) by Cloudflare.

---

## Goal

Find a solution for using Mongoose within Cloudflare Pages or a technical explanation of why it cannot be used.

---

## Foreword

- Use the wrangler.toml file

- Add `compatibility_flags = [ "nodejs_compat" ]` to enable the use of Node packages within edge environments

---

## Implementation

- Add Mongoose with `npm add mongoose` command
- Add `compatibility_flags = [ "nodejs_compat" ]` to /wrangler.toml allowing node modules on the edge
- Add `MONGODB_CONNECTION_STRING` and `MONGODB_DEFAULT_DB` vars in the .env file
- Add `MONGODB_CONNECTION_STRING` and `MONGODB_DEFAULT_DB` vars in remote enviroment as encrypted enviroment vars
- Add the /server/services/mongoose.ts file importing mongoose
- Add the /server/api/test.ts file importing the previous one and making a simple query

---

## Result

Cloudflare build results in Error:

```plain-text
Cannot resolve "@aws-sdk/credential-providers" from "/opt/buildhome/repo/node_modules/mongodb/lib/deps.js" and externals are not allowed!
```

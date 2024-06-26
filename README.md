# Email Self

Use Cloudflare Worker to send email notifications to yourself.

## Deploy

1. Enable Cloudflare Email Routing in your domain on Cloudflare.
	https://developers.cloudflare.com/email-routing/email-workers/enable-email-workers/
2. Change `YOUR_EMAIL` and `YOUR_DOMAIN_EMAIL` in `wrangler.toml` to your own account.
3. Run `npm run token` to set your token to use emailself.
4. Run `npm run deploy` to deploy the worker.

## Usage

```bash
curl -X POST -H "Content-Type: application/json" -H "Token: [your-token]" \
	-d '{"subject": "Hello, World!", "content_type": "text/plain", "content": "Hello World!"}' \
	https://emailself.[your-domain].workers.dev
```

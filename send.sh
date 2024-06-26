curl -X POST -H "Content-Type: application/json" -H "Token: [your-token]" \
	-d '{"subject": "Hello, World!", "content_type": "text/plain", "content": "Hello World!"}' \
	https://emailself.[your-domain].workers.dev

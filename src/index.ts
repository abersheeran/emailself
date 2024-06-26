import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
import { Validator } from '@cfworker/json-schema';

const validator = new Validator({
	type: 'object', properties: {
		subject: { type: 'string' },
		content_type: {
			type: 'string',
			enum: ['text/plain', 'text/html'],
		},
		content: { type: 'string' },
	}, required: ['subject', 'content_type', 'content'],
});

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const json: any = request.method === "GET" ? {} : await request.json()
		const v = validator.validate(json);
		if (!v.valid) {
			return Response.json({ errors: v.errors }, { status: 400 });
		}

		const msg = createMimeMessage();
		msg.setSender({ addr: env.SENDER });
		msg.setRecipient(env.RECIPIENT);
		msg.setSubject(json.subject);
		msg.addMessage({ contentType: json.content_type, data: json.content });

		var message = new EmailMessage(env.SENDER, env.RECIPIENT, msg.asRaw());
		try {
			await env.EMAIL.send(message);
		} catch (e: any) {
			return new Response(e.message, { status: 500 });
		}

		return new Response("");
	},
} satisfies ExportedHandler<Env>;

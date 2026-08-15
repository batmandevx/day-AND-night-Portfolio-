import type { ContactMessage } from './contactModel';
import type {
    ContactSubmissionResult,
    ContactSubmissionService,
} from './contactSubmissionService';

const CONTACT_EMAIL = 'ayushdevxai@gmail.com';

// Static-export friendly submission: opens the visitor's mail client with a
// pre-filled message instead of posting to a (non-existent) backend endpoint.
export const createMailtoContactSubmissionService = (): ContactSubmissionService => ({
    submit(message: ContactMessage): Promise<ContactSubmissionResult> {
        const subject = `Portfolio contact from ${message.name}`;
        const body = `${message.message}\n\n— ${message.name} (${message.email})`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            subject,
        )}&body=${encodeURIComponent(body)}`;

        return Promise.resolve({ kind: 'success' });
    },
});

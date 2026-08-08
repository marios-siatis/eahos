import nodemailer from "nodemailer";

const headers = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "POST,OPTIONS"
};

function response(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function createTransporter() {
  const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing SMTP configuration: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") {
    return response(204, {});
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return response(400, { message: "Please complete all fields." });
    }

    if (name.length > 120 || email.length > 320 || message.length > 5000) {
      return response(400, { message: "One or more fields are too long." });
    }

    const mailer = createTransporter();

    await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: "contact@eahos.com",
      replyTo: email,
      subject: `EAHOS website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>EAHOS website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `
    });

    return response(200, { ok: true });
  } catch (error) {
    console.error("Contact form failed", error);
    return response(500, { message: "We couldn't send your message right now." });
  }
};

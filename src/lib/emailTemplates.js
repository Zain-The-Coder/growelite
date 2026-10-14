import { escapeHtml } from "./contactValidation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://growelite.digital";
const LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Generates the notification email for the internal agency team.
 */
export function generateTeamNotificationEmail({
  name,
  email,
  phone,
  company,
  services = [],
  budget,
  message,
  sourceUrl,
  submittedAt,
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "Not provided";
  const safeCompany = company ? escapeHtml(company) : "Not provided";
  const safeBudget = budget ? escapeHtml(budget) : "Not specified";
  const safeServices =
    services.length > 0 ? services.map(escapeHtml).join(", ") : "None selected";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeSource = sourceUrl ? escapeHtml(sourceUrl) : "Direct contact page";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #101112; font-family: 'Poppins', Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #101112; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #17181a; border: 1px solid rgba(84, 103, 123, 0.4); border-radius: 12px; overflow: hidden; padding: 32px;">
          <!-- Header -->
          <tr>
            <td style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="GrowElite - Digital Innovation" width="150" style="display: block; margin-bottom: 12px; border: 0; max-width: 150px; height: auto;" />
                    <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #af8339;">GrowElite Growth Desk</span>
                    <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">New Project Inquiry</h1>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #8e9fae;">Received on ${escapeHtml(
                      submittedAt
                    )}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Details Grid -->
          <tr>
            <td style="padding: 24px 0 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                <tr>
                  <td width="35%" style="color: #8e9fae; font-size: 13px;">Name:</td>
                  <td width="65%" style="color: #ffffff; font-size: 14px; font-weight: bold;">${safeName}</td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Email:</td>
                  <td style="color: #af8339; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #af8339; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Phone / WhatsApp:</td>
                  <td style="color: #ffffff; font-size: 14px;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Company / Brand:</td>
                  <td style="color: #ffffff; font-size: 14px;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Selected Services:</td>
                  <td style="color: #ffffff; font-size: 14px; font-weight: 600;">${safeServices}</td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Budget Tier:</td>
                  <td style="color: #ffffff; font-size: 14px;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="color: #8e9fae; font-size: 13px;">Referral Source:</td>
                  <td style="color: #8e9fae; font-size: 12px;">${safeSource}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="background-color: #1f2124; padding: 20px; border-radius: 8px; border-left: 3px solid #af8339;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #af8339; font-weight: bold;">Message:</span>
              <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #e2e8f0;">${safeMessage}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 20px;">
              <p style="font-size: 12px; color: #54677b; margin: 0;">Hit Reply directly to answer ${safeName} at ${safeEmail}.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const text = `
NEW PROJECT INQUIRY - GROWELITE
--------------------------------------
Date: ${submittedAt}
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Services: ${services.join(", ") || "None selected"}
Budget: ${budget || "Not specified"}
Source: ${sourceUrl || "Direct contact page"}

MESSAGE:
${message}
--------------------------------------
Hit Reply to respond directly to ${email}.
`;

  return { html, text };
}

/**
 * Generates the auto-reply confirmation email sent to the visitor.
 */
export function generateVisitorAutoReplyEmail({ name, services = [], message }) {
  const safeName = escapeHtml(name.split(" ")[0] || name);
  const safeServices =
    services.length > 0 ? services.map(escapeHtml).join(", ") : "General Strategy & Tech";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We received your message | GrowElite</title>
</head>
<body style="margin: 0; padding: 0; background-color: #101112; font-family: 'Poppins', Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #101112; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #17181a; border: 1px solid rgba(84, 103, 123, 0.4); border-radius: 12px; overflow: hidden; padding: 32px;">
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <img src="${LOGO_URL}" alt="GrowElite - Digital Innovation" width="160" style="display: block; margin: 0 auto 14px; border: 0; max-width: 160px; height: auto;" />
              <h1 style="margin: 12px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">We Received Your Message</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 24px 0 16px;">
              <p style="font-size: 15px; color: #e2e8f0; line-height: 1.6; margin: 0 0 16px;">
                Hi ${safeName},
              </p>
              <p style="font-size: 14px; color: #8e9fae; line-height: 1.6; margin: 0 0 20px;">
                Thank you for reaching out to GrowElite. We&apos;ve safely received your inquiry regarding <strong style="color: #ffffff;">${safeServices}</strong>.
              </p>

              <!-- What happens next -->
              <div style="background-color: #1f2124; padding: 20px; border-radius: 8px; border-left: 3px solid #af8339; margin-bottom: 24px;">
                <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #af8339; display: block; margin-bottom: 12px;">What Happens Next:</span>
                <ol style="margin: 0; padding-left: 20px; color: #e2e8f0; font-size: 13px; line-height: 1.8;">
                  <li><strong>Review:</strong> Our senior strategists and engineering leads review your requirements and category goals.</li>
                  <li><strong>Discovery:</strong> We reach back out to schedule a focused discovery call to discuss technical scope and unit economics.</li>
                  <li><strong>Proposal:</strong> You receive a tailored sprint proposal with clear deliverables and transparent milestones.</li>
                </ol>
              </div>

              <!-- Summary of their message -->
              <div style="padding: 16px; border-radius: 8px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(84, 103, 123, 0.25);">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8e9fae; font-weight: 600;">Your Message Summary:</span>
                <p style="margin: 6px 0 0; font-size: 13px; color: #cbd5e1; font-style: italic; line-height: 1.5;">&ldquo;${safeMessage}&rdquo;</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="font-size: 12px; color: #54677b; margin: 0 0 6px;">GrowElite Digital Innovation Inc. &bull; 740 Broadway, 11th Floor, New York, NY</p>
              <p style="font-size: 12px; color: #af8339; margin: 0;">Direct questions? Email <a href="mailto:hello@growelite.digital" style="color: #af8339; text-decoration: none;">hello@growelite.digital</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const text = `
HI ${safeName.toUpperCase()},

Thank you for reaching out to GrowElite. We have received your inquiry regarding ${services.join(", ") || "General Strategy & Tech"}.

WHAT HAPPENS NEXT:
1. Review: Our strategists and engineers review your brand goals.
2. Discovery: We schedule a focused discovery call to align on scope.
3. Proposal: You receive a transparent sprint plan and milestones.

YOUR MESSAGE SUMMARY:
"${message}"

If you have any immediate questions, reply to this email or reach us at hello@growelite.digital.

GrowElite Digital Innovation Inc.
`;

  return { html, text };
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Hog collects, uses, and safeguards your information when you use our services.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "June 13, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={UPDATED}>
      <p>
        This Privacy Policy explains how The Hog (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) collects, uses, discloses, and safeguards your information when you
        visit our website or use our products and services (collectively, the
        &ldquo;Services&rdquo;). By using the Services, you agree to the practices described in
        this policy.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information in the following ways:</p>
      <ul>
        <li>
          <strong>Information you provide.</strong> Account details such as your name, email
          address, and billing information when you register, contact us, or purchase a plan.
        </li>
        <li>
          <strong>Usage data.</strong> How you interact with the Services, including features
          used, queries run, and pages viewed.
        </li>
        <li>
          <strong>Device and log data.</strong> IP address, browser type, operating system, and
          timestamps collected automatically by our servers.
        </li>
        <li>
          <strong>Information from third parties.</strong> Data from authentication providers,
          payment processors, and analytics partners that help us operate the Services.
        </li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>Provide, maintain, and improve the Services.</li>
        <li>Process transactions and send related confirmations.</li>
        <li>Respond to your requests and provide customer support.</li>
        <li>Monitor usage, detect abuse, and secure our systems.</li>
        <li>Send product updates and marketing communications you may opt out of at any time.</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies to keep you signed in, remember your
        preferences, and understand how the Services are used. You can control cookies through
        your browser settings, though some features may not function properly without them.
      </p>

      <h2>How We Share Information</h2>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> who perform services on our behalf, such as hosting,
          payments, and analytics.
        </li>
        <li>
          <strong>Legal and safety</strong> authorities when required by law or to protect our
          rights, users, and the public.
        </li>
        <li>
          <strong>Business transfers</strong> in connection with a merger, acquisition, or sale of
          assets.
        </li>
        <li>
          <strong>Other parties</strong> with your consent or at your direction.
        </li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        We retain personal information for as long as needed to provide the Services and for
        legitimate business or legal purposes. When information is no longer required, we delete
        or anonymize it.
      </p>

      <h2>Your Rights and Choices</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete, or port
        your personal information, and to object to or restrict certain processing. To exercise
        these rights, contact us using the details below.
      </p>

      <h2>Security</h2>
      <p>
        We use administrative, technical, and physical safeguards designed to protect your
        information. No method of transmission or storage is completely secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>International Data Transfers</h2>
      <p>
        We may process and store information in countries other than your own. Where we transfer
        personal information internationally, we use appropriate safeguards consistent with
        applicable law.
      </p>

      <h2>Children&rsquo;s Privacy</h2>
      <p>
        The Services are not directed to children under 13, and we do not knowingly collect
        personal information from them. If you believe a child has provided us information, please
        contact us so we can remove it.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date above and, where appropriate, provide additional notice.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this policy or our privacy practices, contact us at{" "}
        <a href="mailto:privacy@thehog.ai">privacy@thehog.ai</a>.
      </p>
    </LegalPage>
  );
}

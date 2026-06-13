import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of The Hog's website and services.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "June 13, 2026";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated={UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of The Hog&rsquo;s
        website, products, and services (collectively, the &ldquo;Services&rdquo;). By accessing or
        using the Services, you agree to be bound by these Terms. If you do not agree, do not use
        the Services.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of majority in your jurisdiction, to use the
        Services. By using the Services, you represent that you meet this requirement and have the
        authority to enter into these Terms.
      </p>

      <h2>Accounts and Registration</h2>
      <p>
        Some features require an account. You are responsible for the information you provide,
        for keeping your credentials confidential, and for all activity that occurs under your
        account. Notify us promptly of any unauthorized use.
      </p>

      <h2>Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Services in violation of any law or third-party right.</li>
        <li>Attempt to access, probe, or disrupt our systems or other users&rsquo; data.</li>
        <li>Reverse engineer, scrape, or resell the Services except as permitted.</li>
        <li>Upload malicious code or use the Services to send spam or abusive content.</li>
      </ul>

      <h2>Subscriptions and Billing</h2>
      <p>
        Paid plans are billed in advance on a recurring basis and renew automatically until
        canceled. Fees are non-refundable except where required by law. We may change pricing with
        reasonable notice, effective at the start of your next billing cycle.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The Services, including all software, content, and trademarks, are owned by The Hog or its
        licensors and are protected by intellectual property laws. We grant you a limited,
        non-exclusive, non-transferable license to use the Services in accordance with these Terms.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        The Services may integrate with or link to third-party products. We are not responsible for
        third-party services, and your use of them is governed by their own terms and policies.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
        warranties of any kind, whether express or implied, including merchantability, fitness for
        a particular purpose, and non-infringement. We do not warrant that the Services will be
        uninterrupted, secure, or error-free.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, The Hog will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or for any loss of profits or
        data, arising out of or related to your use of the Services.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless The Hog and its affiliates from any claims,
        damages, and expenses arising out of your use of the Services or your violation of these
        Terms.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time if you violate these
        Terms or to protect the Services. You may stop using the Services at any time. Provisions
        that by their nature should survive termination will survive.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of Delaware, without regard to its
        conflict-of-laws rules. Any disputes will be resolved in the courts located there, unless
        otherwise required by applicable law.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may modify these Terms from time to time. When we do, we will update the &ldquo;Last
        updated&rdquo; date above. Your continued use of the Services after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about these Terms, contact us at{" "}
        <a href="mailto:legal@thehog.ai">legal@thehog.ai</a>.
      </p>
    </LegalPage>
  );
}

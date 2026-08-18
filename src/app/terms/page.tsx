import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { pageMeta } from "@/lib/meta";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/terms",
  title: "Terms of Use",
  description:
    "The terms that govern use of crea-development.com, including informational-only content, no offer of securities, intellectual property, and limitation of liability.",
});

const LAST_UPDATED = "August 17, 2026";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated={LAST_UPDATED}>
      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use
        of the website at {SITE_URL} (the &quot;Site&quot;), operated by{" "}
        {SITE_NAME} (&quot;Crea,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;). By using the Site you agree to these Terms. If you do
        not agree, please do not use the Site.
      </p>

      <h2>Informational purposes only</h2>
      <p>
        The Site describes Crea, its approach, its markets, and selected
        current and past developments. Content is provided for general
        information and is subject to change without notice. Nothing on the
        Site is a commitment to sell, acquire, or develop any property, and
        nothing on the Site is legal, tax, financial, or investment advice.
      </p>

      <h2>No offer of securities</h2>
      <p>
        Nothing on the Site constitutes an offer to sell, or a solicitation of
        an offer to buy, any security or interest in any investment vehicle.
        Any such offer would be made only to qualified persons through
        definitive documents that describe the specific opportunity and its
        risks. Requesting information through the Site does not create any
        relationship or obligation between you and Crea.
      </p>

      <h2>Property information</h2>
      <p>
        Renderings, photographs, descriptions, and other details about
        developments are illustrative and may not reflect final design,
        finishes, or availability. Figures cited on the Site are approximate,
        are stated as of the date they were published, and are not guarantees
        of future results.
      </p>

      <h2>Contact form and communications</h2>
      <p>
        When you submit the contact form you agree that the information you
        provide (name, email address, phone number, selected interest, and
        message) is accurate and that we may use it to respond to you as
        described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. You agree not to submit
        content that is unlawful, misleading, or infringes the rights of
        others.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site, including its text, images, video, design, and the Crea name
        and marks, is owned by Crea or its licensors and is protected by
        copyright, trademark, and other laws. You may view the Site for your
        personal, non-commercial use. You may not copy, reproduce, distribute,
        or create derivative works from any part of the Site without our prior
        written permission.
      </p>

      <h2>Third-party services and links</h2>
      <p>
        The Site may embed or link to services operated by third parties, such
        as Google Maps and Instagram. We do not control those services and are
        not responsible for their content or practices. Your use of them is
        governed by their own terms.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to interfere with the operation or security of the Site,
        attempt to gain unauthorized access to any system, use automated tools
        to scrape or overload the Site, or use the Site for any unlawful
        purpose.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Site is provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, express or implied, including
        warranties of accuracy, merchantability, fitness for a particular
        purpose, and non-infringement. We do not warrant that the Site will be
        uninterrupted or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Crea and its principals,
        affiliates, and service providers will not be liable for any indirect,
        incidental, consequential, special, or punitive damages arising out of
        or related to your use of, or inability to use, the Site.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Arizona, without
        regard to its conflict of law rules. Any dispute arising from these
        Terms or the Site will be brought in the state or federal courts
        located in Maricopa County, Arizona.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may revise these Terms at any time by posting an updated version on
        this page. The date at the top of this page shows when the Terms were
        last revised. Continued use of the Site after a change means you accept
        the revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        {SITE_NAME}
        <br />
        {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postal}
        <br />
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phone}</a>
        <br />
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </p>
    </LegalPage>
  );
}

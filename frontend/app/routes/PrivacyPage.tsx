import { APP_CONFIG } from "../configs/appConfig";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto my-12 px-6 py-12 prose prose-slate dark:prose-invert">
      <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
      <p className="mt-0 text-sm text-gray-500 dark:text-gray-400">
        Effective date: <strong>18 August, 2025</strong>
      </p>

      <p>
        At <strong>RePDF</strong>, we respect your privacy. This Privacy Policy
        explains how we handle your information when you use our PDF editing
        tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Key Points</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Short-lived files:</strong> Uploaded PDF files are processed
          only for the requested task and deleted automatically shortly after.
        </li>
        <li>
          <strong>No selling of data:</strong> We never sell or share your
          personal data with third parties for marketing purposes.
        </li>
        <li>
          <strong>Encryption:</strong> All file transfers and stored data are
          encrypted to protect your information.
        </li>
        <li>
          <strong>Basic usage data:</strong> Limited anonymized data may be
          collected to improve service reliability and performance.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Cookies</h2>
      <p>
        We use minimal cookies only for essential site functions and to improve
        user experience.
        <br />
        You may block cookies in your browser settings, though some features may
        not work properly without them.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Advertisements</h2>
      <p>
        Our free plan may display non-intrusive advertisements. These ads are
        served by trusted partners and do not involve selling your personal
        data.
        <br />
        Paid plans may offer an ad-free experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>
      <address className="not-italic space-y-1">
        <div>
          <strong>RePDF</strong>
        </div>
        <div>
          Email:{" "}
          <a
            className="text-blue-600 dark:text-blue-400"
            href={`mailto: ${APP_CONFIG.CONTACT_EMAIL}`}
          >
            {APP_CONFIG.CONTACT_EMAIL}
          </a>
        </div>
      </address>

      <hr className="my-8" />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        This is a simplified Privacy Policy. We may update it as we expand our
        services. Please review periodically for changes.
      </p>
    </div>
  );
}

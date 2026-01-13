import { APP_CONFIG } from "../configs/appConfig";

const ContactPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>

        <p className="text-gray-600 mb-6">
          We’d love to hear from you. For questions, feedback, or support
          related to RePDF, reach out anytime.
        </p>

        <div className="text-lg text-gray-800 mb-4">
          📧 <span className="font-medium">{APP_CONFIG.CONTACT_EMAIL}</span>
        </div>

        <div className="text-sm text-gray-500">
          We usually respond within{" "}
          <span className="font-medium">24-48 hours</span>.
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

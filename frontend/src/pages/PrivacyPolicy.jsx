import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: November 26, 2025</p>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">
                  We collect information you provide directly to us, such as when you create an account,
                  make a purchase, or contact us for support. This includes your name, email address,
                  shipping address, and payment information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-600">
                  We automatically collect certain information about your device and how you interact
                  with our website, including IP address, browser type, pages visited, and time spent on our site.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Process and fulfill your orders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Provide customer support and respond to your inquiries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Send you important updates about your orders and account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Improve our website and services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <span>Send marketing communications (with your consent)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Service Providers:</strong> We may share information with trusted third parties who help us operate our website and provide services.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">•</span>
                <span><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred to the new entity.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. This includes encryption of sensitive data and regular security audits.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-3">
              We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Access</h3>
                <p className="text-gray-600 text-sm">Request a copy of the personal information we hold about you.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Correction</h3>
                <p className="text-gray-600 text-sm">Request correction of inaccurate or incomplete information.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Deletion</h3>
                <p className="text-gray-600 text-sm">Request deletion of your personal information.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Opt-out</h3>
                <p className="text-gray-600 text-sm">Unsubscribe from marketing communications.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Email:</strong> privacy@shophub.com
                </div>
                <div>
                  <strong>Phone:</strong> (555) 123-4567
                </div>
                <div>
                  <strong>Address:</strong> 123 Commerce St, NY 10001
                </div>
                <div>
                  <strong>Response Time:</strong> Within 30 days
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              This privacy policy may be updated periodically. We will notify you of any material changes
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
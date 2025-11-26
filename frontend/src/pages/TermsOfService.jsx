import React from 'react';

const TermsOfService = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using ShopHub
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: November 26, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using ShopHub, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-3">
              Permission is granted to temporarily use ShopHub for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-600 mb-3">This license shall automatically terminate if you violate any of these restrictions and may be terminated by ShopHub at any time.</p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose or for any public display</li>
              <li>• Attempt to decompile or reverse engineer any software contained on ShopHub</li>
              <li>• Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Creation</h3>
                <p className="text-gray-600">
                  To access certain features of our service, you may be required to create an account.
                  You must provide accurate and complete information during the registration process.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Security</h3>
                <p className="text-gray-600">
                  You are responsible for safeguarding your account credentials and for all activities
                  that occur under your account. You must immediately notify us of any unauthorized use.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Products and Pricing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Information</h3>
                <p className="text-gray-600">
                  We strive to provide accurate product descriptions and images. However, we do not warrant
                  that product descriptions or other content is accurate, complete, or error-free.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-gray-600">
                  All prices are subject to change without notice. We reserve the right to modify or
                  discontinue products without prior notice.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Payment</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Acceptance</h3>
                <p className="text-gray-600">
                  All orders are subject to acceptance and availability. We reserve the right to refuse
                  or cancel any order for any reason, including but not limited to product availability,
                  errors in product information, or payment issues.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                <p className="text-gray-600">
                  Payment must be made at the time of order. We accept major credit cards and other
                  payment methods as indicated on our website.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Shipping and Delivery</h2>
            <p className="text-gray-600">
              Shipping times and costs are clearly indicated during the checkout process. We are not
              responsible for delays caused by factors beyond our control, including but not limited
              to carrier delays, weather conditions, or customs clearance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Returns and Refunds</h2>
            <p className="text-gray-600">
              Our return policy allows returns within 30 days of purchase. Items must be in original
              condition and packaging. Refunds will be processed within 3-5 business days after receipt
              of returned items. See our Returns & Exchanges page for complete details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600">
              The service and its original content, features, and functionality are and will remain
              the exclusive property of ShopHub and its licensors. The service is protected by copyright,
              trademark, and other laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall ShopHub, nor its directors, employees, partners, agents, suppliers,
              or affiliates, be liable for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600">
              We may terminate or suspend your account immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-600">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which
              ShopHub operates, without regard to its conflict of law provisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30 days notice prior to any new
              terms taking effect.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Email:</strong> legal@shophub.com
                </div>
                <div>
                  <strong>Phone:</strong> (555) 123-4567
                </div>
                <div>
                  <strong>Address:</strong> 123 Commerce St, NY 10001
                </div>
                <div>
                  <strong>Business Hours:</strong> Mon-Fri 9AM-6PM EST
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 text-center">
              By using ShopHub, you agree to these Terms of Service. If you do not agree,
              please discontinue use of our service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Fantasy Cricket Platform</h2>
        <p className="mb-2">Effective Date: [Insert Date]</p>
        <p className="mb-4">Last Updated: [Insert Date]</p>

        <h3 className="text-xl font-semibold mb-2">1. Eligibility</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Must be 18 years or older.</li>
          <li>Indian residents only (excluding Assam, Odisha, Telangana, etc.).</li>
          <li>Valid PAN card and bank account required for withdrawals.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2. Game Rules</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Create fantasy teams using real-life players.</li>
          <li>Points based on real-life player performance.</li>
          <li>Teams are locked after joining contests.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">3. Fair Play & Fraud</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>No multiple accounts.</li>
          <li>No use of bots or unfair practices.</li>
          <li>Suspicious activity may lead to account ban or winnings withheld.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">4. Winnings & Withdrawals</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Credited after match results.</li>
          <li>Requires PAN and bank details.</li>
          <li>TDS applicable on winnings above ₹10,000.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">5. Disclaimer</h3>
        <p className="mb-4">Fantasy cricket is a skill-based game and does not constitute gambling or betting.</p>

        <h3 className="text-xl font-semibold mb-2">6. Termination</h3>
        <p className="mb-4">We reserve the right to terminate accounts violating our terms.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Add Money Terms and Conditions</h2>

        <h3 className="text-xl font-semibold mb-2">1. Payment Methods</h3>
        <p className="mb-4">Add funds via UPI, debit/credit cards, net banking, or wallets securely through Razorpay.</p>

        <h3 className="text-xl font-semibold mb-2">2. Wallet Usage</h3>
        <p className="mb-4">Funds can only be used to join paid contests. Not withdrawable unless part of winnings.</p>

        <h3 className="text-xl font-semibold mb-2">3. Refund Policy</h3>
        <p className="mb-4">Funds once added cannot be refunded. Failed transactions will be refunded within 5–7 business days.</p>

        <h3 className="text-xl font-semibold mb-2">4. Wallet Balance Expiry</h3>
        <p className="mb-4">Inactive balances may be forfeited after 365 days.</p>

        <h3 className="text-xl font-semibold mb-2">5. Bonus or Promotional Cash</h3>
        <p className="mb-4">Bonus cash is non-withdrawable and must be used within the platform with restrictions.</p>

        <h3 className="text-xl font-semibold mb-2">6. Dispute Resolution</h3>
        <p>Contact our support team at <a className="text-blue-600 underline" href="mailto:support@yourapp.com">support@yourapp.com</a> for payment-related issues.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;

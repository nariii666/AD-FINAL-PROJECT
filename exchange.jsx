import React, { useState } from 'react';

const ExchangeRequestPage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    preferredRate: '',
    notes: '',
    urgency: 'normal',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log('Piso Exchange Request Submitted:', formData);
    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        amount: '',
        preferredRate: '',
        notes: '',
        urgency: 'normal',
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Piso Exchange Request
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Request a Piso (PHP) exchange. We’ll match you with the best available rate.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center">
            <p className="font-medium">Request submitted successfully!</p>
            <p className="text-sm mt-1 opacity-80">We’ll notify you once a match is found.</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Amount (Piso)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                  ₱
                </span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="any"
                  min="0"
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Preferred Rate (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Preferred Rate <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                name="preferredRate"
                value={formData.preferredRate}
                onChange={handleChange}
                placeholder="e.g. 56.50"
                step="any"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Urgency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'high', label: 'High' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, urgency: option.value }))}
                    className={`py-2.5 rounded-xl text-sm font-medium transition ${
                      formData.urgency === option.value
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-70
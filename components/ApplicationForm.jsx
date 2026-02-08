'use client';

import React, { useState } from 'react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    profession: '',
    healthFitness: '',
    whyJoin: '',
    linkedinWebsite: '',
    referral: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-[600px] mx-auto text-center py-20">
        <h2 
          className="text-4xl md:text-5xl mb-8 tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          Thank you.
        </h2>
        <p 
          className="text-xl leading-relaxed opacity-70"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        >
          Our team reviews every application.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[700px] mx-auto space-y-12">
      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label 
            className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
          />
        </div>
        
        <div>
          <label 
            className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
            style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {/* Profession */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          Profession / What are you building
        </label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          required
          className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {/* Health & Fitness */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          How do you invest in your health or fitness
        </label>
        <input
          type="text"
          name="healthFitness"
          value={formData.healthFitness}
          onChange={handleChange}
          required
          className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {/* Why Join */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          Why do you want to join
        </label>
        <textarea
          name="whyJoin"
          value={formData.whyJoin}
          onChange={handleChange}
          required
          rows={6}
          className="w-full border border-black/20 bg-transparent px-4 py-4 text-lg focus:outline-none focus:border-black transition-colors resize-none"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {/* LinkedIn / Website */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          LinkedIn or Website
        </label>
        <input
          type="url"
          name="linkedinWebsite"
          value={formData.linkedinWebsite}
          onChange={handleChange}
          placeholder="https://"
          className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {/* Referral */}
      <div>
        <label 
          className="block text-sm uppercase tracking-[0.2em] mb-4 opacity-60"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          Referral (Optional)
        </label>
        <input
          type="text"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          placeholder="Who referred you?"
          className="w-full border-b border-black/20 bg-transparent px-2 py-4 text-lg focus:outline-none focus:border-black transition-colors"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 300 }}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <div className="pt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-12 py-5 text-xs tracking-[0.25em] uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "'Spectral', serif", fontWeight: 400 }}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}

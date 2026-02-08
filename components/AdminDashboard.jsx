'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/admin/applications?filter=${filter}`);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setStats(data.stats);
      setApplications(data.applications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch('/api/admin/applications/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, status: newStatus })
      });

      if (response.ok) {
        fetchDashboardData();
        if (selectedApp?.id === applicationId) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToCSV = async () => {
    try {
      const response = await fetch('/api/admin/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `accepted-members-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm tracking-wide opacity-40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500&display=swap');
        
        * {
          font-family: 'Spectral', serif;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-black/10 px-8 py-6">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <h1 className="text-2xl tracking-tight font-light">Motivated Minds Admin</h1>
          <div className="flex gap-4">
            <button
              onClick={exportToCSV}
              className="text-xs tracking-[0.2em] uppercase px-6 py-3 border border-black/20 hover:bg-black hover:text-white transition-colors"
            >
              Export Accepted
            </button>
            <button
              onClick={() => router.push('/api/auth/logout')}
              className="text-xs tracking-[0.2em] uppercase px-6 py-3 opacity-40 hover:opacity-100 transition-opacity"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-6 mb-16">
          <StatCard 
            label="Total" 
            value={stats.total} 
            active={filter === 'ALL'}
            onClick={() => setFilter('ALL')}
          />
          <StatCard 
            label="Pending" 
            value={stats.pending} 
            active={filter === 'PENDING'}
            onClick={() => setFilter('PENDING')}
          />
          <StatCard 
            label="Accepted" 
            value={stats.accepted} 
            active={filter === 'ACCEPTED'}
            onClick={() => setFilter('ACCEPTED')}
          />
          <StatCard 
            label="Waitlist" 
            value={stats.waitlist} 
            active={filter === 'WAITLIST'}
            onClick={() => setFilter('WAITLIST')}
          />
          <StatCard 
            label="Declined" 
            value={stats.declined} 
            active={filter === 'DECLINED'}
            onClick={() => setFilter('DECLINED')}
          />
        </div>

        {/* Applications Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* List */}
          <div className="space-y-2">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-6 border border-black/10 cursor-pointer transition-colors hover:bg-black/5 ${
                  selectedApp?.id === app.id ? 'bg-black text-white' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-normal">{app.name}</h3>
                  <StatusBadge status={app.status} inverted={selectedApp?.id === app.id} />
                </div>
                <p className={`text-sm ${selectedApp?.id === app.id ? 'opacity-70' : 'opacity-40'}`}>
                  {app.email}
                </p>
                <p className={`text-sm ${selectedApp?.id === app.id ? 'opacity-70' : 'opacity-40'}`}>
                  {app.city} • {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* Detail View */}
          {selectedApp && (
            <div className="border border-black/10 p-8 sticky top-8 h-fit">
              <div className="mb-8">
                <h2 className="text-2xl mb-2">{selectedApp.name}</h2>
                <p className="text-sm opacity-40 mb-6">{selectedApp.email}</p>
                
                <div className="flex gap-2 mb-8">
                  {['PENDING', 'ACCEPTED', 'WAITLIST', 'DECLINED'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedApp.id, status)}
                      className={`text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
                        selectedApp.status === status
                          ? 'bg-black text-white border-black'
                          : 'border-black/20 hover:border-black'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Field label="City" value={selectedApp.city} />
                <Field label="Profession" value={selectedApp.profession} />
                <Field label="Health & Fitness" value={selectedApp.healthFitness} />
                <Field label="Why Join" value={selectedApp.whyJoin} />
                {selectedApp.linkedinWebsite && (
                  <Field 
                    label="LinkedIn / Website" 
                    value={
                      <a 
                        href={selectedApp.linkedinWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline opacity-60 hover:opacity-100"
                      >
                        {selectedApp.linkedinWebsite}
                      </a>
                    } 
                  />
                )}
                {selectedApp.referral && (
                  <Field label="Referral" value={selectedApp.referral} />
                )}
                <Field 
                  label="Submitted" 
                  value={new Date(selectedApp.createdAt).toLocaleString()} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border p-6 text-left transition-colors ${
        active ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black'
      }`}
    >
      <div className={`text-3xl mb-2 ${active ? '' : 'opacity-90'}`}>{value}</div>
      <div className={`text-xs tracking-[0.2em] uppercase ${active ? 'opacity-70' : 'opacity-40'}`}>
        {label}
      </div>
    </button>
  );
}

function StatusBadge({ status, inverted }) {
  const colors = {
    PENDING: inverted ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-900',
    ACCEPTED: inverted ? 'bg-white/20 text-white' : 'bg-green-100 text-green-900',
    WAITLIST: inverted ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-900',
    DECLINED: inverted ? 'bg-white/20 text-white' : 'bg-red-100 text-red-900'
  };

  return (
    <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 ${colors[status]}`}>
      {status}
    </span>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs tracking-[0.2em] uppercase opacity-40 mb-2">{label}</div>
      <div className="text-base leading-relaxed">{value}</div>
    </div>
  );
}

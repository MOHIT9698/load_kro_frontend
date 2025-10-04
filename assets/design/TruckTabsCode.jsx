import React, { useState } from 'react';
import { MapPin, Package, Calendar, Navigation, Plus, Clock, DollarSign, Truck, Building2, Route, Filter } from 'lucide-react';

const TruckLoadApp = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState(null);

  // Mock data
  const jobs = [
    {
      id: 1,
      from: 'Mumbai, MH',
      to: 'Delhi, DL',
      date: '2025-10-08',
      time: '06:00 AM',
      status: 'upcoming',
      distance: '1,420 km',
      estimatedRevenue: '₹45,000',
      cargoSpace: '60%',
      availableLoads: 3
    },
    {
      id: 2,
      from: 'Pune, MH',
      to: 'Bangalore, KA',
      date: '2025-10-06',
      time: '08:00 AM',
      status: 'active',
      distance: '840 km',
      estimatedRevenue: '₹28,000',
      cargoSpace: '40%',
      availableLoads: 5
    },
    {
      id: 3,
      from: 'Chennai, TN',
      to: 'Hyderabad, TS',
      date: '2025-10-12',
      time: '05:00 AM',
      status: 'upcoming',
      distance: '630 km',
      estimatedRevenue: '₹22,000',
      cargoSpace: '75%',
      availableLoads: 2
    }
  ];

  const nearbyCompanies = [
    { id: 1, name: 'ABC Logistics Pvt Ltd', distance: '12 km', loadWeight: '500 kg', payment: '₹8,000', pickup: 'Vashi, Navi Mumbai' },
    { id: 2, name: 'XYZ Trading Co', distance: '28 km', loadWeight: '750 kg', payment: '₹12,000', pickup: 'Thane, Mumbai' },
    { id: 3, name: 'Global Exports Inc', distance: '45 km', loadWeight: '300 kg', payment: '₹5,500', pickup: 'Kalyan, Mumbai' }
  ];

  const JobsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Jobs</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Create Job
        </button>
      </div>

      <div className="grid gap-4">
        {jobs.map(job => (
          <div 
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all cursor-pointer border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {job.status === 'active' ? 'Active' : 'Scheduled'}
                  </div>
                  {job.availableLoads > 0 && (
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      {job.availableLoads} Loads Available
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">{job.from}</span>
                  </div>
                  <div className="flex items-center gap-3 ml-1.5">
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">{job.to}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 mb-1">{job.estimatedRevenue}</div>
                <div className="text-sm text-gray-500">{job.distance}</div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                {job.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                {job.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={16} />
                {job.cargoSpace} Empty
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MapTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Route Map</h2>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Map Mockup */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-96 relative overflow-hidden border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation size={48} className="mx-auto text-blue-600 mb-2" />
            <p className="text-gray-600 font-medium">Active Route Tracking</p>
            <p className="text-sm text-gray-500 mt-1">Mumbai → Delhi</p>
          </div>
        </div>
        
        {/* Route line mockup */}
        <svg className="absolute inset-0 w-full h-full" style={{pointerEvents: 'none'}}>
          <path d="M 50 350 Q 200 200, 350 50" stroke="#3B82F6" strokeWidth="4" fill="none" strokeDasharray="10,5" />
          <circle cx="50" cy="350" r="8" fill="#10B981" />
          <circle cx="350" cy="50" r="8" fill="#EF4444" />
          <circle cx="180" cy="220" r="6" fill="#F59E0B" />
          <circle cx="250" cy="150" r="6" fill="#F59E0B" />
        </svg>
      </div>

      {/* Nearby Companies */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Companies Along Route</h3>
        <div className="space-y-3">
          {nearbyCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{company.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin size={14} />
                      {company.pickup}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{company.distance} away</span>
                      <span>•</span>
                      <span>{company.loadWeight}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 mb-1">{company.payment}</div>
                  <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const JobDetailModal = () => {
    if (!selectedJob) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedJob(null)}>
        <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Job Details</h3>
            <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-600">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">{selectedJob.from}</div>
                    <div className="text-sm text-gray-500">Starting Point</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <div className="w-0.5 h-12 bg-gray-300"></div>
                  <div className="text-sm text-gray-500">{selectedJob.distance}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-800">{selectedJob.to}</div>
                    <div className="text-sm text-gray-500">Destination</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Departure</div>
                <div className="font-semibold text-gray-800">{selectedJob.date}</div>
                <div className="text-sm text-gray-600">{selectedJob.time}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className={`font-semibold ${selectedJob.status === 'active' ? 'text-green-600' : 'text-blue-600'}`}>
                  {selectedJob.status === 'active' ? 'Active' : 'Scheduled'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Empty Space</div>
                <div className="font-bold text-orange-600 text-xl">{selectedJob.cargoSpace}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Est. Revenue</div>
                <div className="font-bold text-green-600 text-xl">{selectedJob.estimatedRevenue}</div>
              </div>
            </div>

            {selectedJob.availableLoads > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="text-orange-600" size={20} />
                  <span className="font-semibold text-orange-800">{selectedJob.availableLoads} Available Loads</span>
                </div>
                <p className="text-sm text-orange-700">Companies along your route need cargo transport</p>
              </div>
            )}

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View on Map
              </button>
              <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Truck size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">LoadMatch Pro</h1>
                <p className="text-sm text-gray-500">Truck Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">Rajesh Kumar</div>
                <div className="text-xs text-gray-500">MH-02-AB-1234</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                RK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'jobs'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package size={20} />
                My Jobs
              </div>
              {activeTab === 'jobs' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'map'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Route size={20} />
                Route Map
              </div>
              {activeTab === 'map' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'jobs' && <JobsTab />}
        {activeTab === 'map' && <MapTab />}
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal />
    </div>
  );
};

export default TruckLoadApp;
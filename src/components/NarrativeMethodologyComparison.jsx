import React from 'react';

const NarrativeMethodologyComparison = () => (
  <section className="my-12">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Narrative Impact Methodologies</h2>
      <div className="italic text-lg text-indigo-200">Comparing paradigms for story-based social transformation</div>
    </div>
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {/* Traditional Methodology */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-700 rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold text-blue-800 mb-1">Traditional Impact Methodology</h3>
        <div className="text-blue-500 italic mb-4">Extractive, Hierarchical, Institution-Centered Approach</div>
        <div className="flex justify-center mb-4">
          {/* SVG Diagram */}
          <svg width="160" height="140" viewBox="0 0 200 180">
            <circle cx="100" cy="30" r="20" fill="#7b9cff" />
            <text x="100" y="35" fill="white" textAnchor="middle" fontWeight="bold">R</text>
            <circle cx="50" cy="90" r="15" fill="#7b9cff" />
            <circle cx="100" cy="90" r="15" fill="#7b9cff" />
            <circle cx="150" cy="90" r="15" fill="#7b9cff" />
            <text x="50" y="95" fill="white" textAnchor="middle" fontWeight="bold">S</text>
            <text x="100" y="95" fill="white" textAnchor="middle" fontWeight="bold">S</text>
            <text x="150" y="95" fill="white" textAnchor="middle" fontWeight="bold">S</text>
            <rect x="50" y="140" width="100" height="30" rx="5" fill="#aaaaaa" />
            <text x="100" y="160" fill="white" textAnchor="middle" fontSize="12">REPOSITORY</text>
            <line x1="93" y1="45" x2="57" y2="75" stroke="#7b9cff" strokeWidth="2" />
            <line x1="100" y1="50" x2="100" y2="75" stroke="#7b9cff" strokeWidth="2" />
            <line x1="107" y1="45" x2="143" y2="75" stroke="#7b9cff" strokeWidth="2" />
            <line x1="50" y1="105" x2="75" y2="140" stroke="#7b9cff" strokeWidth="2" />
            <line x1="100" y1="105" x2="100" y2="140" stroke="#7b9cff" strokeWidth="2" />
            <line x1="150" y1="105" x2="125" y2="140" stroke="#7b9cff" strokeWidth="2" />
          </svg>
        </div>
        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
          <h4 className="text-lg font-semibold text-blue-700 mb-1">Researcher (R) as Central Authority</h4>
          <p className="text-gray-600 text-sm">Designs and controls the research process, extracting information from subjects for institutional benefit.</p>
        </div>
        <ul className="space-y-2">
          <li><span className="font-bold text-blue-700">Hierarchical Structure:</span> <span className="text-gray-700">Information flows in one direction from researcher to subjects</span></li>
          <li><span className="font-bold text-blue-700">Subjects as Data Points:</span> <span className="text-gray-700">People's experiences become data in larger institutional studies</span></li>
          <li><span className="font-bold text-blue-700">Value Extraction:</span> <span className="text-gray-700">Benefits accumulate primarily at the institutional level</span></li>
        </ul>
      </div>
      {/* Transformative Methodology */}
      <div className="flex-1 bg-gradient-to-br from-pink-50 to-white border-l-4 border-pink-700 rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold text-pink-700 mb-1">Transformative Exchange Methodology</h3>
        <div className="text-pink-500 italic mb-4">Reciprocal, Networked, Storyteller-Centered Approach</div>
        <div className="flex justify-center mb-4">
          {/* SVG Diagram */}
          <svg width="160" height="140" viewBox="0 0 200 180">
            <circle cx="100" cy="90" r="20" fill="#ff7b9c" />
            <text x="100" y="95" fill="white" textAnchor="middle" fontWeight="bold">S</text>
            <circle cx="100" cy="30" r="12" fill="#ffd07b" />
            <circle cx="160" cy="60" r="12" fill="#ffd07b" />
            <circle cx="160" cy="120" r="12" fill="#ffd07b" />
            <circle cx="100" cy="150" r="12" fill="#ffd07b" />
            <circle cx="40" cy="120" r="12" fill="#ffd07b" />
            <circle cx="40" cy="60" r="12" fill="#ffd07b" />
            <line x1="100" y1="70" x2="100" y2="42" stroke="#ff7b9c" strokeWidth="2" />
            <line x1="115" y1="75" x2="148" y2="65" stroke="#ff7b9c" strokeWidth="2" />
            <line x1="115" y1="105" x2="148" y2="115" stroke="#ff7b9c" strokeWidth="2" />
            <line x1="100" y1="110" x2="100" y2="138" stroke="#ff7b9c" strokeWidth="2" />
            <line x1="85" y1="105" x2="52" y2="115" stroke="#ff7b9c" strokeWidth="2" />
            <line x1="85" y1="75" x2="52" y2="65" stroke="#ff7b9c" strokeWidth="2" />
          </svg>
        </div>
        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
          <h4 className="text-lg font-semibold text-pink-700 mb-1">Storyteller (S) as Sovereign Center</h4>
          <p className="text-gray-600 text-sm">Maintains control and agency over their narrative while engaging in beneficial exchanges with network participants.</p>
        </div>
        <ul className="space-y-2">
          <li><span className="font-bold text-pink-700">Network Ecosystem:</span> <span className="text-gray-700">Information flows through dynamic, living relationships</span></li>
          <li><span className="font-bold text-pink-700">Storyteller Sovereignty:</span> <span className="text-gray-700">People maintain control over their narratives and how they're used</span></li>
          <li><span className="font-bold text-pink-700">Value Reciprocity:</span> <span className="text-gray-700">Benefits flow to all participants in the ecosystem</span></li>
        </ul>
      </div>
    </div>
    <div className="text-center italic text-lg text-gray-600 mt-8 max-w-2xl mx-auto">
      "The methodology we choose shapes not just what stories we hear, but who tells them, who benefits from them, and ultimately, what kind of world they help create."
    </div>
  </section>
);

export default NarrativeMethodologyComparison; 
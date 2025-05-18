import React, { useState } from 'react';

// Main component
const ProximityCartography = () => {
  const [activePhase, setActivePhase] = useState('assessment');
  
  // Define the different phases in the proximity journey
  const phases = [
    { id: 'assessment', label: 'Assessment' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'transformation', label: 'Transformation' }
  ];
  
  return (
    <>
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Proximity Cartography</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visualizing and navigating the distance between philanthropic institutions and communities to foster
              transformative partnership and systems change.
            </p>
          </header>
          
          {/* Phase navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activePhase === phase.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActivePhase(phase.id)}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Main visualization */}
          <div className="relative bg-gradient-to-b from-blue-50 to-green-50 rounded-xl p-8 mb-8">
            <ProximityMap phase={activePhase} />
          </div>
          
          {/* Context and explanation */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-indigo-800 mb-3">What Is Proximity?</h2>
              <p className="text-gray-700 mb-4">
                Proximity is both a physical and conceptual measure of how close philanthropic actors are to the 
                communities and issues they seek to impact. True proximity encompasses shared understanding, trust,
                aligned values, and balanced power dynamics.
              </p>
              <p className="text-gray-700">
                In the context of systems change, proximity is essential for developing solutions that are 
                responsive to lived realities rather than theoretical constructs or distant assumptions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-indigo-800 mb-3">Why Mapping Matters</h2>
              <p className="text-gray-700 mb-4">
                Proximity Cartography provides a framework for philanthropic organizations to assess and improve 
                their relationships with communities. It helps identify disconnects, reveal opportunities for deeper
                engagement, and measure progress toward more equitable partnerships.
              </p>
              <p className="text-gray-700">
                This mapping process illuminates the journey from transaction-based philanthropy to transformative 
                collaboration that shifts systems and redistributes power.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProximityCartographyMobile />
    </>
  );
};

// The main visualization component that changes based on the active phase
const ProximityMap = ({ phase }) => {
  // Phase-specific configurations
  const phaseConfigs = {
    assessment: {
      gapWidth: 'w-3/4', // Large gap
      perspectives: [
        { side: 'privilege', text: 'Rigid evaluation frameworks determine what "success" looks like.' },
        { side: 'privilege', text: 'Decisions made in boardrooms without community input.' },
        { side: 'privilege', text: 'Funding priorities based on institutional theory of change.' },
        { side: 'experience', text: 'Solutions don\'t address underlying systemic barriers.' },
        { side: 'experience', text: 'Short-term programmatic interventions instead of sustainable change.' },
        { side: 'experience', text: 'Program design doesn\'t reflect lived realities.' }
      ],
      bridgeStrength: 'opacity-20', // Weak bridge
      insights: 'In the assessment phase, institutional philanthropy and communities exist in parallel realities with minimal interaction and understanding.'
    },
    engagement: {
      gapWidth: 'w-2/4', // Medium gap
      perspectives: [
        { side: 'privilege', text: 'We\'re creating spaces to hear community voices.' },
        { side: 'privilege', text: 'Our team is spending time in the community.' },
        { side: 'privilege', text: 'We\'re gathering feedback on our initiatives.' },
        { side: 'experience', text: 'They\'re listening, but are they really hearing?' },
        { side: 'experience', text: 'We\'re invited to meetings, but not decision-making.' },
        { side: 'experience', text: 'Our stories are collected, but our expertise isn\'t recognized.' }
      ],
      bridgeStrength: 'opacity-50', // Medium bridge
      insights: 'During engagement, initial connections form but power dynamics remain unbalanced and perspectives may still be misaligned.'
    },
    collaboration: {
      gapWidth: 'w-1/4', // Small gap
      perspectives: [
        { side: 'privilege', text: 'Community members participate in strategy development.' },
        { side: 'privilege', text: 'We\'re co-designing measurement approaches.' },
        { side: 'privilege', text: 'Funding models allow for community leadership.' },
        { side: 'experience', text: 'Our knowledge is being valued alongside academic expertise.' },
        { side: 'experience', text: 'We have meaningful input into how resources are allocated.' },
        { side: 'experience', text: 'Our networks and relationships are recognized as assets.' }
      ],
      bridgeStrength: 'opacity-80', // Strong bridge
      insights: 'Collaboration brings philanthropy and communities closer through shared work, mutual learning, and evolving power dynamics.'
    },
    transformation: {
      gapWidth: 'w-0', // No gap
      perspectives: [
        { side: 'merged', text: 'Funding decisions are made through participatory processes.' },
        { side: 'merged', text: 'Knowledge from lived experience shapes strategy and implementation.' },
        { side: 'merged', text: 'Success is defined collectively and reflects community priorities.' },
        { side: 'merged', text: 'Long-term, trust-based relationships replace transactional interactions.' },
        { side: 'merged', text: 'Resources and power are redistributed to enable community self-determination.' },
        { side: 'merged', text: 'Systems change work addresses root causes rather than symptoms.' }
      ],
      bridgeStrength: 'opacity-100', // Complete bridge
      insights: 'Transformation occurs when the boundaries between philanthropy and community blur, creating new integrated structures and ways of working.'
    }
  };
  
  const config = phaseConfigs[phase];
  
  return (
    <div className="min-h-[500px]">
      <div className="flex justify-between mb-4">
        <h3 className="text-2xl font-bold text-indigo-900">Institutional Philanthropy</h3>
        <h3 className="text-2xl font-bold text-green-800">Community Experience</h3>
      </div>
      
      <div className="relative flex">
        {/* Left side - Privilege */}
        <div className={`bg-indigo-50 rounded-l-lg p-6 ${phase === 'transformation' ? 'w-full' : 'w-2/5'}`}>
          {config.perspectives
            .filter(p => p.side === 'privilege' || p.side === 'merged')
            .map((perspective, index) => (
              <div key={`privilege-${index}`} className="bg-white rounded-lg p-4 shadow-sm mb-3">
                <p className="text-indigo-800">{perspective.text}</p>
              </div>
            ))}
        </div>
        
        {/* The gap */}
        <div className={`${config.gapWidth} flex flex-col justify-center items-center transition-all duration-700 ease-in-out`}>
          {phase !== 'transformation' && (
            <>
              <div className={`w-full h-2 bg-gray-300 ${config.bridgeStrength}`}></div>
              <div className="py-4 px-6 bg-white rounded-lg shadow-md my-4 text-center">
                <span className="font-medium text-purple-800">Deep Listening</span>
              </div>
              <div className={`w-full h-2 bg-gray-300 ${config.bridgeStrength}`}></div>
              <div className="py-4 px-6 bg-white rounded-lg shadow-md my-4 text-center">
                <span className="font-medium text-purple-800">Co-Creation</span>
              </div>
              <div className={`w-full h-2 bg-gray-300 ${config.bridgeStrength}`}></div>
              <div className="py-4 px-6 bg-white rounded-lg shadow-md my-4 text-center">
                <span className="font-medium text-purple-800">Value Redistribution</span>
              </div>
              <div className={`w-full h-2 bg-gray-300 ${config.bridgeStrength}`}></div>
            </>
          )}
        </div>
        
        {/* Right side - Lived Experience */}
        <div className={`bg-green-50 rounded-r-lg p-6 ${phase === 'transformation' ? 'hidden' : 'w-2/5'}`}>
          {config.perspectives
            .filter(p => p.side === 'experience')
            .map((perspective, index) => (
              <div key={`experience-${index}`} className="bg-white rounded-lg p-4 shadow-sm mb-3">
                <p className="text-green-800">{perspective.text}</p>
              </div>
            ))}
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg p-4 text-center">
        <p className="text-lg text-gray-700 italic">{config.insights}</p>
      </div>
      
      {/* Progress indicators */}
      <div className="mt-6 flex justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Proximity:</span> {' '}
          {phase === 'assessment' && 'Minimal'}
          {phase === 'engagement' && 'Emerging'}
          {phase === 'collaboration' && 'Substantial'}
          {phase === 'transformation' && 'Integrated'}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Power Balance:</span> {' '}
          {phase === 'assessment' && 'Highly Asymmetrical'}
          {phase === 'engagement' && 'Asymmetrical'}
          {phase === 'collaboration' && 'Shifting'}
          {phase === 'transformation' && 'Equitable'}
        </div>
      </div>
    </div>
  );
};

// Mobile stepper version
const phaseConfigs = {
  assessment: {
    label: 'Assessment',
    privilege: 'Rigid evaluation frameworks determine what "success" looks like.',
    experience: 'Solutions don\'t address underlying systemic barriers.',
    insight: 'In the assessment phase, institutional philanthropy and communities exist in parallel realities with minimal interaction and understanding.'
  },
  engagement: {
    label: 'Engagement',
    privilege: 'We\'re creating spaces to hear community voices.',
    experience: 'They\'re listening, but are they really hearing?',
    insight: 'During engagement, initial connections form but power dynamics remain unbalanced and perspectives may still be misaligned.'
  },
  collaboration: {
    label: 'Collaboration',
    privilege: 'Community members participate in strategy development.',
    experience: 'Our knowledge is being valued alongside academic expertise.',
    insight: 'Collaboration brings philanthropy and communities closer through shared work, mutual learning, and evolving power dynamics.'
  },
  transformation: {
    label: 'Transformation',
    privilege: 'Funding decisions are made through participatory processes.',
    experience: 'Knowledge from lived experience shapes strategy and implementation.',
    insight: 'Transformation occurs when the boundaries between philanthropy and community blur, creating new integrated structures and ways of working.'
  }
};
const phaseOrder = ['assessment', 'engagement', 'collaboration', 'transformation'];

function ProximityCartographyMobile() {
  const [step, setStep] = useState(0);
  const phaseKey = phaseOrder[step];
  const config = phaseConfigs[phaseKey];
  return (
    <div className="md:hidden px-2 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Proximity Cartography</h1>
      <p className="text-base text-gray-600 text-center mb-6">Visualizing the journey from distance to partnership between philanthropy and communities.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        {phaseOrder.map((k, i) => (
          <div key={k} className={`h-2 w-8 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="text-xs font-semibold uppercase text-indigo-500 mb-2 tracking-wider">Phase {step + 1} of 4</div>
        <div className="text-xl font-bold text-indigo-900 mb-2">{config.label}</div>
        <div className="mb-3">
          <div className="text-sm text-indigo-800 font-semibold mb-1">Institutional Philanthropy</div>
          <div className="bg-indigo-50 rounded p-3 text-indigo-900 text-sm mb-2">{config.privilege}</div>
        </div>
        <div className="mb-3">
          <div className="text-sm text-green-800 font-semibold mb-1">Community Experience</div>
          <div className="bg-green-50 rounded p-3 text-green-900 text-sm mb-2">{config.experience}</div>
        </div>
        <div className="mt-4 text-gray-700 italic text-center text-base">{config.insight}</div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50"
          onClick={() => setStep(s => Math.min(phaseOrder.length - 1, s + 1))}
          disabled={step === phaseOrder.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProximityCartography; 
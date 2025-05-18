import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import StoryGallery from './components/StoryGallery';
import NarrativeSovereigntyJourney from './components/visualizations/NarrativeSovereigntyJourney';
import ValueExchangeEcosystem from './components/visualizations/ValueExchangeEcosystem';
import NarrativeMethodologyComparison from './components/NarrativeMethodologyComparison';
import DeepListeningDepthGauge from './components/visualizations/DeepListeningDepthGauge';
import SystemsChangeDynamicModel from './components/visualizations/SystemsChangeDynamicModel';
import EnsembleEvidenceExplorer from './components/visualizations/EnsembleEvidenceExplorer';
import ProximityCartography from './components/visualizations/ProximityCartography';
import { MobileTabBar } from './components/MobileTabBar';

// Add custom styles for logo glow and glassmorphism
const customStyles = `
@keyframes logo-glow {
  0%, 100% { box-shadow: 0 0 32px 8px #38bdf8, 0 0 0 0 #fff0; }
  50% { box-shadow: 0 0 64px 16px #818cf8, 0 0 0 0 #fff0; }
}
.animate-logo-glow {
  animation: logo-glow 3s ease-in-out infinite;
}
.glassmorphism {
  background: rgba(255,255,255,0.10);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255,255,255,0.18);
}
`;

// Tab navigation component
const TabNavigation = ({ tabs, activeTab, setActiveTab }) => (
  <nav aria-label="Main navigation" className="sticky top-0 z-30 flex justify-center w-full mb-10">
    <div className="flex bg-white/80 backdrop-blur-md rounded-full shadow-lg px-2 py-1 gap-1 border border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-5 py-2 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
            ${activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'}`}
          onClick={() => setActiveTab(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </nav>
);

// Sub-tab navigation component
const SubTabNavigation = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex flex-wrap border-b border-gray-200 mb-6">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={`px-3 py-1.5 font-medium text-sm mr-2 ${
          activeTab === tab.id
            ? 'border-b-2 border-indigo-600 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// Section container
const SectionContainer = ({ children, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-8">
    {title && <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>}
    {description && <p className="text-gray-700 mb-4">{description}</p>}
    {children}
  </div>
);

// Story card component
const StoryCard = ({ title, location, themes, teaser, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
    {image && (
      <div className="h-48 bg-gray-300 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {location}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {themes.map((theme) => (
          <span key={theme} className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
            {theme}
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-sm">{teaser}</p>
    </div>
  </div>
);

// Implementation phase visual components
const DiagramBlock = ({ title, children }) => (
  <div className="bg-white rounded-md p-4 my-6 overflow-auto border border-gray-200 shadow-sm">
    <h4 className="text-lg font-semibold mb-4 text-indigo-700 text-center">{title}</h4>
    <div className="flex justify-center">
      {children}
    </div>
  </div>
);

const Milestone = ({ title, target, children }) => (
  <div className="border-l-2 border-green-500 pl-4 my-4">
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600 mb-2">Target: {target}</p>
    <div className="text-gray-700">{children}</div>
  </div>
);

// Data for visualizations
const metricData = [
  { name: 'Q1', storytellers: 10, partners: 2, impact: 5 },
  { name: 'Q2', storytellers: 50, partners: 5, impact: 15 },
  { name: 'Q3', storytellers: 100, partners: 10, impact: 30 },
  { name: 'Year 1', storytellers: 250, partners: 25, impact: 60 },
  { name: 'Year 2', storytellers: 1000, partners: 50, impact: 120 },
  { name: 'Year 3', storytellers: 10000, partners: 250, impact: 350 },
];

const trainingModulesData = [
  { name: 'Narrative Interviewing', value: 25 },
  { name: 'Power Dynamics Awareness', value: 25 },
  { name: 'Reflective Practice', value: 20 },
  { name: 'Ethical Engagement', value: 20 },
  { name: 'Specialized Modules', value: 10 },
];

const ethicalStorytellingData = [
  { name: 'Consent Framework', value: 95, fill: '#8884d8' },
  { name: 'Value Exchange', value: 85, fill: '#83a6ed' },
  { name: 'Impact Measurement', value: 75, fill: '#8dd1e1' },
  { name: 'Story Protection', value: 90, fill: '#82ca9d' },
];

const evidenceEnsembleData = [
  { name: 'Qualitative', value: 400, fill: '#8884d8' },
  { name: 'Quantitative', value: 300, fill: '#83a6ed' },
  { name: 'Narrative', value: 300, fill: '#8dd1e1' },
  { name: 'Integration', value: 200, fill: '#82ca9d' },
];

const governanceData = [
  { name: 'Storyteller Communities', value: 60, fill: '#8884d8' },
  { name: 'Technical Experts', value: 15, fill: '#83a6ed' },
  { name: 'Platform Team', value: 10, fill: '#8dd1e1' },
  { name: 'Institutional Partners', value: 15, fill: '#82ca9d' },
];

const certificationData = [
  { name: 'Narrative Sovereignty', value: 35 },
  { name: 'Value Distribution', value: 30 },
  { name: 'Listening Practices', value: 25 },
  { name: 'Ethical Technology', value: 10 },
];

const systemicChangeData = [
  { name: 'Power Dynamics', value: 90 },
  { name: 'Resource Flows', value: 75 },
  { name: 'Policy Practices', value: 85 },
  { name: 'Institutional Relationships', value: 80 },
  { name: 'Narrative Environment', value: 95 },
];

// Sample stories data - will be replaced with real stories
const sampleStories = [
  {
    id: 1,
    title: "Sharing Without Surrendering: Elizabeth's Housing Advocacy",
    location: "Oakland, California",
    themes: ["Housing Rights", "Narrative Sovereignty", "Policy Change"],
    teaser: "How a community housing advocate maintained control of her story while influencing municipal policy...",
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "The Kakuma Storytelling Collective",
    location: "Kakuma Refugee Camp, Kenya",
    themes: ["Refugee Narratives", "Collective Storytelling", "Value Distribution"],
    teaser: "Creating equitable value exchange through a refugee-led story banking system...",
    image: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "Health Stories that Heal: Indigenous Health Knowledge",
    location: "Northern Territory, Australia",
    themes: ["Indigenous Knowledge", "Health Narratives", "Ensemble Evidence"],
    teaser: "Combining traditional healing stories with clinical data to transform rural healthcare...",
    image: "/api/placeholder/600/400"
  },
];

// Sample organization assessment data
const sampleAssessment = {
  organization: "Horizon Foundation",
  dimensions: [
    { name: "Suspension of Judgment", score: 3.2 },
    { name: "Emotional Awareness", score: 2.8 },
    { name: "Diverse Perspectives", score: 3.5 },
    { name: "Power Dynamics", score: 2.2 },
    { name: "Narrative Integration", score: 3.0 },
    { name: "Action on Feedback", score: 2.7 }
  ]
};

// Main component
const EmpathyLedgerImplementation = () => {
  // State for main tabs
  const [activeMainTab, setActiveMainTab] = useState('vision');
  // States for sub-tabs in each phase
  const [activePhase1Tab, setActivePhase1Tab] = useState('overview');
  const [activePhase2Tab, setActivePhase2Tab] = useState('overview');
  const [activePhase3Tab, setActivePhase3Tab] = useState('overview');

  // Main tab definitions
  const mainTabs = [
    { id: 'vision', label: 'Vision & Principles' },
    { id: 'phase1', label: 'Phase 1' },
    { id: 'phase2', label: 'Phase 2' },
    { id: 'phase3', label: 'Phase 3' },
    { id: 'visualisations', label: 'Visualisations' },
    { id: 'impact', label: 'Projected Impact' },
    { id: 'invest', label: 'Investment Opportunities' },
    { id: 'gallery', label: 'Gallery' },
  ];

  // Sub-tab definitions for Phase 1
  const phase1Tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'storylistening', label: 'Storylistening Capabilities' },
    { id: 'infrastructure', label: 'Ethical Infrastructure' },
    { id: 'stories', label: 'Story Gallery' },
  ];

  // Sub-tab definitions for Phase 2
  const phase2Tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'evidence', label: 'Integrated Evidence' },
    { id: 'governance', label: 'Collaborative Governance' },
    { id: 'stories', label: 'Story Gallery' },
  ];

  // Sub-tab definitions for Phase 3
  const phase3Tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'standards', label: 'Field-Wide Standards' },
    { id: 'measurement', label: 'Transformation Measurement' },
    { id: 'stories', label: 'Story Gallery' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a23] to-[#181830] text-gray-800 font-sans">
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      <header className="flex flex-col items-center justify-center pt-16 pb-10">
        <img
          src="/assets/empathy-ledger-logo.png"
          alt="Empathy Ledger Logo: Two spheres connected by a flowing, luminous path, symbolizing reciprocal value and connection"
          className="w-44 h-44 mb-6 animate-logo-glow"
          style={{ maxWidth: '320px' }}
          tabIndex={0}
        />
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Empathy Ledger</h1>
        <h2 className="text-2xl font-semibold text-indigo-300 mb-6 drop-shadow">Transformative Narrative Exchange Framework</h2>
        <blockquote className="max-w-2xl mx-auto text-lg italic text-indigo-100 glassmorphism px-8 py-4 shadow-lg mb-8">
          "Stories are the threads that connect our human experience. The Empathy Ledger creates a living tapestry where individual narratives intertwine with systems, transforming both storytellers and listeners while illuminating pathways to profound change."
        </blockquote>
        <div className="md:hidden max-w-xs mx-auto mb-6 bg-indigo-900/80 text-indigo-100 text-center text-sm rounded-lg px-4 py-2 shadow-sm">
          This website is primarily scaled for Desktop – head there for the full experience.
        </div>
      </header>
      {/* Desktop/Tablet Navigation */}
      <div className="hidden md:flex">
        <TabNavigation tabs={mainTabs} activeTab={activeMainTab} setActiveTab={setActiveMainTab} />
      </div>
      {/* Mobile Navigation */}
      <MobileTabBar activeTab={activeMainTab} setActiveTab={setActiveMainTab} />

      {/* Vision & Principles Tab */}
      {activeMainTab === 'vision' && (
        <div>
          <SectionContainer title="Our Vision" description="A world where marginalized voices are centered, story sovereignty is preserved, and the impact of narratives becomes measurable, equitable, and transformative.">
            <p className="mb-4">
              The Empathy Ledger represents a paradigm shift in how stories create change in the world. By integrating ethical storytelling practices with innovative value distribution mechanisms, we establish a new ecosystem where those sharing their narratives maintain sovereignty, receive fair compensation, and participate as valued partners in the impact their stories generate.
            </p>
            <p className="mb-4">
              This transformative approach addresses underlying power dynamics in how stories drive social change, moving from storytelling as extraction to storytelling as ethical exchange with measurable, distributed impact.
            </p>
          </SectionContainer>
          <NarrativeMethodologyComparison />

          <SectionContainer title="Core Philosophical Foundations">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Narrative Sovereignty</h3>
                <p className="text-sm">Stories belong to those who live them—storytellers must maintain control over how, where, and by whom their stories are used.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Ethical Value Exchange</h3>
                <p className="text-sm">When stories generate value (financial, social, or reputational), that value must be equitably distributed to those who shared their narratives.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Deep Listening</h3>
                <p className="text-sm">Systems must cultivate "an audience who listen to understand" rather than merely listening to respond.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Ensemble Thinking</h3>
                <p className="text-sm">Stories and data form complementary rather than competing evidence—combining "the strengths of different forms of modelling and knowledge-generation."</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Transformative Connection</h3>
                <p className="text-sm">Stories create change through building empathy, shifting mindsets, and establishing authentic human connection.</p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Measurable Impact</h3>
                <p className="text-sm">The transformative power of stories must be rigorously measured across individual, organizational, and systemic dimensions.</p>
              </div>
            </div>
          </SectionContainer>

          <SectionContainer title="Living Stories" description="Real-world examples demonstrating our principles in action.">
            <div className="mt-8">
              <StoryGallery limit={3} view="ET visual" />
            </div>
          </SectionContainer>
        </div>
      )}

      {/* Phase 1 Tab */}
      {activeMainTab === 'phase1' && (
        <div>
          <SubTabNavigation tabs={phase1Tabs} activeTab={activePhase1Tab} setActiveTab={setActivePhase1Tab} />

          {/* Phase 1 Overview */}
          {activePhase1Tab === 'overview' && (
            <SectionContainer title="Phase 1: Foundation Building" description="Months 1-9">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  The first phase focuses on establishing the essential infrastructure for ethical narrative exchange while building the capacity of institutions to listen deeply and respond authentically to the stories being shared.
                </p>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Key Objectives</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Develop training methodologies for government and philanthropy based on ethnographic techniques</li>
                  <li>Create dedicated storylistening spaces where traditional power dynamics are reimagined</li>
                  <li>Establish Communities of Practice connecting storylisteners across sectors</li>
                  <li>Implement core storytelling platform with fundamental ethical framework</li>
                  <li>Develop blockchain-based value exchange system ensuring transparent compensation</li>
                  <li>Create impact measurement tools that track transformation across individual, organizational, and societal levels</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Expected Outcomes</h4>
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>100+ storytellers receiving fair compensation through ethical exchange mechanisms</li>
                    <li>25+ government and philanthropic leaders trained in deep storylistening practices</li>
                    <li>10+ organizational partners implementing ethical narrative approaches</li>
                    <li>Initial field adoption of ethical standards</li>
                    <li>Beta platform with core functionality demonstrated</li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Implementation Timeline</h4>
                  <div className="relative border-l-2 border-indigo-200 pl-6 ml-6">
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 1-3</h5>
                      <p>Initial ethnographic training program development; storylistening space design; core platform architecture</p>
                    </div>
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 4-6</h5>
                      <p>First cohort training; dedicated storylistening spaces established; beta platform launch</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 7-9</h5>
                      <p>Communities of Practice formation; impact measurement framework deployment; initial field testing</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Storylistening Capabilities */}
          {activePhase1Tab === 'storylistening' && (
            <SectionContainer title="Storylistening Capabilities" description="Building the capacity to hear, understand, and respond authentically to stories">
              <div className="prose max-w-none mb-6">
                <p>
                  The Storylistening Capabilities component focuses on developing the skills, spaces, and practices that enable government and philanthropy to truly listen to the stories being shared. This goes beyond passive reception to active engagement, understanding, and response.
                </p>
              </div>
              
              <DiagramBlock title="Ethnographic Training Framework">
                <div className="w-full max-w-lg">
                  <BarChart width={500} height={300} data={trainingModulesData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Curriculum Weighting (%)" fill="#8884d8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>Ethnographic training modules are customized based on participant roles, with government officials receiving additional policy impact assessment training and philanthropy leaders focusing on funding relationship transformation</p>
                  </div>
                </div>
              </DiagramBlock>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <strong className="text-indigo-700">Assessment & Customization</strong>
                      <p className="text-sm mt-1">Begin with a thorough assessment of the storylistening baseline and specific needs of each participating organization, allowing for tailored training designs</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Immersive Training</strong>
                      <p className="text-sm mt-1">Deliver multi-modal training including theoretical foundations, practical techniques, and experiential learning to develop deep listening capabilities</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Space Creation</strong>
                      <p className="text-sm mt-1">Design and implement dedicated storylistening spaces that reconfigure traditional power dynamics and create conditions for authentic narrative exchange</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Community Building</strong>
                      <p className="text-sm mt-1">Establish Communities of Practice that connect storylisteners across sectors, creating professional networks that support continued learning and improvement</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Training Curriculum Development" target="Month 2">
                  <p>Complete development of comprehensive training modules covering narrative interviewing, power dynamics awareness, reflective practice, and ethical engagement</p>
                </Milestone>
                <Milestone title="Dedicated Storylistening Spaces" target="Month 5">
                  <p>Launch physical and virtual environments where traditional power dynamics are reimagined, enabling authentic dialogue and connection</p>
                </Milestone>
                <Milestone title="Communities of Practice" target="Month 8">
                  <p>Establish networks connecting storylisteners across sectors to share insights, challenges, and emerging best practices</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Sample Transcript Format</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Training Session: Power Dynamics Awareness | Location: Melbourne, Australia | Date: [Date]
                  </div>
                  <div className="border-l-4 border-indigo-300 pl-4 py-2 italic text-gray-700 mb-4">
                    "The most profound shift for me was realizing how much my position influences what stories I hear—and more importantly, what stories people feel safe to tell me. As a funder, I've been trained to listen for certain narratives that fit our metrics and priorities. This training has helped me recognize how that shapes what's shared with me, and how to create space for stories that might challenge my institutional framework."
                  </div>
                  <div className="text-sm text-gray-600">
                    — Foundation Program Officer, Participated in Ethnographic Training Pilot
                  </div>
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Ethical Infrastructure */}
          {activePhase1Tab === 'infrastructure' && (
            <SectionContainer title="Ethical Storytelling Infrastructure" description="Creating the technological and methodological foundation for ethical narrative exchange">
              <div className="prose max-w-none mb-6">
                <p>
                  The Ethical Storytelling Infrastructure provides the technological and methodological backbone for narrative sovereignty, equitable value exchange, and impact measurement. This component ensures that the principles of ethical narrative exchange are embedded in the systems themselves, rather than treated as optional add-ons.
                </p>
              </div>
              
              <DiagramBlock title="Core Platform Components">
                <div className="w-full max-w-lg">
                  <RadialBarChart width={500} height={300} cx={250} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={ethicalStorytellingData}>
                    <RadialBar 
                      label={{ position: 'insideEnd', fill: '#333', fontSize: 12 }}
                      background
                      dataKey="value"
                    />
                    <Tooltip />
                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                  </RadialBarChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>The ethical storytelling infrastructure integrates consent frameworks, value exchange systems, impact measurement tools, and story protection mechanisms to ensure narrative sovereignty</p>
                  </div>
                </div>
              </DiagramBlock>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <strong className="text-indigo-700">Consent Framework Development</strong>
                      <p className="text-sm mt-1">Create consent mechanisms that are revocable, granular, and timebound, ensuring storytellers maintain control over their narratives throughout the process</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Blockchain Value Exchange System</strong>
                      <p className="text-sm mt-1">Implement transparent, auditable value exchange infrastructure that ensures fair compensation when stories generate financial, social, or reputational capital</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Impact Measurement Framework</strong>
                      <p className="text-sm mt-1">Develop tools to track transformation across individual, organizational, and societal levels, creating clear pathways from stories to measurable change</p>
                    </li>
                    <li>
                      <strong className="text-indigo-700">Story Protection Systems</strong>
                      <p className="text-sm mt-1">Design encryption and access control mechanisms that protect stories from unauthorized use while enabling appropriate sharing</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Consent Framework Implementation" target="Month 3">
                  <p>Deploy comprehensive consent system that enables storytellers to specify how, where, and by whom their stories can be used</p>
                </Milestone>
                <Milestone title="Beta Platform Launch" target="Month 6">
                  <p>Release initial version with fundamental ethical framework, consent management, and basic value tracking</p>
                </Milestone>
                <Milestone title="Impact Measurement Framework" target="Month 8">
                  <p>Deploy tools tracking transformation across individual, organizational, and societal levels</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Sample Implementation Case</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Platform Testing: Value Exchange System | Location: Chennai, India | Date: [Date]
                  </div>
                  <div className="text-gray-700 mb-4">
                    <p className="mb-2">The Chennai Community Media Collective tested the value exchange system with 15 local storytellers sharing narratives about urban development. Key findings from the beta implementation:</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Storytellers reported 87% higher satisfaction with compensation transparency compared to previous media engagements</li>
                      <li>Stories were reused by 3 different organizations, with each use triggering automatic value distribution to storytellers</li>
                      <li>Consent violations attempted by one organization were automatically prevented by the system's enforcement mechanisms</li>
                      <li>Storytellers requested more granular control over derivative works, leading to consent framework enhancements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Story Gallery */}
          {activePhase1Tab === 'stories' && (
            <SectionContainer title="Story Gallery" description="Real-world examples demonstrating Phase 1 implementation">
              <div className="prose max-w-none mb-6">
                <p>
                  The following stories illustrate how the Foundation Building phase transforms narrative exchange in communities around the world. These examples demonstrate both the implementation process and the impact of ethical storylistening and infrastructure development.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Story Template</h4>
                    <div className="text-gray-500 mb-4 text-sm">
                      <div><strong>Location:</strong> [City/Region, Country]</div>
                      <div><strong>Context:</strong> [Brief background on the community and specific challenges]</div>
                      <div><strong>Themes:</strong> [Key themes related to Phase 1 implementation]</div>
                      <div><strong>Participating Organizations:</strong> [Key stakeholders involved]</div>
                    </div>
                    <div className="mb-4">
                      <h5 className="font-semibold text-indigo-700 mb-2">Implementation Process</h5>
                      <p className="text-gray-700 text-sm mb-3">[Description of how Phase 1 components were implemented in this context]</p>
                    </div>
                    <div className="mb-4">
                      <h5 className="font-semibold text-indigo-700 mb-2">Challenges & Solutions</h5>
                      <p className="text-gray-700 text-sm mb-3">[Specific obstacles encountered and how they were addressed]</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-indigo-700 mb-2">Outcomes & Insights</h5>
                      <p className="text-gray-700 text-sm mb-3">[Measurable results and key learnings from the implementation]</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4">
                    <h5 className="font-semibold text-gray-700 mb-2">Voices from the Community</h5>
                    <div className="border-l-4 border-indigo-300 pl-4 py-2 italic text-gray-600">
                      "Add direct quotes from storytellers, storylisteners, or community members that illustrate the impact of the implementation."
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-300 flex items-center justify-center">
                    <div className="text-gray-500">
                      [Placeholder for story-related image or visualization]
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Add Your Story</h4>
                    <p className="text-gray-700 mb-4">
                      This framework is designed to be populated with real-world implementation stories. Each story should include:
                    </p>
                    <ul className="text-gray-700 space-y-2 list-disc pl-5">
                      <li>Detailed contextual information</li>
                      <li>Specific implementation processes</li>
                      <li>Challenges encountered and solutions developed</li>
                      <li>Measurable outcomes and key learnings</li>
                      <li>Direct voices from the community</li>
                      <li>Supporting visuals where appropriate</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-500 italic">
                      Stories should highlight both successes and setbacks, creating an authentic record of the implementation journey.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Ready to Add Your Implementation Story?</h4>
                <p className="mb-4">If you've been involved in implementing any aspect of Phase 1, we invite you to contribute your story to this gallery.</p>
                <div className="text-indigo-700 font-medium">Contact: [Implementation Team Contact Details]</div>
              </div>
            </SectionContainer>
          )}
        </div>
      )}

      {/* Phase 2 Tab */}
      {activeMainTab === 'phase2' && (
        <div>
          <SubTabNavigation tabs={phase2Tabs} activeTab={activePhase2Tab} setActiveTab={setActivePhase2Tab} />

          {/* Phase 2 Overview */}
          {activePhase2Tab === 'overview' && (
            <SectionContainer title="Phase 2: Ecosystem Development" description="Months 10-18">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  The second phase focuses on creating collaborative governance structures and integrated methodologies needed for stories to drive meaningful systems change. This phase builds on the foundation established in Phase 1, expanding reach and deepening impact.
                </p>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Key Objectives</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Develop methodologies that combine qualitative and quantitative insights</li>
                  <li>Create visualization tools that make story insights accessible to decision-makers</li>
                  <li>Build capacity for "tension navigation" when stories and data present different pictures</li>
                  <li>Establish multi-stakeholder Ethics Council with majority representation from storyteller communities</li>
                  <li>Implement transparent documentation of ethical decisions and precedents</li>
                  <li>Create accountability mechanisms ensuring ongoing alignment with core values</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Expected Outcomes</h4>
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>1,000+ storytellers across diverse communities participating in the ecosystem</li>
                    <li>100+ government and philanthropic leaders practicing ensemble approaches to evidence</li>
                    <li>50+ organizational partners spanning multiple sectors</li>
                    <li>Comprehensive measurement demonstrating multi-level impact</li>
                    <li>Collaborative governance structures established and functioning</li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Implementation Timeline</h4>
                  <div className="relative border-l-2 border-indigo-200 pl-6 ml-6">
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 10-12</h5>
                      <p>Ethics Council formation; integrated evidence framework development; expansion to new regions</p>
                    </div>
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 13-15</h5>
                      <p>Decision-maker visualization tools deployment; tension navigation framework; ethical decision repository</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 16-18</h5>
                      <p>Expansion to 50+ organizational partners; comprehensive field evaluation; preparation for Phase 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Integrated Evidence */}
          {activePhase2Tab === 'evidence' && (
            <SectionContainer title="Integrated Evidence Approaches" description="Creating ensembles of evidence that honor both quantitative rigor and narrative richness">
              <div className="prose max-w-none mb-6">
                <p>
                  The Integrated Evidence component develops methodologies for combining qualitative and quantitative insights, creating holistic understanding that respects both scientific approaches and narrative evidence. This work addresses the perceived superiority of quantitative data while enhancing the credibility and impact of stories.
                </p>
              </div>
              
              <DiagramBlock title="Ensemble Evidence Framework">
                <div className="w-full max-w-lg">
                  <PieChart width={500} height={300}>
                    <Pie
                      data={evidenceEnsembleData}
                      cx={250}
                      cy={150}
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {evidenceEnsembleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>The Ensemble Evidence Framework integrates multiple forms of knowledge, creating a holistic understanding that respects both quantitative rigor and narrative richness</p>
                  </div>
                </div>
              </DiagramBlock>
              
              {/* Placeholder for additional content related to Integrated Evidence */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                {/* Implementation approach for this component would go here */}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Decision-Maker Visualization Tools" target="Month 12">
                  <p>Deploy tools making story insights accessible to decision-makers while preserving complexity and nuance</p>
                </Milestone>
                <Milestone title="Tension Navigation Framework" target="Month 15">
                  <p>Develop methodologies for navigating tensions when stories and data present different pictures</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Story Template</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {/* Placeholder for story template related to Integrated Evidence */}
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Collaborative Governance */}
          {activePhase2Tab === 'governance' && (
            <SectionContainer title="Collaborative Governance" description="Establishing inclusive decision-making structures that transform traditional power dynamics">
              <div className="prose max-w-none mb-6">
                <p>
                  The Collaborative Governance component establishes ethical decision-making structures that transform traditional power dynamics, ensuring that those most affected by decisions have the greatest voice in shaping policies and practices.
                </p>
              </div>
              
              <DiagramBlock title="Ethics Council Composition">
                <div className="w-full max-w-lg">
                  <PieChart width={500} height={300}>
                    <Pie
                      data={governanceData}
                      cx={250}
                      cy={150}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {governanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>The Ethics Council ensures that storyteller communities maintain majority representation, transforming traditional power dynamics and ensuring ethical decisions are guided by those most affected</p>
                  </div>
                </div>
              </DiagramBlock>
              
              {/* Placeholder for additional content related to Collaborative Governance */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                {/* Implementation approach for this component would go here */}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Ethics Council Formation" target="Month 10">
                  <p>Establish council with majority representation from storyteller communities and transparent governance protocols</p>
                </Milestone>
                <Milestone title="Ethical Decision Repository" target="Month 14">
                  <p>Create public record of ethical decisions, precedents, and reasoning to guide future practice</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Story Template</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {/* Placeholder for story template related to Collaborative Governance */}
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Story Gallery */}
          {activePhase2Tab === 'stories' && (
            <SectionContainer title="Story Gallery" description="Real-world examples demonstrating Phase 2 implementation">
              {/* Similar structure to Phase 1 Story Gallery, with appropriate modifications for Phase 2 */}
              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Ready to Add Your Implementation Story?</h4>
                <p className="mb-4">If you've been involved in implementing any aspect of Phase 2, we invite you to contribute your story to this gallery.</p>
                <div className="text-indigo-700 font-medium">Contact: [Implementation Team Contact Details]</div>
              </div>
            </SectionContainer>
          )}
        </div>
      )}

      {/* Phase 3 Tab */}
      {activeMainTab === 'phase3' && (
        <div>
          <SubTabNavigation tabs={phase3Tabs} activeTab={activePhase3Tab} setActiveTab={setActivePhase3Tab} />

          {/* Phase 3 Overview */}
          {activePhase3Tab === 'overview' && (
            <SectionContainer title="Phase 3: Systemic Transformation" description="Months 19-30">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  The final phase focuses on fundamentally transforming how stories create change while ensuring dignity, equity, and measurable impact. This phase solidifies the innovations from earlier phases into field-wide standards and sustainable practices.
                </p>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Key Objectives</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Establish new norms for ethical narrative practices across philanthropy and government</li>
                  <li>Develop certification frameworks recognizing excellence in storylistening</li>
                  <li>Create repositories of best practices and case studies</li>
                  <li>Expand platform to operate at scale across sectors and regions</li>
                  <li>Implement sustainable business model with diversified revenue streams</li>
                  <li>Document systemic changes in narrative practices</li>
                  <li>Track shifts in power dynamics between storytellers and institutional actors</li>
                  <li>Measure concrete policy and practice changes resulting from narrative approaches</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-2">Expected Outcomes</h4>
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>10,000+ storytellers globally with demonstrated agency and compensation</li>
                    <li>500+ government and philanthropic leaders trained in storylistening</li>
                    <li>250+ organizational partners across regions and sectors</li>
                    <li>Documented systemic change in narrative practices and power dynamics</li>
                    <li>Sustainable field-wide standards established and adopted</li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Implementation Timeline</h4>
                  <div className="relative border-l-2 border-indigo-200 pl-6 ml-6">
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 19-22</h5>
                      <p>Certification framework launch; global platform scaling; field-wide standards development</p>
                    </div>
                    <div className="mb-8 relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 23-26</h5>
                      <p>Systems change dashboard deployment; best practices repository; transformation case studies</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                      <h5 className="font-bold text-indigo-800">Months 27-30</h5>
                      <p>Comprehensive impact evaluation; sustainable business model implementation; transition to ongoing operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Field-Wide Standards */}
          {activePhase3Tab === 'standards' && (
            <SectionContainer title="Field-Wide Standards" description="Establishing new norms for ethical narrative practices across philanthropy and government">
              <div className="prose max-w-none mb-6">
                <p>
                  The Field-Wide Standards component establishes new norms for ethical narrative practices, creating certification frameworks and repositories of best practices that drive sector-wide transformation in how stories are gathered, shared, and used.
                </p>
              </div>
              
              <DiagramBlock title="Certification Framework Elements">
                <div className="w-full max-w-lg">
                  <BarChart width={500} height={300} data={certificationData} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Assessment Weighting (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>The certification framework prioritizes narrative sovereignty and value distribution, ensuring that organizations seeking recognition must demonstrate excellence in honoring storyteller agency</p>
                  </div>
                </div>
              </DiagramBlock>
              
              {/* Placeholder for additional content related to Field-Wide Standards */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                {/* Implementation approach for this component would go here */}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Certification Framework Launch" target="Month 22">
                  <p>Deploy system recognizing excellence in ethical narrative practices and storylistening capabilities</p>
                </Milestone>
                <Milestone title="Best Practices Repository" target="Month 26">
                  <p>Create comprehensive collection of methodologies, case studies, and implementation guides</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Story Template</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {/* Placeholder for story template related to Field-Wide Standards */}
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Transformation Measurement */}
          {activePhase3Tab === 'measurement' && (
            <SectionContainer title="Transformation Measurement" description="Tracking and documenting systems change resulting from ethical narrative approaches">
              <div className="prose max-w-none mb-6">
                <p>
                  The Transformation Measurement component creates robust methodologies for tracking and documenting systems change resulting from ethical narrative approaches, ensuring that the impact of stories can be rigorously assessed and demonstrated.
                </p>
              </div>
              
              <DiagramBlock title="Systemic Change Dimensions">
                <div className="w-full max-w-lg">
                  <RadarChart width={500} height={400} cx={250} cy={200} outerRadius={150} data={systemicChangeData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Tooltip />
                    <Radar name="Systemic Transformation Coverage" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    <p>The Systemic Change Measurement framework tracks transformation across multiple dimensions, ensuring comprehensive understanding of how narratives reshape power dynamics, resource flows, and institutional practices</p>
                  </div>
                </div>
              </DiagramBlock>
              
              {/* Placeholder for additional content related to Transformation Measurement */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Implementation Approach</h4>
                {/* Implementation approach for this component would go here */}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Key Milestones</h4>
                <Milestone title="Systems Change Dashboard" target="Month 24">
                  <p>Deploy comprehensive measurement framework tracking narrative-driven transformation across systems</p>
                </Milestone>
                <Milestone title="Transformation Case Studies" target="Month 28">
                  <p>Document concrete examples of systems change resulting from ethical narrative approaches</p>
                </Milestone>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-700">Story Template</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {/* Placeholder for story template related to Transformation Measurement */}
                </div>
              </div>
            </SectionContainer>
          )}

          {/* Story Gallery */}
          {activePhase3Tab === 'stories' && (
            <SectionContainer title="Story Gallery" description="Real-world examples demonstrating Phase 3 implementation">
              {/* Similar structure to Phase 1 Story Gallery, with appropriate modifications for Phase 3 */}
              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Ready to Add Your Implementation Story?</h4>
                <p className="mb-4">If you've been involved in implementing any aspect of Phase 3, we invite you to contribute your story to this gallery.</p>
                <div className="text-indigo-700 font-medium">Contact: [Implementation Team Contact Details]</div>
              </div>
            </SectionContainer>
          )}
        </div>
      )}

      {/* Projected Impact Tab */}
      {activeMainTab === 'impact' && (
        <SectionContainer title="Projected Growth & Impact" description="Measuring transformation across multiple dimensions">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Key Metrics Growth</h3>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={metricData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="storytellers" stroke="#8884d8" activeDot={{ r: 8 }} name="Active Storytellers" />
                  <Line type="monotone" dataKey="partners" stroke="#82ca9d" name="Organizational Partners" />
                  <Line type="monotone" dataKey="impact" stroke="#ffc658" name="Impact Score (0-500)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">Phase 1 Outcomes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>100+ storytellers receiving fair compensation</li>
                <li>25+ government and philanthropic leaders trained</li>
                <li>10+ organizational partners implementing ethical approaches</li>
                <li>Initial field adoption of ethical standards</li>
                <li>Beta platform with core functionality</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">Phase 2 Outcomes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>1,000+ storytellers participating globally</li>
                <li>100+ government and philanthropic leaders practicing ensemble approaches</li>
                <li>50+ organizational partners spanning multiple sectors</li>
                <li>Comprehensive measurement framework deployed</li>
                <li>Collaborative governance structures established</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">Phase 3 Outcomes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>10,000+ storytellers with agency and compensation</li>
                <li>500+ government and philanthropic leaders trained</li>
                <li>250+ organizational partners across regions</li>
                <li>Documented systemic change in practice and power dynamics</li>
                <li>Sustainable field-wide standards established</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Transformation Dimensions</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Individual Empowerment</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Storytellers gain agency and control over personal narratives</li>
                  <li>Fair compensation when stories create value</li>
                  <li>Recognition of expertise through lived experience</li>
                  <li>New pathways for influence and impact</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Institutional Evolution</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Government and philanthropy develop deeper storylistening capabilities</li>
                  <li>Organizations move beyond "listening to respond" toward "listening to understand"</li>
                  <li>Evidence-based approaches integrate narrative and quantitative insights</li>
                  <li>Ethical frameworks guide decision-making across sectors</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Field Transformation</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>New standards for ethical storytelling and listening practices</li>
                  <li>Collaborative infrastructure connecting storytellers and storylisteners</li>
                  <li>Equitable value distribution models</li>
                  <li>Cross-sector alignment around narrative approaches</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-3 text-indigo-700">Systemic Change</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Amplification of marginalized voices in shaping collective understanding</li>
                  <li>Redistribution of power from institutions to communities</li>
                  <li>Measurable shifts in policies, practices, and resource flows</li>
                  <li>Increased empathy and connection across social boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionContainer>
      )}

      {/* Investment Opportunities Tab */}
      {activeMainTab === 'invest' && (
        <SectionContainer title="Investment Pathways" description="Opportunities to support the transformation of narrative exchange">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-600">
              <h3 className="text-xl font-bold mb-2 text-purple-700">Transformation Partner</h3>
              <p className="text-2xl font-semibold mb-4">$500,000+</p>
              <ul className="text-gray-700 space-y-2">
                <li>• Strategic Advisory Council representation</li>
                <li>• Implementation priority influence</li>
                <li>• Comprehensive impact reporting</li>
                <li>• Recognition as founding visionary</li>
                <li>• Dedicated strategic advisor</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Change Catalyst</h3>
              <p className="text-2xl font-semibold mb-4">$250,000-$499,999</p>
              <ul className="text-gray-700 space-y-2">
                <li>• Priority training & tools access</li>
                <li>• Implementation milestone briefings</li>
                <li>• Customized impact dashboard</li>
                <li>• Platform material recognition</li>
                <li>• Learning community membership</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
              <h3 className="text-xl font-bold mb-2 text-green-700">Innovation Supporter</h3>
              <p className="text-2xl font-semibold mb-4">$100,000-$249,999</p>
              <ul className="text-gray-700 space-y-2">
                <li>• Regular implementation updates</li>
                <li>• Learning event access</li>
                <li>• Digital material recognition</li>
                <li>• Standard impact reporting</li>
                <li>• Community network participation</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-3 text-indigo-800">Multi-Year Commitment Benefits</h3>
            <p className="mb-4">Philanthropists making multi-year commitments receive additional benefits:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="text-gray-700 space-y-2">
                  <li>• Strategic planning participation</li>
                  <li>• Advanced measurement insights access</li>
                </ul>
              </div>
              <div>
                <ul className="text-gray-700 space-y-2">
                  <li>• Field-building initiative influence</li>
                  <li>• Recognition as sustaining partner</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">Call to Transformation</h3>
            <p className="text-gray-800 mb-4">
              At this pivotal moment, the integration of ethical storytelling practices with innovative value distribution mechanisms offers a powerful pathway for addressing our most intractable challenges.
            </p>
            
            <p className="text-gray-800 mb-4">
              This framework provides a comprehensive approach bridging narrative and systemic transformation, practical tools for both storytelling and storylistening, ethical infrastructure ensuring dignity and equity, and measurable pathways connecting stories to tangible change.
            </p>
            
            <p className="text-gray-800 italic">
              In a world increasingly shaped by narratives yet struggling with fragmentation and power imbalances, this framework represents a testament to what becomes possible when we honor sovereignty, build capacity for deep listening, and create the infrastructure for stories to catalyze genuine systems transformation.
            </p>
          </div>
        </SectionContainer>
      )}

      {/* Gallery Tab */}
      {activeMainTab === 'gallery' && (
        <SectionContainer
          title="Storyteller Gallery"
          description="Meet the storytellers and explore their journeys."
        >
          <StoryGallery view="ET visual" />
        </SectionContainer>
      )}

      {/* Visualisations Tab */}
      {activeMainTab === 'visualisations' && (
        <>
          <SectionContainer title="Proximity Cartography" description="Visualizing and navigating the distance between philanthropy and communities to foster transformative partnership and systems change.">
            <ProximityCartography />
          </SectionContainer>
          <SectionContainer title="Ensemble Evidence Explorer" description="Integrating qualitative, quantitative, and narrative evidence for holistic understanding">
            <EnsembleEvidenceExplorer width={800} height={500} />
          </SectionContainer>
          <SectionContainer title="Narrative Sovereignty Visualization" description="Tracking how stories maintain integrity and control through their journey">
            <NarrativeSovereigntyJourney width={700} height={450} />
          </SectionContainer>
          <SectionContainer title="Value Exchange Ecosystem" description="Visualizing how stories generate and distribute value">
            <ValueExchangeEcosystem width={800} height={500} />
          </SectionContainer>
          <SectionContainer title="Deep Listening Assessment" description="Visualizing the depth and impact of listening practices">
            <DeepListeningDepthGauge width={900} height={600} organizationAssessment={sampleAssessment} />
          </SectionContainer>
          <SectionContainer title="Systems Change Dynamic Model" description="Visualizing how narrative exchange transforms systems">
            <SystemsChangeDynamicModel width={900} height={600} />
          </SectionContainer>
        </>
      )}
    </div>
  );
};

export default EmpathyLedgerImplementation;
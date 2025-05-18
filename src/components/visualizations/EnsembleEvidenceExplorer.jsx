import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

// Default case study data
const defaultCaseStudies = [
  {
    id: "cs1",
    title: "Melbourne Youth Justice Reform",
    context: "High rates of youth incarceration, particularly among Indigenous populations",
    challenge: "Policymakers resistant to reform despite extensive data on negative outcomes",
    evidenceTypes: [
      {
        type: "quantitative",
        name: "Statistical Analysis",
        description: "Analysis of recidivism rates across different intervention types",
        impact: "Demonstrated 85% higher recidivism for incarceration vs. diversion",
        strength: 80
      },
      {
        type: "qualitative",
        name: "Program Evaluation",
        description: "Evaluations of alternative justice programs",
        impact: "Identified key success factors across different program models",
        strength: 75
      },
      {
        type: "narrative",
        name: "Youth Stories",
        description: "First-person accounts from youth with justice system contact",
        impact: "Revealed systemic barriers to rehabilitation not visible in data",
        strength: 90
      }
    ],
    tension: "Statistical analysis showed some diversion programs performed worse than others, while youth narratives uniformly preferred any diversion to incarceration",
    resolution: "Created a hybrid evidence model that used statistics to optimize programs while using narratives to prioritize diversion approaches",
    outcome: "Policy reform combining diversion with enhanced support services, resulting in 47% reduction in youth incarceration over three years",
    quote: "The numbers told us what worked, but the stories told us why it worked. We needed both to design effective reforms."
  },
  {
    id: "cs2",
    title: "Rural Healthcare Access Initiative",
    context: "Limited healthcare access in remote farming communities",
    challenge: "Data showed high need but conventional models financially unsustainable",
    evidenceTypes: [
      {
        type: "quantitative",
        name: "Geospatial Analysis",
        description: "Mapping of healthcare deserts and transportation barriers",
        impact: "Identified 32 communities with critical access barriers",
        strength: 85
      },
      {
        type: "qualitative",
        name: "Provider Interviews",
        description: "Structured interviews with rural healthcare providers",
        impact: "Documented barriers to recruitment and retention",
        strength: 70
      },
      {
        type: "narrative",
        name: "Community Health Stories",
        description: "Recorded experiences of rural residents seeking care",
        impact: "Revealed patterns of delayed care causing preventable emergencies",
        strength: 85
      }
    ],
    tension: "Cost-benefit analysis suggested centralizing services, while community narratives emphasized need for local access points",
    resolution: "Developed a hybrid model combining centralized specialty care with distributed primary care, informed by community priorities",
    outcome: "Implementation of mobile health units and telehealth hubs, resulting in 68% improvement in preventative care access",
    quote: "The difference was striking - when we designed based on community stories first, then optimized with data, we created solutions that actually got used."
  },
  {
    id: "cs3",
    title: "Indigenous Climate Adaptation Strategy",
    context: "Increasing climate impacts on coastal Indigenous communities",
    challenge: "Scientific projections not aligned with community priorities and knowledge",
    evidenceTypes: [
      {
        type: "quantitative",
        name: "Climate Modeling",
        description: "Projected impacts of sea level rise and extreme weather",
        impact: "Identified high-risk zones requiring immediate intervention",
        strength: 75
      },
      {
        type: "qualitative",
        name: "Cultural Site Assessment",
        description: "Mapping of culturally significant areas at risk",
        impact: "Prioritized protection of sacred and community gathering areas",
        strength: 80
      },
      {
        type: "narrative",
        name: "Elder Knowledge",
        description: "Traditional ecological knowledge from community elders",
        impact: "Provided historical context on prior adaptations and resilience strategies",
        strength: 90
      }
    ],
    tension: "Scientific models recommended relocation of some communities, while Elder narratives emphasized the possibility of adaptation in place",
    resolution: "Co-designed adaptation strategies combining engineering approaches with traditional knowledge",
    outcome: "Implementation of nature-based coastal protection informed by traditional practices, with contingency plans for managed retreat if necessary",
    quote: "The elders' stories provided solutions that weren't visible in our data models. Their narratives weren't just values to consider - they were technical knowledge we had missed."
  }
];

// Default integration approaches
const defaultIntegrationApproaches = [
  {
    id: "approach1",
    name: "Sequential Methodology",
    description: "Starting with quantitative analysis, then using qualitative insights to add context, and finally incorporating narrative elements to deepen understanding",
    steps: [
      "Begin with data analysis to identify patterns and trends",
      "Conduct qualitative research to explore context and meaning",
      "Integrate narrative elements to illuminate lived experience",
      "Synthesize insights across all evidence forms"
    ],
    strengths: [
      "Builds on familiar methodological approaches",
      "Creates clear structure for evidence combination",
      "Accessible to those with traditional research backgrounds"
    ],
    limitations: [
      "May privilege quantitative evidence by positioning it first",
      "Can miss opportunities for narratives to shape initial inquiry",
      "Risk of treating narratives as merely illustrative"
    ]
  },
  {
    id: "approach2",
    name: "Narrative-First Framework",
    description: "Beginning with stories and lived experience, then using other evidence forms to contextualize and validate narrative insights",
    steps: [
      "Start with story-gathering to identify key themes and issues",
      "Analyze narratives to develop initial hypotheses",
      "Test narrative insights with qualitative and quantitative methods",
      "Create integrated evidence narrative centered on lived experience"
    ],
    strengths: [
      "Centers those with direct experience of the system",
      "Identifies issues that might be missed in traditional approaches",
      "Creates strong engagement and ownership from communities"
    ],
    limitations: [
      "May be perceived as less rigorous by traditional institutions",
      "Requires strong facilitation to gather diverse narratives",
      "Can be challenging to systematize across contexts"
    ]
  },
  {
    id: "approach3",
    name: "Tension Navigation Method",
    description: "Deliberately surfacing and exploring tensions between different evidence forms to generate deeper insights",
    steps: [
      "Gather evidence across multiple forms without privileging any single approach",
      "Actively identify areas of tension or contradiction between evidence types",
      "Convene multi-perspective dialogue to explore tensions",
      "Develop nuanced understanding that honors complexity"
    ],
    strengths: [
      "Transforms apparent contradictions into deeper insights",
      "Avoids false consensus or oversimplification",
      "Creates space for multiple valid perspectives"
    ],
    limitations: [
      "Can be uncomfortable for those seeking simple answers",
      "Requires skilled facilitation to navigate tensions productively",
      "May appear indecisive to stakeholders seeking clarity"
    ]
  }
];

function EnsembleEvidenceExplorerMobile({ integrationApproaches = defaultIntegrationApproaches }) {
  const [step, setStep] = useState(0);
  const approach = integrationApproaches[step];
  return (
    <div className="md:hidden px-2 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Ensemble Evidence Explorer</h1>
      <p className="text-base text-gray-600 text-center mb-6">Explore different ways to integrate evidence for social change.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        {integrationApproaches.map((a, i) => (
          <div key={a.id} className={`h-2 w-8 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="text-xs font-semibold uppercase text-indigo-500 mb-2 tracking-wider">Approach {step + 1} of {integrationApproaches.length}</div>
        <div className="text-xl font-bold text-indigo-900 mb-2">{approach.name}</div>
        <div className="mb-3 text-gray-700">{approach.description}</div>
        <div className="mb-2">
          <div className="text-sm font-semibold text-green-700 mb-1">Strengths</div>
          <ul className="list-disc pl-5 text-sm text-green-900">
            {approach.strengths.slice(0,2).map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="mb-2">
          <div className="text-sm font-semibold text-red-700 mb-1">Limitations</div>
          <ul className="list-disc pl-5 text-sm text-red-900">
            {approach.limitations.slice(0,2).map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.min(integrationApproaches.length - 1, s + 1))} disabled={step === integrationApproaches.length - 1}>Next</button>
      </div>
    </div>
  );
}

const EnsembleEvidenceExplorer = ({
  width = 800,
  height = 500,
  caseStudies = defaultCaseStudies,
  integrationApproaches = defaultIntegrationApproaches
}) => {
  const svgRef = useRef(null);
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'case-study', 'approach'
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeApproach, setActiveApproach] = useState(null);
  const [activeEvidenceType, setActiveEvidenceType] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!svgRef.current || activeView !== 'overview') return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const main = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(innerWidth, innerHeight) * 0.25;
    // Define the three evidence types
    const evidenceTypes = [
      { name: 'Quantitative', color: '#3b82f6', x: centerX - radius * 0.75, y: centerY - radius * 0.5, description: 'Numerical data, statistics, and measurable outcomes.' },
      { name: 'Qualitative', color: '#8b5cf6', x: centerX + radius * 0.75, y: centerY - radius * 0.5, description: 'Themes, patterns, and context from interviews, focus groups, etc.' },
      { name: 'Narrative', color: '#10b981', x: centerX, y: centerY + radius, description: 'Stories, lived experience, and first-person accounts.' }
    ];
    // Draw the evidence type circles
    const circles = main.selectAll('.evidence-type')
      .data(evidenceTypes)
      .enter()
      .append('g')
      .attr('class', 'evidence-type')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        setTooltip({ x: d.x, y: d.y, ...d });
        d3.select(event.currentTarget).select('circle')
          .transition().duration(200)
          .attr('r', radius * 0.75)
          .attr('filter', 'url(#glow)');
      })
      .on('mouseout', (event) => {
        setTooltip(null);
        d3.select(event.currentTarget).select('circle')
          .transition().duration(200)
          .attr('r', radius * 0.6)
          .attr('filter', null);
      });
    circles.append('circle')
      .attr('r', radius * 0.6)
      .attr('fill', d => `${d.color}30`)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2);
    circles.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', d => d.color)
      .text(d => d.name);
    // SVG filter for glow
    svg.append('defs').html(`
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    `);
    // Draw the intersection area
    main.append('path')
      .attr('d', `
        M ${centerX - radius * 0.2} ${centerY - radius * 0.2}
        C ${centerX - radius * 0.3} ${centerY - radius * 0.3}, 
          ${centerX + radius * 0.3} ${centerY - radius * 0.3}, 
          ${centerX + radius * 0.2} ${centerY - radius * 0.2}
        C ${centerX + radius * 0.3} ${centerY}, 
          ${centerX} ${centerY + radius * 0.3}, 
          ${centerX - radius * 0.2} ${centerY - radius * 0.2}
        Z
      `)
      .attr('fill', '#f3f4f6')
      .attr('stroke', '#4b5563')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');
    main.append('text')
      .attr('x', centerX)
      .attr('y', centerY)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#4b5563')
      .text('Ensemble');
    main.append('text')
      .attr('x', centerX)
      .attr('y', centerY + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('fill', '#4b5563')
      .text('Evidence');
    // Add case study markers
    const caseStudyMarkers = main.selectAll('.case-study-marker')
      .data(caseStudies)
      .enter()
      .append('g')
      .attr('class', 'case-study-marker')
      .attr('transform', (d, i) => {
        const angle = (i / caseStudies.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * (radius * 1.2);
        const y = centerY + Math.sin(angle) * (radius * 1.2);
        return `translate(${x}, ${y})`;
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setActiveCaseStudy(d);
        setActiveView('case-study');
      });
    caseStudyMarkers.append('circle')
      .attr('r', 25)
      .attr('fill', '#f9fafb')
      .attr('stroke', '#6366f1')
      .attr('stroke-width', 2);
    caseStudyMarkers.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#4b5563')
      .text((d, i) => `Case ${i + 1}`);
    // Add approach markers
    const approachMarkers = main.selectAll('.approach-marker')
      .data(integrationApproaches)
      .enter()
      .append('g')
      .attr('class', 'approach-marker')
      .attr('transform', (d, i) => {
        const x = centerX - (integrationApproaches.length - 1) * 100 / 2 + i * 100;
        const y = centerY + radius * 1.8;
        return `translate(${x}, ${y})`;
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        setActiveApproach(d);
        setActiveView('approach');
      });
    approachMarkers.append('rect')
      .attr('x', -45)
      .attr('y', -25)
      .attr('width', 90)
      .attr('height', 50)
      .attr('rx', 8)
      .attr('fill', '#f9fafb')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2);
    approachMarkers.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#4b5563')
      .text((d, i) => `Approach ${i + 1}`);
  }, [width, height, caseStudies, integrationApproaches, activeView]);

  // --- Render logic for different views ---
  function renderOverviewView() {
    return (
      <div className="relative w-full max-w-[500px] mx-auto">
        <svg ref={svgRef} width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} />
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-40 bg-white border border-indigo-200 rounded-lg shadow-lg px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm w-full max-w-xs"
              style={{ left: tooltip.x + 60, top: tooltip.y + 40, pointerEvents: 'none' }}
            >
              <div className="font-bold mb-1" style={{ color: tooltip.color }}>{tooltip.name}</div>
              <div className="text-gray-700">{tooltip.description}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  function renderCaseStudyView() {
    if (!activeCaseStudy) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="absolute inset-0 flex items-center justify-center z-30 bg-black/30"
        style={{ minHeight: height }}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-indigo-200 max-w-2xl w-full p-8 relative">
          <button
            className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800 font-bold text-lg"
            onClick={() => { setActiveView('overview'); setActiveCaseStudy(null); }}
            aria-label="Back to overview"
          >
            ×
          </button>
          <div className="mb-2 text-xs text-indigo-500 font-semibold uppercase tracking-wider">Case Study</div>
          <div className="text-2xl font-bold text-indigo-800 mb-2">{activeCaseStudy.title}</div>
          <div className="text-gray-700 mb-2 text-sm">{activeCaseStudy.context}</div>
          <div className="mb-4">
            <span className="font-semibold text-indigo-700">Challenge: </span>
            <span className="text-gray-700">{activeCaseStudy.challenge}</span>
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCaseStudy.evidenceTypes.map((et) => (
              <div key={et.type} className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                <div className="font-semibold text-indigo-700 mb-1">{et.name}</div>
                <div className="text-xs text-gray-700 mb-1">{et.description}</div>
                <div className="text-xs text-gray-600 mb-1">Impact: {et.impact}</div>
                <div className="text-xs text-gray-500">Strength: {et.strength}</div>
              </div>
            ))}
          </div>
          <div className="mb-2 text-sm"><span className="font-semibold text-purple-700">Tension:</span> {activeCaseStudy.tension}</div>
          <div className="mb-2 text-sm"><span className="font-semibold text-green-700">Resolution:</span> {activeCaseStudy.resolution}</div>
          <div className="mb-2 text-sm"><span className="font-semibold text-blue-700">Outcome:</span> {activeCaseStudy.outcome}</div>
          <div className="italic text-indigo-700 mt-4">"{activeCaseStudy.quote}"</div>
        </div>
      </motion.div>
    );
  }

  function renderApproachView() {
    if (!activeApproach) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="absolute inset-0 flex items-center justify-center z-30 bg-black/30"
        style={{ minHeight: height }}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-indigo-200 max-w-2xl w-full p-8 relative">
          <button
            className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800 font-bold text-lg"
            onClick={() => { setActiveView('overview'); setActiveApproach(null); }}
            aria-label="Back to overview"
          >
            ×
          </button>
          <div className="mb-2 text-xs text-indigo-500 font-semibold uppercase tracking-wider">Integration Approach</div>
          <div className="text-2xl font-bold text-indigo-800 mb-2">{activeApproach.name}</div>
          <div className="text-gray-700 mb-4 text-sm">{activeApproach.description}</div>
          <div className="mb-4">
            <div className="font-semibold text-indigo-700 mb-1">Steps:</div>
            <ul className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
              {activeApproach.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold text-green-700 mb-1">Strengths</div>
              <ul className="list-disc pl-5 text-xs text-green-800 space-y-1">
                {activeApproach.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-red-700 mb-1">Limitations</div>
              <ul className="list-disc pl-5 text-xs text-red-800 space-y-1">
                {activeApproach.limitations.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <div className="relative min-h-[500px]">
          {activeView === 'overview' && renderOverviewView()}
          <AnimatePresence>
            {activeView === 'case-study' && renderCaseStudyView()}
            {activeView === 'approach' && renderApproachView()}
          </AnimatePresence>
        </div>
      </div>
      <EnsembleEvidenceExplorerMobile integrationApproaches={integrationApproaches} />
    </>
  );
};

export default EnsembleEvidenceExplorer; 
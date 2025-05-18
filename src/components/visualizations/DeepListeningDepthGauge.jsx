import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';

// Default concentric listening levels
const defaultListeningLevels = [
  {
    level: 1,
    name: "Listening to Respond",
    description: "Focused on formulating a reply rather than understanding",
    characteristics: [
      "Preparing counter-arguments while others speak",
      "Seeking information to confirm existing views",
      "Minimal engagement with differing perspectives"
    ],
    systemicImpact: "Low - Reproduces existing power dynamics",
    color: "#ef4444"
  },
  {
    level: 2,
    name: "Listening to Understand",
    description: "Actively seeking to comprehend the speaker's meaning",
    characteristics: [
      "Asking clarifying questions",
      "Reflecting back what was heard",
      "Suspending judgment temporarily"
    ],
    systemicImpact: "Medium - Creates space for alternative viewpoints",
    color: "#f59e0b"
  },
  {
    level: 3,
    name: "Empathic Listening",
    description: "Connecting with emotional context and lived experience",
    characteristics: [
      "Attending to emotional content",
      "Recognizing unspoken meanings",
      "Acknowledging the speaker's experience"
    ],
    systemicImpact: "Medium-High - Validates marginalized perspectives",
    color: "#3b82f6"
  },
  {
    level: 4,
    name: "Generous Listening",
    description: "Creating space for new possibilities to emerge",
    characteristics: [
      "Suspending assumptions completely",
      "Being comfortable with silence",
      "Allowing for emergence of unexpected insights"
    ],
    systemicImpact: "High - Opens pathways for innovation",
    color: "#8b5cf6"
  },
  {
    level: 5,
    name: "Transformative Listening",
    description: "Allowing oneself to be changed by what is heard",
    characteristics: [
      "Willingness to revise deeply held beliefs",
      "Co-creating meaning with the speaker",
      "Redistributing power through listening practice"
    ],
    systemicImpact: "Very High - Catalyzes systemic transformation",
    color: "#10b981"
  }
];

// Default case studies
const defaultCaseStudies = [
  {
    id: "cs1",
    title: "Melbourne Community Budget Dialogues",
    level: 4,
    context: "Local government initially approached budget consultations as information-sharing sessions",
    transformation: "Shifted to community listening circles where officials participated without speaking until all community members had been heard",
    impact: "Resulted in 40% reallocation of discretionary funds based on previously unheard community priorities",
    quote: "I've sat through budget consultations for 15 years, but this was the first time I felt we weren't just ticking a box - we were genuinely being influenced by community wisdom.",
    quoteAuthor: "City Councilor, Melbourne"
  },
  {
    id: "cs2",
    title: "Indigenous Health Story Circles",
    level: 5,
    context: "Health services in rural Australia struggled to engage Indigenous communities in health planning",
    transformation: "Adopted story circle methodology, with health workers listening without agenda and co-designing solutions with community storytellers",
    impact: "Led to 3x increase in service uptake and new culturally grounded health programs",
    quote: "When they listened to our stories, not just our symptoms, we finally felt seen and respected.",
    quoteAuthor: "Community Elder, Northern Territory"
  }
];

const gaugeSize = 400;
const center = gaugeSize / 2;
const ringWidth = 32;
const animationDuration = 0.8;

// Helper to generate arc path string
function getArcPath(innerR, outerR) {
  const arcGen = d3.arc()
    .innerRadius(innerR)
    .outerRadius(outerR)
    .startAngle(Math.PI)
    .endAngle(2 * Math.PI);
  return arcGen();
}

function DeepListeningDepthGaugeMobile({ listeningLevels = defaultListeningLevels }) {
  const [step, setStep] = useState(0);
  const level = listeningLevels[step];
  return (
    <div className="md:hidden px-2 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Deep Listening Assessment</h1>
      <p className="text-base text-gray-600 text-center mb-6">Explore the levels of deep listening and their impact.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        {listeningLevels.map((l, i) => (
          <div key={l.level} className={`h-2 w-8 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="text-xs font-semibold uppercase text-indigo-500 mb-2 tracking-wider">Level {level.level} of {listeningLevels.length}</div>
        <div className="text-xl font-bold mb-2" style={{ color: level.color }}>{level.name}</div>
        <div className="mb-3 text-gray-700">{level.description}</div>
        <div className="mb-2">
          <div className="text-sm font-semibold text-indigo-700 mb-1">Key Characteristics</div>
          <ul className="list-disc pl-5 text-sm text-gray-900">
            {level.characteristics.slice(0,2).map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        <div className="mb-2 text-xs text-gray-600 italic">Systemic Impact: {level.systemicImpact}</div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.min(listeningLevels.length - 1, s + 1))} disabled={step === listeningLevels.length - 1}>Next</button>
      </div>
    </div>
  );
}

const DeepListeningDepthGauge = ({ organizationAssessment }) => {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const svgRef = useRef();

  // Calculate average listening level from assessment
  const avgLevel = organizationAssessment && organizationAssessment.dimensions
    ? Math.round(
        d3.mean(organizationAssessment.dimensions, d => d.score)
      )
    : 3;

  // Find a case study for the selected or hovered level
  const caseStudy = defaultCaseStudies.find(cs => cs.level === (selectedLevel || hoveredLevel));

  // Animation for the gauge needle
  const needleAngle = (level) => 180 + ((level - 1) / 4) * 180;
  const currentAngle = needleAngle(avgLevel);

  return (
    <>
      <div className="hidden md:block">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-8">
          {/* Gauge Visualization */}
          <div className="relative w-full max-w-[400px] mx-auto">
            <svg
              ref={svgRef}
              width="100%"
              height="auto"
              viewBox={`0 0 ${gaugeSize} ${gaugeSize}`}
            >
              {/* Concentric rings for each level */}
              {defaultListeningLevels.map((level, i) => {
                const innerR = center - (defaultListeningLevels.length - i) * ringWidth;
                const outerR = innerR + ringWidth;
                const arcPath = getArcPath(innerR, outerR);
                return (
                  <g key={level.level}>
                    {arcPath && (
                      <path
                        d={arcPath}
                        fill={level.color}
                        opacity={
                          hoveredLevel === level.level || selectedLevel === level.level
                            ? 0.95
                            : avgLevel >= level.level
                            ? 0.7
                            : 0.25
                        }
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                        onMouseEnter={() => setHoveredLevel(level.level)}
                        onMouseLeave={() => setHoveredLevel(null)}
                        onClick={() => setSelectedLevel(level.level)}
                      />
                    )}
                    {/* Level label */}
                    <text
                      x={center + Math.cos(Math.PI + Math.PI / 5 * i) * (outerR - ringWidth / 2)}
                      y={center + Math.sin(Math.PI + Math.PI / 5 * i) * (outerR - ringWidth / 2) - 10}
                      textAnchor="middle"
                      fontSize={18}
                      fill="#fff"
                      fontWeight={avgLevel === level.level ? 'bold' : 'normal'}
                      style={{ pointerEvents: 'none', textShadow: '0 2px 8px #0008' }}
                    >
                      {level.level}
                    </text>
                  </g>
                );
              })}
              {/* Needle */}
              <motion.line
                x1={center}
                y1={center}
                x2={center + Math.cos((currentAngle * Math.PI) / 180) * (center - ringWidth * 1.2)}
                y2={center + Math.sin((currentAngle * Math.PI) / 180) * (center - ringWidth * 1.2)}
                stroke="#222"
                strokeWidth={6}
                strokeLinecap="round"
                initial={{ rotate: 180 }}
                animate={{
                  rotate: currentAngle,
                  transition: { duration: animationDuration, type: 'spring' }
                }}
                style={{ originX: center, originY: center }}
              />
              {/* Center circle */}
              <circle cx={center} cy={center} r={ringWidth * 0.7} fill="#fff" stroke="#e5e7eb" strokeWidth={3} />
              <text
                x={center}
                y={center + 8}
                textAnchor="middle"
                fontSize={32}
                fontWeight="bold"
                fill="#222"
              >
                {avgLevel}
              </text>
            </svg>
            {/* Tooltip for hovered or selected level */}
            <AnimatePresence>
              {(hoveredLevel || selectedLevel) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 top-2 z-20 bg-white rounded-xl shadow-lg p-4 md:p-6 w-full max-w-xs border border-gray-200"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="font-bold text-lg mb-1" style={{ color: defaultListeningLevels[(hoveredLevel || selectedLevel) - 1].color }}>
                    {defaultListeningLevels[(hoveredLevel || selectedLevel) - 1].name}
                  </div>
                  <div className="text-gray-700 mb-2 text-sm">{defaultListeningLevels[(hoveredLevel || selectedLevel) - 1].description}</div>
                  <ul className="text-xs text-gray-600 mb-2 list-disc pl-5">
                    {defaultListeningLevels[(hoveredLevel || selectedLevel) - 1].characteristics.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 italic">Systemic Impact: {defaultListeningLevels[(hoveredLevel || selectedLevel) - 1].systemicImpact}</div>
                  {caseStudy && (
                    <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="font-semibold text-indigo-700 mb-1">Case Study: {caseStudy.title}</div>
                      <div className="text-xs text-gray-700 mb-1">{caseStudy.context}</div>
                      <div className="text-xs text-gray-700 mb-1">Transformation: {caseStudy.transformation}</div>
                      <div className="text-xs text-gray-700 mb-1">Impact: {caseStudy.impact}</div>
                      <div className="italic text-xs text-indigo-600 mt-2">"{caseStudy.quote}"</div>
                      <div className="text-xs text-gray-500 text-right">— {caseStudy.quoteAuthor}</div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Assessment Radar/Details */}
          <div className="flex-1 min-w-[320px] max-w-md">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
              <div className="font-bold text-lg mb-2 text-indigo-700">Organizational Deep Listening Assessment</div>
              {organizationAssessment ? (
                <>
                  <div className="mb-2 text-gray-700">Organization: <span className="font-semibold">{organizationAssessment.organization}</span></div>
                  <ul className="mb-3 text-sm text-gray-600 space-y-1">
                    {organizationAssessment.dimensions.map((d, i) => (
                      <li key={i}><span className="font-semibold text-indigo-600">{d.name}:</span> {d.score.toFixed(1)}</li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-700 font-semibold">Average Listening Level: <span className="text-indigo-700">{avgLevel}</span></div>
                </>
              ) : (
                <div className="text-gray-500 italic">No assessment data provided.</div>
              )}
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-sm text-indigo-900">
              <div className="font-semibold mb-1">How to use this gauge:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hover or tap on a ring to explore each listening level</li>
                <li>Click a ring to lock details and see a real-world case study</li>
                <li>The gauge needle and number reflect your organization's average assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <DeepListeningDepthGaugeMobile listeningLevels={defaultListeningLevels} />
    </>
  );
};

export default DeepListeningDepthGauge; 
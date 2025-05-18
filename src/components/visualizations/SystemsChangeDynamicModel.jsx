import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

// Default data for system dimensions
const defaultSystemDimensions = [
  {
    id: "power_dynamics",
    name: "Power Dynamics",
    description: "How power is distributed, shared, and exercised",
    baselineLevel: 30,
    transformedLevel: 70,
    narrativeInterventions: [
      {
        id: "power_int1",
        name: "Narrative Authority Redistribution",
        description: "Shifting who controls, owns, and benefits from stories",
        impactScore: 80
      },
      {
        id: "power_int2",
        name: "Power-Aware Storytelling",
        description: "Making visible the hidden power dynamics that shape systems",
        impactScore: 75
      }
    ]
  },
  {
    id: "resource_flows",
    name: "Resource Flows",
    description: "How money, information, and other resources move through the system",
    baselineLevel: 40,
    transformedLevel: 75,
    narrativeInterventions: [
      {
        id: "resource_int1",
        name: "Value Flow Visualization",
        description: "Making visible who benefits from and produces value",
        impactScore: 70
      },
      {
        id: "resource_int2",
        name: "Resource Justice Narratives",
        description: "Stories that highlight and challenge extractive patterns",
        impactScore: 80
      }
    ]
  },
  {
    id: "policy_practices",
    name: "Policy & Practices",
    description: "Formal and informal rules that govern behavior",
    baselineLevel: 45,
    transformedLevel: 85,
    narrativeInterventions: [
      {
        id: "policy_int1",
        name: "Policy Story Bridges",
        description: "Connecting lived experience directly to policy formation",
        impactScore: 85
      },
      {
        id: "policy_int2",
        name: "Practice-Challenging Narratives",
        description: "Stories that make visible the consequences of current practices",
        impactScore: 75
      }
    ]
  },
  {
    id: "rel_connections",
    name: "Relationships & Connections",
    description: "The quality and nature of connections between system actors",
    baselineLevel: 25,
    transformedLevel: 80,
    narrativeInterventions: [
      {
        id: "rel_int1",
        name: "Relational Storytelling",
        description: "Creating spaces for authentic narrative exchange across divides",
        impactScore: 90
      },
      {
        id: "rel_int2",
        name: "Connection Cartography",
        description: "Mapping and visualizing relationship networks and gaps",
        impactScore: 70
      }
    ]
  },
  {
    id: "mental_models",
    name: "Mental Models",
    description: "The underlying beliefs, assumptions and paradigms guiding the system",
    baselineLevel: 20,
    transformedLevel: 65,
    narrativeInterventions: [
      {
        id: "mental_int1",
        name: "Paradigm-Shifting Stories",
        description: "Narratives that challenge fundamental assumptions",
        impactScore: 85
      },
      {
        id: "mental_int2",
        name: "Metaphor Transformation",
        description: "Shifting the core metaphors that shape understanding",
        impactScore: 80
      }
    ]
  }
];

// Default feedback loops in the system
const defaultFeedbackLoops = [
  {
    id: "loop1",
    name: "Narrative Authority Loop",
    description: "As power dynamics shift to center storyteller sovereignty, relationships transform, which in turn further redistributes power",
    connections: ["power_dynamics", "rel_connections", "power_dynamics"],
    reinforcing: true
  },
  {
    id: "loop2",
    name: "Mental Model Transformation Circuit",
    description: "Changes in mental models lead to policy reforms, which alter resource flows, further reinforcing new mental models",
    connections: ["mental_models", "policy_practices", "resource_flows", "mental_models"],
    reinforcing: true
  },
  {
    id: "loop3",
    name: "Resource Justice Cycle",
    description: "More equitable resource flows strengthen relationships, which enable more inclusive policy-making, reinforcing equitable resource distribution",
    connections: ["resource_flows", "rel_connections", "policy_practices", "resource_flows"],
    reinforcing: true
  }
];

const SystemsChangeDynamicModelMobile = ({ systemDimensions = defaultSystemDimensions }) => {
  const [step, setStep] = useState(0);
  const dim = systemDimensions[step];
  const intervention = dim.narrativeInterventions[0];
  return (
    <div className="md:hidden px-2 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Systems Change Model</h1>
      <p className="text-base text-gray-600 text-center mb-6">Explore how narrative interventions transform systems.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        {systemDimensions.map((d, i) => (
          <div key={d.id} className={`h-2 w-8 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="text-xs font-semibold uppercase text-indigo-500 mb-2 tracking-wider">Dimension {step + 1} of {systemDimensions.length}</div>
        <div className="text-xl font-bold text-indigo-900 mb-2">{dim.name}</div>
        <div className="mb-3 text-gray-700">{dim.description}</div>
        <div className="mb-2 text-sm text-gray-700">Baseline Level: <span className="font-semibold text-red-600">{dim.baselineLevel}</span></div>
        <div className="mb-2 text-sm text-gray-700">Transformed Level: <span className="font-semibold text-green-600">{dim.transformedLevel}</span></div>
        <div className="mb-2">
          <div className="text-sm font-semibold text-indigo-700 mb-1">Key Intervention</div>
          <div className="text-gray-900 text-sm font-medium">{intervention.name}</div>
          <div className="text-gray-700 text-xs mb-1">{intervention.description}</div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.min(systemDimensions.length - 1, s + 1))} disabled={step === systemDimensions.length - 1}>Next</button>
      </div>
    </div>
  );
}

const SystemsChangeDynamicModel = ({
  width = 900,
  height = 600,
  systemDimensions = defaultSystemDimensions,
  feedbackLoops = defaultFeedbackLoops
}) => {
  const svgRef = useRef(null);
  const [activeDimension, setActiveDimension] = useState(null);
  const [activeLoop, setActiveLoop] = useState(null);
  const [showTransformed, setShowTransformed] = useState(false);
  const [activeIntervention, setActiveIntervention] = useState(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const main = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Calculate the center of the visualization
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    
    // Calculate the radius of the visualization
    const radius = Math.min(innerWidth, innerHeight) * 0.4;
    
    // Calculate the positions of the dimension nodes in a circle
    const dimensions = systemDimensions.map((dim, i) => {
      const angle = (i / systemDimensions.length) * Math.PI * 2;
      return {
        ...dim,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        angle
      };
    });
    
    // Draw the dimension nodes
    const dimensionGroups = main.selectAll(".dimension")
      .data(dimensions)
      .enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        setActiveDimension(d);
        
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(300)
          .attr("r", 50);
      })
      .on("mouseout", (event) => {
        setActiveDimension(null);
        
        d3.select(event.currentTarget)
          .select("circle")
          .transition()
          .duration(300)
          .attr("r", 45);
      });
    
    // Determine node colors based on dimension level
    const colorScale = d3.scaleLinear()
      .domain([0, 100])
      .range(["#f3f4f6", "#10b981"]);
    
    // Add circles for the dimension nodes
    dimensionGroups.append("circle")
      .attr("r", 45)
      .attr("fill", d => showTransformed ? colorScale(d.transformedLevel) : colorScale(d.baselineLevel))
      .attr("stroke", "#4b5563")
      .attr("stroke-width", 2);
    
    // Add text for the dimension names
    dimensionGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text(d => d.name.split(" ")[0]);
      
    dimensionGroups.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text(d => d.name.split(" ")[1] || "");
      
    // Add a center node
    main.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 60)
      .attr("fill", "#f3f4f6")
      .attr("stroke", "#4b5563")
      .attr("stroke-width", 2);
      
    main.append("text")
      .attr("x", centerX)
      .attr("y", centerY - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text("Narrative");
      
    main.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text("Exchange");
    
    // Draw connections for feedback loops
    const loopLayer = main.append("g").attr("class", "loop-layer");
    
    feedbackLoops.forEach((loop, loopIndex) => {
      const connections = loop.connections;
      const points = [];
      
      // Get the dimension nodes for this loop
      for (let i = 0; i < connections.length; i++) {
        const dimId = connections[i];
        const dimension = dimensions.find(d => d.id === dimId);
        if (dimension) {
          points.push({
            x: dimension.x,
            y: dimension.y,
            dimension
          });
        }
      }
      
      // Create a path for this loop
      if (points.length > 1) {
        const lineGenerator = d3.line()
          .x(d => d.x)
          .y(d => d.y)
          .curve(d3.curveCardinal.tension(0.8));
        
        const loopPath = loopLayer.append("path")
          .attr("d", lineGenerator(points))
          .attr("fill", "none")
          .attr("stroke", loop.reinforcing ? "#3b82f6" : "#ef4444")
          .attr("stroke-width", 3)
          .attr("stroke-dasharray", "5,5")
          .attr("opacity", 0.6)
          .style("cursor", "pointer")
          .on("mouseover", () => {
            setActiveLoop(loop);
            
            d3.select(loopPath)
              .transition()
              .duration(300)
              .attr("stroke-width", 5)
              .attr("opacity", 0.8);
          })
          .on("mouseout", () => {
            setActiveLoop(null);
            
            d3.select(loopPath)
              .transition()
              .duration(300)
              .attr("stroke-width", 3)
              .attr("opacity", 0.6);
          });
        
        // Add arrow markers
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          
          // Calculate the position for the arrow
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          // Calculate a position 75% along the line for the arrow
          const arrowX = p1.x + dx * 0.75;
          const arrowY = p1.y + dy * 0.75;
          
          // Create an arrow
          loopLayer.append("polygon")
            .attr("points", "0,-5 10,0 0,5")
            .attr("transform", `translate(${arrowX}, ${arrowY}) rotate(${angle})`)
            .attr("fill", loop.reinforcing ? "#3b82f6" : "#ef4444")
            .style("pointer-events", "none"); // Make sure hover events go to the path
        }
      }
    });
    
    // Add level indicators to each dimension
    dimensionGroups.append("foreignObject")
      .attr("x", -25)
      .attr("y", 25)
      .attr("width", 50)
      .attr("height", 20)
      .append("xhtml:div")
      .attr("class", "level-indicator")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("background-color", "#f9fafb")
      .style("border", "1px solid #d1d5db")
      .style("border-radius", "9999px")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("color", "#4b5563")
      .text(d => `${showTransformed ? d.transformedLevel : d.baselineLevel}%`);
    
  }, [width, height, systemDimensions, feedbackLoops, showTransformed]);

  return (
    <>
      <div className="hidden md:block">
        <div className="systems-change-dynamic-model-container">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Systems Change Dynamic Model</h3>
            <div className="flex items-center">
              <button
                className={`px-3 py-1 rounded-md text-sm mr-2 ${showTransformed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setShowTransformed(!showTransformed)}
              >
                {showTransformed ? 'View Baseline State' : 'View Transformed State'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <svg ref={svgRef} width={width - 300} height={height}></svg>
                
                {activeLoop && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-xs"
                  >
                    <div className="flex items-center">
                      <div 
                        className={`w-3 h-3 rounded-full mr-2 ${activeLoop.reinforcing ? 'bg-blue-500' : 'bg-red-500'}`}
                      ></div>
                      <h4 className="text-md font-semibold text-gray-800">{activeLoop.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{activeLoop.description}</p>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-500">Type:</span>
                      <span className="text-xs ml-1">{activeLoop.reinforcing ? 'Reinforcing Loop' : 'Balancing Loop'}</span>
                    </div>
                  </motion.div>
                )}
                
                {activeDimension && !activeLoop && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 max-w-xs"
                  >
                    <h4 className="text-md font-semibold text-gray-800">{activeDimension.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{activeDimension.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs font-medium mr-2">
                        {showTransformed ? 'Transformed Level:' : 'Baseline Level:'}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ 
                            width: `${showTransformed ? activeDimension.transformedLevel : activeDimension.baselineLevel}%` 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs">
                        {showTransformed ? activeDimension.transformedLevel : activeDimension.baselineLevel}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full overflow-auto">
                {activeDimension ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">{activeDimension.name}</h4>
                      <button
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                        onClick={() => setActiveDimension(null)}
                      >
                        Back to overview
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Baseline</span>
                        <span>Transformed</span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-green-200 rounded-full" 
                          style={{ width: `${activeDimension.baselineLevel}%` }}
                        ></div>
                        <div 
                          className="absolute h-full bg-green-600 rounded-full" 
                          style={{ width: `${activeDimension.transformedLevel}%`, opacity: 0.7 }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{activeDimension.baselineLevel}%</span>
                        <span>{activeDimension.transformedLevel}%</span>
                      </div>
                    </div>
                    
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Narrative Interventions</h5>
                    <div className="space-y-3">
                      {activeDimension.narrativeInterventions.map((intervention) => (
                        <div 
                          key={intervention.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeIntervention?.id === intervention.id ? 
                              'bg-indigo-50 border-2 border-indigo-200' : 
                              'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                          }`}
                          onClick={() => setActiveIntervention(
                            activeIntervention?.id === intervention.id ? null : intervention
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <h6 className="text-sm font-medium text-gray-800">{intervention.name}</h6>
                            <span className="text-xs text-green-600 font-medium">{intervention.impactScore}%</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{intervention.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">System Dynamics</h4>
                    <p className="text-sm text-gray-600 mb-4">This model visualizes how narrative exchange influences different dimensions of a system, and how these dimensions interact through feedback loops.</p>
                    
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Key Feedback Loops</h5>
                    <div className="space-y-3 mb-4">
                      {feedbackLoops.map((loop) => (
                        <div 
                          key={loop.id}
                          className="p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100"
                          onMouseEnter={() => setActiveLoop(loop)}
                          onMouseLeave={() => setActiveLoop(null)}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`w-3 h-3 rounded-full mr-2 ${loop.reinforcing ? 'bg-blue-500' : 'bg-red-500'}`}
                            ></div>
                            <h6 className="text-sm font-medium text-gray-800">{loop.name}</h6>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{loop.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-gray-700">System State</div>
                        <button
                          className={`px-2 py-1 rounded text-xs ${showTransformed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                          onClick={() => setShowTransformed(!showTransformed)}
                        >
                          {showTransformed ? 'View Baseline' : 'View Transformed'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {showTransformed ? 
                          "The transformed state shows system dimensions after narrative exchange interventions." : 
                          "The baseline state shows system dimensions before narrative exchange interventions."}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>This dynamic model visualizes how narrative exchange influences multiple dimensions of a system simultaneously, creating reinforcing feedback loops that drive transformative change. Hover over system dimensions to see narrative interventions that target each area.</p>
          </div>
        </div>
      </div>
      <SystemsChangeDynamicModelMobile systemDimensions={defaultSystemDimensions} />
    </>
  );
};

export default SystemsChangeDynamicModel; 
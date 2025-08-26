// src/components/charts/SimpleD3Test.jsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SimpleD3Test = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', 400)
      .attr('height', 200)
      .style('background', '#1f2937')
      .style('border-radius', '8px');

    // Create some sample data
    const data = [30, 86, 168, 281, 303, 365];

    // Create a simple bar chart
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', (d) => 200 - d / 2)
      .attr('width', 50)
      .attr('height', (d) => d / 2)
      .attr('fill', '#06b6d4');

    // Add some text labels
    svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 60 + 25)
      .attr('y', (d) => 200 - d / 2 - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px');

  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-cyan-300 mb-2">D3.js Test Chart</h3>
      <svg ref={svgRef}></svg>
      <p className="text-gray-400 text-sm mt-2">
        If you see blue bars with numbers, D3 is working! ✅
      </p>
    </div>
  );
};

export default SimpleD3Test;
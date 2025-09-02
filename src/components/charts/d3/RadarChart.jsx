// src/components/charts/d3/RadarChart.jsx
import React, { useMemo } from 'react';
import * as d3 from 'd3';
import D3BaseChart from './D3BaseChart';

const RadarChart = ({ players, attributes, width = 400, height = 400, className = "" }) => {
  const processedData = useMemo(() => {
    if (!players || !attributes) return null;

    return players.map(player => {
      const stats = player.statistics[0] || {};
      return {
        name: player.player.name,
        values: attributes.map(attr => {
          // Handle nested keys like 'goals.total'
          const value = attr.key.split('.').reduce((obj, key) => obj?.[key], stats) || 0;
          return {
            axis: attr.label,
            value: Math.min(value, attr.max || 100), // Cap at max value
            max: attr.max || 100
          };
        })
      };
    });
  }, [players, attributes]);

  const renderRadar = (svg, g, { innerWidth, innerHeight, data, margin }) => {
    // Now margin is properly received from D3BaseChart
    if (!data || data.length === 0) return;

    const radius = Math.min(innerWidth, innerHeight) / 2 - 20;
    const angleSlice = (Math.PI * 2) / data[0].values.length;

    // Scales - using Tailwind color palette
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    // Axes grid
    const axes = g.append('g').attr('class', 'axes');

    // Grid circles
    const circles = [20, 40, 60, 80, 100];
    circles.forEach(circle => {
      g.append('circle')
        .attr('r', rScale(circle))
        .attr('fill', 'none')
        .attr('stroke', '#4B5563') // gray-600
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');
    });

    // Axis lines and labels
    data[0].values.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const line = d3.line()([[0, 0], [radius * Math.cos(angle), radius * Math.sin(angle)]]);
      
      axes.append('path')
        .attr('d', line)
        .attr('stroke', '#4B5563') // gray-600
        .attr('stroke-width', 1);

      axes.append('text')
        .attr('class', 'text-xs fill-gray-400')
        .attr('x', (radius + 15) * Math.cos(angle))
        .attr('y', (radius + 15) * Math.sin(angle))
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(d.axis);
    });

    // Color scale using Tailwind colors
    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(['#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']); // cyan, emerald, amber, red, violet

    // Draw each player's radar
    data.forEach(player => {
      const lineGenerator = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .angle((d, i) => angleSlice * i - Math.PI / 2)
        .radius(d => rScale(d.value));

      g.append('path')
        .datum(player.values)
        .attr('d', lineGenerator)
        .attr('fill', colorScale(player.name))
        .attr('fill-opacity', 0.15)
        .attr('stroke', colorScale(player.name))
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8);
    });

    // Add data points
    data.forEach(player => {
      player.values.forEach((d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = rScale(d.value) * Math.cos(angle);
        const y = rScale(d.value) * Math.sin(angle);
        
        g.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 4)
          .attr('fill', colorScale(player.name))
          .attr('stroke', '#1F2937') // gray-800
          .attr('stroke-width', 1);
      });
    });

    // Legend - use the margin that was passed in
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right - 120}, ${margin.top})`); // Fixed this line

    data.forEach((player, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`)
        .attr('class', 'cursor-pointer')
        .on('mouseover', function() {
          d3.select(this).select('rect').attr('stroke', '#FFFFFF').attr('stroke-width', '2');
        })
        .on('mouseout', function() {
          d3.select(this).select('rect').attr('stroke', 'none');
        });

      legendGroup.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(player.name))
        .attr('rx', 3);

      legendGroup.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .text(player.name)
        .attr('class', 'text-sm fill-gray-200');
    });
  };

  if (!processedData || processedData.length === 0) {
    return (
      <div className="bg-gray-900/50 rounded-lg p-8 text-center border border-gray-700">
        <div className="text-gray-400">Select players to generate radar comparison</div>
      </div>
    );
  }

  return (
    <D3BaseChart
      data={processedData}
      width={width}
      height={height}
      renderChart={renderRadar}
      className={className}
    />
  );
};

export default RadarChart;
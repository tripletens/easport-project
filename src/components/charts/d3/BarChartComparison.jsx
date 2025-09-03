import React, { useMemo } from 'react';
import * as d3 from 'd3';
import D3BaseChart from './D3BaseChart';

const BarChartComparison = ({ players, attributes, width = 600, height = 400, className = "" }) => {
  const processedData = useMemo(() => {
    if (!players || !attributes) return null;

    return attributes.map(attr => {
      const values = players.map(player => {
        const stats = player.statistics[0] || {};
        const value = attr.key.split('.').reduce((obj, key) => obj?.[key], stats) || 0;
        return {
          player: player.player.name,
          value: Math.min(value, attr.max || 100),
          max: attr.max || 100
        };
      });

      return {
        attribute: attr.label,
        values: values
      };
    });
  }, [players, attributes]);

  const renderBarChart = (svg, g, { innerWidth, innerHeight, data, margin }) => {
    if (!data || data.length === 0) return;

    // we will calculate the maximum value across all data for the y-scale domain
    const maxValue = d3.max(data, attributeData => 
      d3.max(attributeData.values, playerData => playerData.value)
    ) || 100; // we will fallback to 100 if no data

    const paddedMaxValue = maxValue * 1.1;

    // Color scale using Tailwind colors
    const colorScale = d3.scaleOrdinal()
      .domain(players.map(p => p.player.name))
      .range(['#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.attribute))
      .range([0, innerWidth])
      .padding(0.2);

    // we will be using a dynamic max value instead of a fixed value 
    const yScale = d3.scaleLinear()
      .domain([0, paddedMaxValue])
      .range([innerHeight, 0]);

    // Create subgroups for each player
    const subgroups = players.map(p => p.player.name);
    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, xScale.bandwidth()])
      .padding(0.05);

    // let's draw the x and y axes
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('class', 'text-xs fill-gray-400')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .attr('class', 'text-xs fill-gray-400');

    // let's draw bars
    data.forEach((attributeData, i) => {
      attributeData.values.forEach((playerData, j) => {
        g.append('rect')
          .attr('x', xScale(attributeData.attribute) + xSubgroup(playerData.player))
          .attr('y', yScale(playerData.value))
          .attr('width', xSubgroup.bandwidth())
          .attr('height', innerHeight - yScale(playerData.value))
          .attr('fill', colorScale(playerData.player))
          .attr('rx', 3)
          .attr('ry', 3)
          .on('mouseover', function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', d3.color(colorScale(playerData.player)).brighter(0.5));
            
            // Add tooltip
            const tooltip = svg.append('g')
              .attr('class', 'tooltip')
              .style('pointer-events', 'none');
            
            tooltip.append('rect')
              .attr('x', xScale(attributeData.attribute) + xSubgroup(playerData.player) - 30)
              .attr('y', yScale(playerData.value) - 30)
              .attr('width', 60)
              .attr('height', 20)
              .attr('fill', '#1F2937')
              .attr('rx', 3);
            
            tooltip.append('text')
              .attr('x', xScale(attributeData.attribute) + xSubgroup(playerData.player))
              .attr('y', yScale(playerData.value) - 15)
              .attr('text-anchor', 'middle')
              .attr('fill', '#E5E7EB')
              .style('font-size', '12px')
              .text(playerData.value);
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', colorScale(playerData.player));
            
            svg.selectAll('.tooltip').remove();
          });
      });
    });

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right - 120}, ${margin.top})`);

    players.forEach((player, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendGroup.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(player.player.name))
        .attr('rx', 3);

      legendGroup.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .text(player.player.name)
        .attr('class', 'text-sm fill-gray-200');
    });
  };

  if (!processedData || processedData.length === 0) {
    return (
      <div className="bg-gray-900/50 rounded-lg p-8 text-center border border-gray-700">
        <div className="text-gray-400">No data available for bar chart</div>
      </div>
    );
  }

  return (
    <D3BaseChart
      data={processedData}
      width={width}
      height={height}
      renderChart={renderBarChart}
      className={className}
    />
  );
};

export default BarChartComparison;
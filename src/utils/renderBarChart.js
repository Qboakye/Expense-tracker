import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from "d3";

export const renderBarChart = (statements, myRef, currency) => {
  const padding = 20;
  const width = parseInt(select("#demo").style("width"));
  const height = parseInt(select("#demo").style("height"));

  // Scale for X Axis
  const xScale = scaleBand()
    .domain(statements.map((d) => d.category))
    .range([padding + 20, width - padding])
    .padding(0.1);

  // Scale for Y Axis
  const yScale = scaleLinear()
    .domain([0, max(statements, (d) => d.price)])
    .range([height - padding, padding]);

  // Selecting SVG
  const svg = select(myRef.current).attr("width", width).attr("height", height);

  // Adding all the bars to the graph
  svg
    .selectAll("rect")
    .data(statements)
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - padding - yScale(d.price))
    .attr("x", (d) => xScale(d.category))
    .attr("y", (d) => yScale(d.price));

  // Adding X-axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - padding})`)
    .call(axisBottom(xScale).tickSizeOuter(0));

  // Adding Y-axis
  svg
    .append("g")
    .attr("transform", `translate(${padding + 20}, 0)`)
    .call(
      axisLeft(yScale)
        .tickFormat(function (d) {
          return currency + d;
        })
        .ticks(12)
    );
};

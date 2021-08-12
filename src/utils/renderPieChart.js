import { select, scaleOrdinal, pie, arc } from "d3";

export const renderPieChart = (statements, myRef) => {
  const width = parseInt(select("#pie").style("width"));
  const height = parseInt(select("#pie").style("height"));
  const center = height / 2.5;

  const colors = scaleOrdinal(["blue", "red"]);

  // Converts data to Pie usage
  const pieGen = pie().value(function (d) {
    return d.values;
  });

  const pieData = pieGen(statements);

  // Arc generator
  const pieArc = arc()
    .innerRadius(0)
    .outerRadius(center + 15);

  const label = arc()
    .innerRadius(center - 60)
    .outerRadius(center);

  // Selecting SVG
  const svg = select(myRef.current)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  //Working and drawing arcs
  let arcs = svg
    .selectAll(".arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", pieArc)
    .attr("fill", function (d) {
      return colors(d.data.name);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  // Now add the annotation. Use the centroid method to get the best coordinates
  arcs
    .append("text")
    .attr("transform", (d) => {
      return "translate(" + label.centroid(d) + ")";
    })
    .text((d) => d.data.name)
    .style("text-anchor", "middle")
    .style("font-size", "17px");
};

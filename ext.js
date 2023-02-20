const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;


const FRAME2 = d3.select("#vis1")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

// read data and create plot
function plot()
{
    d3.csv("./data/data.csv").then((data) => {

        let categories = data.map(function (value) {
            return value.Category;
        });

        // Creates the scale function using data
        const X_SCALE2 = d3.scaleBand()
            .domain(categories)
            .range([MARGINS.left, VIS_WIDTH])
            .padding(0.2);

        // find max Y from the data
        const MAX_Y2 = d3.max(data, (d) => {
            return parseInt(d.Value);
        })

        // Creates the scale function using data
        const Y_SCALE2 = d3.scaleLinear()
            .domain([0, MAX_Y2])
            .range([VIS_HEIGHT, 0]);

        // Plot Points using the X scale created above
        FRAME2.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => {
                return X_SCALE2(d.Category);
            })
            .attr("y", (d) => {
                return Y_SCALE2(d.Value);
            })
            .attr("width", 20)
            .attr("height", (d) => {
                return (VIS_HEIGHT - Y_SCALE2(d.Value));
            })
            .style("fill", "steelblue");


        FRAME2.append("g")
            .attr("transform", "translate(0," + VIS_HEIGHT + ")")
            .call(d3.axisBottom(X_SCALE2));

        FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left +
                "," + 0 + ")")
            .call(d3.axisLeft(Y_SCALE2));
    });
}
plot();






/*
var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("data/data.csv").then((data) => {

        xScale.domain(data.map(function(d) { return d.x; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return "$" + d;
            }).ticks(10));


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.year); })
            .attr("y", function(d) { return yScale(d.value); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d.value); });
    });*/

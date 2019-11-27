vertexCount = 10;
totalEdgeCount = 15;
individualEdgeLimit = 3;

graph = new Graph(vertexCount);
var source_no = parseInt(Math.random()*vertexCount)
var destination_no = parseInt(Math.random()*vertexCount)

var source = null;
var destination = null;

//Adds vertices
nodes =[]
for(var i=0;i<vertexCount;i++){
	const node = new Node(Math.random()*1000, Math.random()*500);
	nodes.push(node);
	graph.addVertex(node);
	if(source_no==i)
		source = node;
	if(destination_no==i)
		destination = node;
}

//Add edges
var i=0
while(i<totalEdgeCount){
	var nodeList = [...nodes]
	const f = parseInt(Math.random()*nodeList.length);
	const node1 = nodeList[f];
	nodeList = nodeList.filter( n => n!=node1);
	const s = parseInt(Math.random()*nodeList.length);
	const node2 = nodeList[s];
	const edgeList1 = graph.AdjList.get(node1);
	const edgeList2 = graph.AdjList.get(node2);
	graph.addEdge(node1, node2);
	if(edgeList1.length==individualEdgeLimit)
		nodes = nodes.filter(n => n!=node1)
	if(edgeList2.length==individualEdgeLimit)
		nodes = nodes.filter(n => n!=node2)
	i++;
}

function paint(){
	$("#canvas").html("");
	// get all the vertices 
    var get_keys = graph.AdjList.keys(); 
  
    // iterate over the vertices 
    for (var element of get_keys)  
	{
		var color = element==source?"red":element==destination?"green":"black";
		var circle = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
			cx: element.x,
			cy: element.y,
			r: 5,
			fill: color
		})
		for(line_obj of graph.AdjList.get(element)){
			var line = $(document.createElementNS("http://www.w3.org/2000/svg", "line")).attr({
				x1: element.x,
				y1: element.y,
				x2: line_obj.x,
				y2: line_obj.y,
				stroke: 'black'
			})
			$("#canvas").append(line);
		}
		$("#canvas").append(circle);
	}
	var sourceDestLine = $(document.createElementNS("http://www.w3.org/2000/svg", "line")).attr({
		x1: source.x,
		y1: source.y,
		x2: destination.x,
		y2: destination.y,
		stroke: 'orange',
		'stroke-dasharray': 4
	})
	var next_neighbours = graph.AdjList.get(source);
	var directionToDestination = source.directionTo(destination);
	for(neighbour of next_neighbours){
		var delta = parseInt((directionToDestination - source.directionTo(neighbour) + 360) % 360 );
		var delta = (delta>180) ? (360-delta) : delta;
		var text = $(document.createElementNS("http://www.w3.org/2000/svg", "text")).attr({
			x: neighbour.x,
			y: neighbour.y+20,
			stroke: 'orange'
		})
		text.html(delta);
		$("#canvas").append(text);
	}
	$("#canvas").append(sourceDestLine);
}

function propgate(){
	var neighbours = graph.AdjList.get(source);
	var nearest = null;
	var nearestDirection = 361;
	var directionToDestination = source.directionTo(destination);
	var distances = []
	for(neighbour of neighbours){
		var delta = parseInt((directionToDestination - source.directionTo(neighbour) + 360) % 360 );
		var delta = (delta>180) ? (360-delta) : delta;
		distances.push(delta)
		if(delta<nearestDirection){
			console.log("Current: ", nearestDirection, "Next: ", delta, "Changed: True");
			nearestDirection = delta;
			nearest = neighbour;
		}
		else{
			console.log("Current: ", nearestDirection, "Next: ", delta, "Changed: False");
		}
	}
	console.log(distances);
	source = nearest;
}

$(document).ready(()=>{
	paint();
	$("#propogate").click(()=>{
		propgate();
		paint();
	});
});
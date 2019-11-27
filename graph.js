class Graph{
    constructor(noOfVertices) 
    { 
        this.noOfVertices = noOfVertices; 
        this.AdjList = new Map(); 
	}
	
	// add vertex to the graph 
	addVertex(v) 
	{ 
		// initialize the adjacent list with a 
		// null array 
		this.AdjList.set(v, []); 
	}

	addEdge(v, w) 
	{ 
		// get the list for vertex v and put the 
		// vertex w denoting edge between v and w 
		this.AdjList.get(v).push(w); 
	
		// Since graph is undirected, 
		// add an edge from w to v also 
		this.AdjList.get(w).push(v); 
	} 
}
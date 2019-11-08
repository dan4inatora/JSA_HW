class Graph {
   constructor() {
      this.edges = {};
      this.nodes = [];
   }

   addNode(node) {
      this.nodes.push(node);
      this.edges[node] = [];
   }

   addEdge(node1, node2, weight = 1) {
      this.edges[node1].push({ node: node2, weight: weight });
      this.edges[node2].push({ node: node1, weight: weight });
   }

   display() {
      let graph = "";
      this.nodes.forEach(node => {
         graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
      });
      console.log(graph);
   }

   dijkstra(start, finish){
   	   let visited = [];
 	   let pathlist = {};
 	   let backtrace = {};   
	   fillTimes(this.nodes, pathlist, start);	   
	   let current = start;

	   while(visited.length < this.nodes.length){

	   		updatePathList(this.edges, pathlist, current, visited, backtrace);
	   		visited.push(current);
	   		let next_min = choosingFastestNode(pathlist, visited);
	   		current = getKey(pathlist, next_min);	
	   }

	   return{
	   		s_path : pathlist[finish],
	   		backtrace : backtrace
	   };
   }
}

let map = new Graph();
map.addNode("A");
map.addNode("B");
map.addNode("C");
map.addNode("D");
map.addNode("E");
map.addEdge("A", "B", 6);
map.addEdge("A", "D", 1);
map.addEdge("D", "E", 1);
map.addEdge("D", "B", 2);
map.addEdge("B", "E", 2);
map.addEdge("B", "C", 5);
map.addEdge("E", "C", 5);
map.display();
let solution = map.dijkstra("A", "C");
console.log(`Smallest Path from A to C - [${makeBackTrace("A", "C", solution.backtrace)}] is ${solution.s_path} long`);

function getKey(object, value){
	for(let key in object){
		if(object[key] === value){
			return key;
		}
	}
}

function filterVisited(object, visitedarr){
	var filtered = {};
	for(let key in object){
		if(!visitedarr.includes(key)){
			filtered[key] = object[key];
		}
	}
	return filtered;
}

function fillTimes(nodes, pathlist, start){
    nodes.forEach(node => {
        node != start ? pathlist[node] = Number.MAX_SAFE_INTEGER : pathlist[node] = 0;                 
    });	
}

function updatePathList(edges, pathlist, current, visited, backtrace){
	edges[current].forEach(edge => {
	   	let dist = pathlist[current] + edge.weight;

	   	if(!visited.includes(edge.node) && dist < pathlist[edge.node]){
	   		pathlist[edge.node] = dist;
	   		backtrace[edge.node] = current;
	   	}
	});
}

function choosingFastestNode(pathlist, visited){
	let min = Object.values(filterVisited(pathlist, visited)).reduce(function(acc, val){
	   	let current_min;
  		val < acc ? current_min = val : current_min = acc;
        return current_min;
	},Number.MAX_SAFE_INTEGER);		

	return min;
}

function makeBackTrace(start, finish, path){
	let backtrace = [];
	backtrace.push(finish);
	let current = path[finish];
	while(current != start){
		backtrace.push(current);
		current = path[current];
	}
	backtrace.push(start);
	return backtrace.reverse();
}

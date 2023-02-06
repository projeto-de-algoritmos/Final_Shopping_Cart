import { products } from "./data/products";
import { Graph } from "./graph";

export default function generateGraph() {
  const graph = new Graph();
  let productsAdded = [];
  let copyProducts = [...products];

  for (let i = 0; i < products.length; i++) {
    graph.insertNode(products[i].price, products[i].cost, products[i].weight);
  }


}
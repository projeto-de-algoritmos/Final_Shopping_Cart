export class Knapsack {
  constructor(cartWeight, nodes) {
    this.cartWeight = cartWeight;
    this.nodes = nodes;
    
    const matriz = [];
    
    for (let n = 0; n <= this.nodes.length; n++) {
      let aux = [];
      for (let w = 0; w <= this.cartWeight; w++) {
        aux.push(0);
      }
      matriz.push(aux);
    }

    this.memo = matriz;
  }

  findMaxPrice() {
    for (let idx = 1; idx <= this.nodes.length; idx++) {
      for (let w = 1; w <= this.cartWeight; w++) {
        if (this.nodes[idx-1].weight > w) {
          this.memo[idx][w] = this.memo[idx-1][w];
        }
        else {
          this.memo[idx][w] = Math.max(this.memo[idx-1][w], this.nodes[idx-1].price + this.memo[idx-1][w-this.nodes[idx-1].weight]);
        }
      }
    }

    return this.memo[this.nodes.length][this.cartWeight];
  }

  getItems() {
    const items = [];
    let w = this.cartWeight;
    
    for (let i = this.nodes.length; i > 0; i--) {
      let cur_val = this.memo[i][w];
      let prev_val = this.memo[i-1][w];
      if (cur_val > prev_val) {
        items.push(this.nodes[i-1]);
        w = w - this.nodes[i-1].weight;
      }
    }

    return items;
  }
}
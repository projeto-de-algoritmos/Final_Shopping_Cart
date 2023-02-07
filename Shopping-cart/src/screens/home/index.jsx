import React, { useContext } from 'react';
import './style.css'
import ForceGraph3D from 'react-force-graph-3d';
import { GraphContext } from '../../App';
import { products } from '../../../algorithm/data/products';
import { Knapsack } from '../../../algorithm/knapsack';
import { Djikstra } from '../../../algorithm/graph';

function convertGraph(g) {
    let nodes = g.adj.filter(node => node)
    const links = []
    nodes.forEach(node => {
        let nextNode = node.next
        while (nextNode) {
            links.push({
                source: node.name,
                target: g.adj[nextNode.idx].name,
                cost: nextNode.cost
            })

            nextNode = nextNode.next
        }
    })

    nodes = nodes.map(node => {
        return { id: node.name, name: node.name, price: node.price, weight: node.weight }
    })

    return { nodes, links }
}

export default function Home(props) {
    const graph = useContext(GraphContext);
    const [melhorCarrinho, setMelhorCarrinho] = React.useState([]);
    const [melhorCarrinhoPrice, setMelhorCarrinhoPrice] = React.useState(0);

    const geraMelhorCarrinho = () => {
        const knapsack = new Knapsack(10, graph.adj);
        setMelhorCarrinhoPrice(knapsack.findMaxPrice());
        const result = knapsack.getItems();
        setMelhorCarrinho(result);
    }

    const geraMelhorCaminho = () => {
        const djikstra = new Djikstra(graph);
        djikstra.createCPT(djikstra.graph.adj[0]);
        let minDist = Infinity;
        let minDistIdx = 0;
        Object.entries(djikstra.dist).forEach(([key, value]) => {
            if (melhorCarrinho.find(product => product.idx === key)) {
                minDist = value < minDist ? value : minDist
                minDistIdx = value < minDist ? key : minDistIdx
            }
        })
        const result = djikstra.findPath(melhorCarrinho[0], melhorCarrinho[melhorCarrinho.length - 1]);
    }

    return (
        <div className='container'>
            <div className="cima">
                <div className='produtos'>
                    <h2>
                        Lista de produtos
                    </h2>
                    <ul className='listaProdutos'>
                        {products.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
                            <div>
                                <li key={product.id}>
                                    <strong>{product.name}</strong> - R${product.price},00 - espaço necessário: {product.weight}
                                </li>
                                <div className="divider"></div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="listaMelhorCarrinho">
                    <h2>
                        Melhor carrinho
                    </h2>
                    <h3>
                        Preço Total do Carrinho: R${melhorCarrinhoPrice},00
                    </h3>
                    <ul className='listaProdutos'>
                        {melhorCarrinho.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
                            <div>
                                <li key={product.id}>
                                    <strong>{product.name}</strong> - R${product.price},00 - espaço necessário: {product.weight}
                                </li>
                                <div className="divider"></div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="botoes">
                <button className='botaoGerarCarrinho' onClick={geraMelhorCarrinho}>
                    Gerar melhor carrinho
                </button>
                {melhorCarrinho.length > 0 &&
                    <button className='botaoGerarCarrinho' onClick={geraMelhorCarrinho}>
                        Marcar melhor caminho para pegar os produtos
                    </button>
                }
            </div>
            <div className='graphView'>
                <ForceGraph3D
                    graphData={convertGraph(graph)}
                    nodeLabel="name"
                    linkLabel="cost"
                    nodeAutoColorBy="weight"
                    linkColor="color"
                />
            </div>
        </div>
    );
}
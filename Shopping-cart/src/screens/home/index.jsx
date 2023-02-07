import React, { useContext } from 'react';
import './style.css'
import ForceGraph3D from 'react-force-graph-3d';
import { GraphContext } from '../../App';
import { products } from '../../../algorithm/data/products';
import { Knapsack } from '../../../algorithm/knapsack';
import { Dijkstra } from '../../../algorithm/graph';

function convertGraph(g) {
    let nodes = g.adj.filter(node => node)
    const links = []
    nodes.forEach(node => {
        let nextNode = node.next
        while (nextNode) {
            links.push({
                source: node.name,
                target: g.adj[nextNode.idx].name,
                color: g.adj[nextNode.idx].isPath ? 'red' : '#fff',
                cost: nextNode.cost
            })

            nextNode = nextNode.next
        }
    })

    nodes = nodes.map(node => {
        return { id: node.name, name: node.name, price: node.price, weight: node.weight, color: node.choiced ? 'cyan' : '#fff' }
    })

    return { nodes, links }
}

export default function Home(props) {
    const graph = useContext(GraphContext);
    const [melhorCarrinho, setMelhorCarrinho] = React.useState([]);
    const [melhorCarrinhoPrice, setMelhorCarrinhoPrice] = React.useState(0);
    const [tempoTotal, setTempoTotal] = React.useState(0);
    const [numeroCarrinho, setNumeroCarrinho] = React.useState(10);

    const geraMelhorCarrinho = () => {
        const knapsack = new Knapsack(numeroCarrinho, graph.adj);
        setMelhorCarrinhoPrice(knapsack.findMaxPrice());
        const result = knapsack.getItems();

        result.forEach(item => {
            graph.adj[item.idx].choiced = true;
        })
        setMelhorCarrinho(result);
    }

    const geraMelhorCaminho = () => {
        const djikstra = new Dijkstra(graph);

        let results = [];
        for (let i = 1; i < melhorCarrinho.length; i++) {
            const result = djikstra.findMinPath(melhorCarrinho[i - 1], melhorCarrinho[i]);

            results = results.concat(result);
        }
        console.log(results)
        results.forEach(result => {
            result.path.forEach(idx => {
                graph.adj[idx].isPath = true;
            })
            setTempoTotal((state) => state + result.cost);
        })
    }

    const timeCost = (tempoTotal) => {
        const minutos = Math.floor(tempoTotal / 60);
        const segundos = tempoTotal % 60;

        return `${minutos} minuto(s) e ${segundos} segundo(s)`
    }

    return (
        <div className='container'>
            <div className="titulos">
                    <h2>
                        Lista de produtos
                    </h2>
                    <h2>
                        Melhor carrinho
                    </h2>
                </div>
            <div className="cima">
                
                <div className='produtos'>

                    <ul className='listaProdutos'>
                        {products.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
                            <div>
                                <li key={product.id}>
                                    <strong>{product.name}</strong> - R${product.price},00 - espaço utilizado: {product.weight}
                                </li>
                                <div className="divider"></div>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="listaMelhorCarrinho">

                    <h3>
                        Preço Total do Carrinho: R${melhorCarrinhoPrice},00
                    </h3>
                    <ul className='listaProdutos'>
                        {melhorCarrinho.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
                            <div>
                                <li key={product.id}>
                                    <strong>{product.name}</strong> - R${product.price},00 - espaço utilizado: {product.weight}
                                </li>
                                <div className="divider"></div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="botoes">
                <div className='geraCarrinho'>
                    <button className='botaoGerarCarrinho' onClick={geraMelhorCarrinho}>
                        Gerar melhor carrinho
                    </button>
                    <div className='escolheTamanhoCarrinho'>
                        <label htmlFor="numeroCarrinho">Espaço do Carrinho</label>
                        <input
                            className="numeroCarrinho"
                            type="number"
                            value={numeroCarrinho}
                            onChange={(e) => setNumeroCarrinho(e.target.value)}
                            min={1}
                            max={30}
                        />
                    </div>
                </div>
                {melhorCarrinho.length > 0 &&
                    <button className='botaoGerarCarrinho' onClick={geraMelhorCaminho}>
                        Marcar melhor caminho para pegar os produtos
                    </button>
                }
            </div>
            {
                tempoTotal > 0 &&
                <div className="tempoTotal">
                    <h2>
                        Tempo total para pegar os produtos: {timeCost(tempoTotal)}
                    </h2>
                </div>
            }
            <div className='graphView'>
                <ForceGraph3D
                    graphData={convertGraph(graph)}
                    width="90vw"
                    nodeLabel="name"
                    linkLabel="cost"
                    nodeColor="color"
                    linkColor="color"
                />
            </div>
        </div>
    );
}
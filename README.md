# thegraph-project

This project is a simple example of how to use thegraph to index data from a smart contract and query it using a subgraph. This project indexes data from the [Foundation NFT](https://etherscan.io/token/0x3b3ee1931dc30c1957379fac9aba94d1c48a5405) smart contract and allows you to query the transfer activity of the NFTs.

## Getting Started

### Subgraph URL: [https://api.studio.thegraph.com/query/85765/foundation-nft/v0.0.1](https://api.studio.thegraph.com/query/85765/foundation-nft/v0.0.1)

### Example Query

```graphql
query {
  transfers(first: 100, orderBy: timestamp, orderDirection: desc) {
    id
    from {
      id
    }
    to {
      id
    }
    tokenId
    transactionHash
    timestamp
  }
}
```

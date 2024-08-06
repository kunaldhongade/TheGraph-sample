import { useState, useEffect } from "react";
import { createClient, cacheExchange, fetchExchange } from "urql";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./App.css";

const client = createClient({
  url: "https://api.studio.thegraph.com/query/85765/foundation-nft/v0.0.1",
  exchanges: [cacheExchange, fetchExchange]
});

const transfersQuery = `
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
`;
const columns = [
  {
    title: "Transaction Hash",
    key: "transactionHash",
    ellipsis: true,
    render: ({ transactionHash }) => (
      <a
        href={`https://etherscan.io/tx/${transactionHash}`}
        target="_blank"
        rel="noreferrer"
      >
        {transactionHash}
      </a>
    )
  },
  {
    title: "From",
    key: "from",
    ellipsis: true,
    render: ({ from }) => from.id
  },
  {
    title: "To",
    key: "to",
    ellipsis: true,
    render: ({ to }) => to.id
  },
  {
    title: "Token ID",
    key: "tokenId",
    ellipsis: true,
    render: ({ tokenId }) => (
      <a
        href={`https://etherscan.io/nft/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405/${tokenId}`}
        target="_blank"
        rel="noreferrer"
      >
        {"#" + tokenId}
      </a>
    )
  },
  {
    title: "Timestamp",
    key: "timestamp",
    ellipsis: true,
    render: ({ timestamp }) => new Date(timestamp * 1000).toLocaleString()
  }
];
function App() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTokenTransfers() {
    setLoading(true);
    try {
      const data = await client.query(transfersQuery).toPromise();

      console.log(data);
      setTransfers(data.data.transfers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching token transfers:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTokenTransfers();
  }, []);

  return (
    <>
      <h1>Foundation NFT</h1>
      <Table
        className="table_grid"
        columns={columns}
        rowKey="id"
        dataSource={transfers}
        scroll={{ x: 970 }}
        loading={loading}
        pagination={{
          pageSizeOptions: [10, 25, 50, 100],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 10,
          size: "small"
        }}
        onChange={() => {}}
      />
    </>
  );
}

export default App;

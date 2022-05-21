import React, { useEffect, useState } from 'react';
import { Table, Paper, Image, Center, Container } from '@mantine/core';


interface SearchTrendingResult {
  coins: {
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number
    }
  }[];
}

export function TableReviews() {

const [trending, setTrending] = useState<SearchTrendingResult['coins'] | null>(null);
    
    useEffect(() => {            
        //Trending Coins
        const trendingCoins = async () => {
            const result = await fetch('https://api.coingecko.com/api/v3/search/trending');
            const resjson = await result.json() as SearchTrendingResult;
            
            setTrending(resjson.coins);
        }

        trendingCoins()
            .catch(console.error);
    },[])

    const rows = trending == null ? "Loading Data" : trending.map((row) => {
        return (
            <tr key={row.item.id}>
            <td className="coin-name">
                <img src={row.item.thumb} alt={row.item.id} />
                {row.item.name}
            </td>
            <td>
                {row.item.symbol}
            </td>
            <td>
            <a href={`https://www.coingecko.com/en/coins/${row.item.id}`} target="_blank" rel="noreferrer">Link</a>
            </td>
            </tr>
        )
    })

  return (
    <div className="trending-table">
    <Paper p={50}>
    <Center>
      <h2>Trending Coins</h2>
      <Image
        radius="md"
        src="./trending.svg"
        sx={{
          [`@media (max-width: 400px)`]: {
            width: 300
          },
          [`@media (min-width: 1000px)`]: {
            width: 300
          }
        }}
      />
      </Center>
      <Center>
      <Table striped sx={{ 
        [`@media (max-width: 400px)`]: {
          maxWidth: 300
        },
        [`@media (min-width: 1000px)`]: {
          minWidth: 1000
        }
      }} verticalSpacing="lg">
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Symbol</th>
            <th>Details</th>
          </tr>
        </thead>
        {<tbody>{rows}</tbody>}
      </Table>
      </Center>
    </Paper>
    </div>
  );
}
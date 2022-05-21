import React, { useEffect, useState } from 'react'
import { Paper, Image, Center, Title, Table, Skeleton, Container, Button, TextInput, Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';


export const Prices = () => {

  const [prices, setPrices] = useState<any | null>(null);
  const [notReady, setNotReady] = useState<boolean>(true);
  //Input Field Text
  const [addCoin, setAddCoin] = useState<string>("");
  const [userCoin, setUserCoin] = useState<any | null>(0);

  useEffect(() => {
    console.log("Pulling Prices");
    const getPrices = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Csolana%2Cripple%2Cterra-luna%2Ccardano%2Cdogecoin%2Cpolkadot%2Cavalanche-2&vs_currencies=usd"
      );
      const resjson = await res.json();
      setPrices(resjson);
      setNotReady(false);
    };

    getPrices().catch(console.error);

  }, []);


  let rows : any = "Loading.."

  if (notReady === false) {
    const elements = [
      {name: "Bitcoin", price: prices.bitcoin.usd.toLocaleString() },
      {name: "Ethereum", price: prices.ethereum.usd.toLocaleString() },
      {name: "Binance Coin", price: prices.binancecoin.usd.toLocaleString() },
      {name: "Solana", price: prices.solana.usd.toLocaleString() },
      {name: "XRP", price: prices.ripple.usd.toLocaleString() },
      {name: "Terra", price: prices["terra-luna"].usd.toLocaleString() },
      {name: "Cardano", price: prices.cardano.usd.toLocaleString() },
      {name: "Doge Coin", price: prices.dogecoin.usd.toLocaleString() },
      {name: "Polkadot", price: prices.polkadot.usd.toLocaleString() },
      {name: "Avalanche", price: prices["avalanche-2"].usd.toLocaleString() },
  
    ]
  
    rows =  elements.map((element) => (
      <tr key={element.name}>
        <td>{element.name}</td>
        <td>{element.price}</td>
      </tr>
    ));
  }

  const handleAdd = async (coin: string) => {

    //Search Coin
      const lowerCoin = coin.toLowerCase();
      const query = await fetch(`https://api.coingecko.com/api/v3/search?query=${lowerCoin}`);
      const queryjson = await query.json();
      if(queryjson.coins[0] === undefined) {
        
        setUserCoin( {
          name: "Error",
          price: 0,
          url: ``
        })

        return
      }
    const coinID = await queryjson.coins[0].id

    //Get Coin Price
    const coinPrice = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinID}&vs_currencies=usd`);
    const coinPriceJSON = await coinPrice.json();
    const priceOuput = await coinPriceJSON[coinID].usd;

    //Add to List
    setUserCoin({
      name: coin,
      price: priceOuput,
      url: `https://www.coingecko.com/en/coins/${coinID}`
    })
    }
  


  return (
    <div>
    <Paper p={20}>
    <div className="prices">
    <Center> 
    <Title order={1}>Prices</Title>
    <Image
        radius="md"
        src="./prices.svg"
        width={300}
        ml={30}
        mt={10}
      />
    
    </Center>
    <Skeleton visible={notReady} width="100%">
    <Table striped highlightOnHover fontSize="md">
      <thead>
        <tr>
          <th>Coin Name</th>
          <th>Price (USD)</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
    </Skeleton>
    </div>
    </Paper>
    <Container 
    mt={20}
    >
    <Paper p={25} className="add-container" >
    <TextInput
      placeholder="Coin Symbol"
      label="Query Crypto Price"
      mt={10}
      styles={{ input: { width: '100%', boxSizing: 'border-box' } }}
      name="coinsymbol"
      value={addCoin}
      onChange={(e) => setAddCoin(e.currentTarget.value)}
    />
    <Button 
    color="indigo" 
    size="xs" 
    mt={10}
    onClick={() => handleAdd(addCoin)}
    >
      Submit
    </Button>

    {
      (userCoin !== 0 && userCoin.name !== "Error") &&
      <Alert mt={30} icon={<AlertCircle size={16} />} title="Success" color="green" >
        <Title order={6}>Coin: {userCoin.name}</Title>
        <Title order={6}>Price: {userCoin.price}</Title>
        <Title order={6}><a href={userCoin.url} target="_blank" rel="noreferrer">More Details</a></Title>
        Queried the latest price of the requested coin.
    </Alert>
    }

    {
      userCoin.name === "Error" && 
      <Alert mt={30} icon={<AlertCircle size={16} />} title="Error!" color="red">
      Coin with that name does not exist. Please re-enter your coin name and try again.
      </Alert>
    }

    </Paper>
    </Container>
    </div>
  )
}

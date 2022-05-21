import React from 'react'
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    Paper,
  } from '@mantine/core';
  import { Check } from 'tabler-icons-react';
  import {Link} from 'react-router-dom';

  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 44,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
          : theme.colors[theme.primaryColor][0],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));

interface Props {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({active, setActive} : Props) => {
const { classes } = useStyles();
  return (
    <div>
    <Paper>
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
           <span className={classes.highlight}>Data based</span>overview of the Crypto Market
          </Title>
          <Text color="dimmed" mt="md">
            Quickly determine which crypto coins are trending and get access to their data and pricing.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <Check size={12} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Trending Coins</b> – Which coins are everyone currently talking about
            </List.Item>
            <List.Item>
              <b>Top Coin Pricing</b> – Real-time pricing of the top cryptocurrencies on the market.
            </List.Item>
            <List.Item>
              <b>Features Always Added</b> – Stick around as the website is constantly being developed and new features being added.
            </List.Item>
          </List>

          <Group mt={30}>
          <Link to="/trending">
            <Button radius="xl" size="md" className={classes.control} onClick={() => setActive('Trending')}>
             Trending Coins
            </Button></Link>
            <Link to="/prices">
            <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => setActive('Prices')}>
              Coin Prices
            </Button></Link>
          </Group>
        </div>
        <Image src="./data.svg" className={classes.image} />
      </div>
    </Container>
    </Paper>
  </div>
  )
}

export default Home
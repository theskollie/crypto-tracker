import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Code,
  Center,
  Paper,
  Image,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core';

import {TableReviews as Table} from './Table';



import Sidebar from './sidebar'
import { Prices } from './Prices';
import Login from './Login';
import { MoonStars, Sun } from 'tabler-icons-react';
import Home from './Home';
import Register from './Register';

export default function AppShellContainer() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  //Toggle Light/Dark Mode
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [active, setActive] = useState('Home');
  return (
    <Paper>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Sidebar active={active} setActive={setActive} setOpened={setOpened} />
        </Navbar>
      }
      footer={
        <Footer height={22} p="xxs">
          <Center>
            <Text>Developed by <a href="https://github.com/theskollie">Skollie</a></Text>
          </Center>
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div style={{ width: 45, marginRight: 10 }}>
                <Image 
                    src="./crypto.png"
                    alt="Crypto Icon"
                />
            </div>
            <Text style={{marginRight: 10, fontFamily: 'Greycliff CF, sans-serif' }} size="xl" weight={700} variant="gradient" gradient={{ from: 'blue', to: 'indigo', deg: 20 }} >Crypto Tracker</Text> 
            <Code sx={{ fontWeight: 700}}>v1.0.0</Code>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              style={{position: 'fixed', right: 0, marginRight: '20px'}}
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
          </div>
        
        </Header>
      }
    >
      <Routes>
          <Route path="/trending" element={<Table />} />
          <Route path="/" element={<Home active={active} setActive={setActive} />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </AppShell>
    </Paper>
  );
}
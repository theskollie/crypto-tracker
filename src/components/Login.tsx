import React, { useState } from 'react'
import { Image, Title, Center, TextInput, PasswordInput, Button, Container, Paper, Loader, Alert } from '@mantine/core';
import { Key, Bolt, AlertCircle } from 'tabler-icons-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [sucks, setSucks] = useState(false);
  const handleForgotPass = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSucks(true);
    } , 2000)
  }

  const [disabled, setDisabled] = useState(false);

  return (
    <Paper p={50}>
    <Center>
    <Title order={1}>Login</Title>
    <Image src="./login.svg" width={300} />
    </Center>
    <Container>
    <TextInput
      label="Username"
      radius="md"
      disabled={disabled}
      required
    />
    <PasswordInput
      label="Password"
      required
      disabled={disabled}
    />
    <Center>
    <Button leftIcon={<Key size={14} />} mt={20} onClick={() => {
      if(sucks === true) { setSucks(false)};
      setDisabled(true);
      }}>
      Login
    </Button>
    <Button leftIcon={<Bolt size={14} />} mt={20} ml={20} onClick={() => handleForgotPass()}>
      Forgot Password
    </Button>
    </Center>
    <Center>
    {loading === true &&
      <Loader mt={40} />
    }
    {
      sucks === true && 
      <Alert mt={40} icon={<AlertCircle size={16} />} title="Damn!" color="red">
      That sucks now you can't login..
    </Alert>
    }

  </Center> 
  {
      disabled === true &&
      <Alert mt={20} color="red" icon={<AlertCircle size={16} color="red" />} title="Static Mode">
      Site is currently running in static mode, hosted on Github Pages. <br />
      If you'd like to see a version connected to a DB, contact me on GitHub.
    </Alert>
    }  
    </Container>
    </Paper>

  )

}

export default Login
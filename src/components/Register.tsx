import React, { useState } from 'react'
import { Image, Title, Center, TextInput, PasswordInput, Button, Container, Paper, Alert } from '@mantine/core';
import { AlertCircle, Key } from 'tabler-icons-react';

const Register = () => {

  const [disabled, setDisabled] = useState(false);

  return (
    <Paper p={50}>
    <Center>
    <Title order={1}>Register</Title>
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
      description="Password must include at least one letter, number and special character"
      disabled={disabled}
      required
    />
    <Center>
    <Button leftIcon={<Key size={14} />} mt={20} onClick={() => setDisabled(true)}>
      Sign Up
    </Button>
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

export default Register
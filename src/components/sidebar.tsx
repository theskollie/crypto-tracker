import React, {useState} from 'react'
import { createStyles, Navbar, Modal, Switch, Image, useMantineColorScheme, Alert } from '@mantine/core';
import {
    BellRinging,
    Settings,
    Receipt2,
    Login,
    AlertTriangle, 
    Home,
    AlertCircle
  } from 'tabler-icons-react';

  import {Link} from 'react-router-dom';

  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      },
  
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      },
  
      link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  
          [`& .${icon}`]: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          },
        },
      },
  
      linkIcon: {
        ref: icon,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        '&, &:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
              : theme.colors[theme.primaryColor][0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
          },
        },
      },
    };
  });

  const data = [
    { link: '/', label: 'Home', icon: Home },
    { link: '/trending', label: 'Trending', icon: BellRinging },
    { link: '/prices', label: 'Prices', icon: Receipt2 },
    { link: '', label: 'Settings', icon: Settings },
  ];

  interface Props {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
  }

const Sidebar = ({active, setActive} : Props) => {
    const { classes, cx } = useStyles();
    const [openSettings, setOpenSettings] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [personalInfo, setPersonalInfo] = useState(false);

    const links = data.map((item) => {
       
      if (item.label === "Settings") {
          return (
            <Link
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            to="/"
            key={item.label}
            onClick={(event) => {
              setActive("Home");
              setOpenSettings(true);
            }}
          >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
          </Link>
          )
        
      }
      
      return (
        <Link
          className={cx(classes.link, { [classes.linkActive]: item.label === active })}
          to={item.link}
          key={item.label}
          onClick={(event) => {
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} />
          <span>{item.label}</span>
        </Link> )
      });

    
  return (
    <div>
    <Navbar height={700} width={{ sm: 300 }} p="md">
    
    <Navbar.Section grow>
      {links}
    </Navbar.Section>

    <Navbar.Section className={classes.footer}>
      <Link to="/login" className={classes.link} >
        <Login className={classes.linkIcon} />
        <span>Login</span>
      </Link>
      <Link to="/register" className={classes.link}>
        <AlertTriangle className={classes.linkIcon} />
        <span>Register</span>
      </Link>
    </Navbar.Section>
  </Navbar>


    <Modal opened={openSettings} onClose={() => {
      setOpenSettings(false);
      setPersonalInfo(false);
    }} title="Settings" >
    <div id="settingsModal">
    <Image src="./settings.svg" width={200} />
    <Switch
      label="Dark Mode"
      mt={20}
      checked={colorScheme === 'light' ? false : true}
      onClick={() => {
        toggleColorScheme();
      }}
    />
    <Switch
      label="I agree to sell my privacy"
      checked={true}
      onClick={() => setPersonalInfo((prev) => !prev)}
    />
    {personalInfo && <Alert mt={20} icon={<AlertCircle size={16} />} title="Bummer!" color="red">
      Unfortunately we have already sold your data. 
      Sorry for the inconvenience!
      </Alert>}
    </div>
    </Modal>
    </div>
  )
}

export default Sidebar
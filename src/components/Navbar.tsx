import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useAtom, useSetAtom } from 'jotai';
import { connect, disconnect } from 'starknetkit';

import tg from '@/assets/tg.svg';
import CONSTANTS from '@/constants';
import { addressAtom } from '@/store/claims.atoms';
import { MyMenuItemProps, MyMenuListProps, shortAddress } from '@/utils';

export default function Navbar() {
  const setAddress = useSetAtom(addressAtom);
  const address = useAtom(addressAtom)[0];

  const connectWallet = async () => {
    const { wallet } = await connect({ dappName: 'STRKFarm' });

    if (wallet && wallet.isConnected) {
      setAddress(wallet.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setAddress('');
  };

  // useEffect(() => {
  //   if (!address && lastWallet) {
  //     const lastConnector = connectors.find((c) => c.id === lastWallet);
  //     console.log('lastWallet connected', lastConnector);
  //     if (!lastConnector)
  //       console.error('last connector id found, but no connector');
  //     else {
  //       connect({ connector: lastConnector });
  //     }
  //   }
  // }, [lastWallet]);

  // useEffect(() => {
  //   if (connector) {
  //     const id: WalletName = connector.id as WalletName;
  //     setLastWallet(id);
  //   }
  // }, [connector]);

  return (
    <Container
      width={'100%'}
      padding={'0'}
      borderBottom={'1px solid var(--chakra-colors-color2)'}
      position={'fixed'}
      bg="bg"
      zIndex={10000}
      top="0"
    >
      <Center bg="highlight" color="orange" padding={0}>
        <Text fontSize="12px" textAlign={'center'} padding="0px 5px">
          {''}
          <b>Alpha version, report bugs in our Telegram group.</b>
          {''}
        </Text>
      </Center>
      <Box
        width={'100%'}
        maxWidth="1400px"
        margin={'0px auto'}
        padding={'20px 20px 10px'}
      >
        <Flex width={'100%'}>
          <Link href="/" margin="0 auto 0 0" textAlign={'left'}>
            <Text
              fontSize={{ base: '20px', sm: '25px', md: '30px' }}
              color={'color2'}
              letterSpacing={'10px'}
              marginTop={{ base: '7px', sm: '3px', md: '0' }}
            >
              <b>STRKFarm</b>
            </Text>
          </Link>
          <Link href={'/claims'} isExternal>
            <Button
              margin="0 0 0 auto"
              borderColor="color2"
              color="color2"
              variant="ghost"
              marginRight={'30px'}
              leftIcon={
                <Avatar
                  size="sm"
                  bg="highlight"
                  color="color2"
                  name="T G"
                  src={CONSTANTS.LOGOS.STRK}
                />
              }
              _hover={{
                bg: 'color2_50p',
              }}
              display={{ base: 'none !important', md: 'flex !important' }}
            >
              Claims
            </Button>
          </Link>
          <Link href={CONSTANTS.COMMUNITY_TG} isExternal>
            <Button
              margin="0 0 0 auto"
              borderColor="color2"
              color="color2"
              variant="outline"
              rightIcon={
                <Avatar
                  size="sm"
                  bg="highlight"
                  color="color2"
                  name="T G"
                  src={tg.src}
                />
              }
              _hover={{
                bg: 'color2_50p',
              }}
              display={{ base: 'none !important', md: 'flex !important' }}
              className="glow-button"
            >
              Join Telegram
            </Button>
            <IconButton
              aria-label="tg"
              variant={'ghost'}
              borderColor={'color2'}
              display={{ base: 'block', md: 'none' }}
              icon={
                <Avatar
                  size="sm"
                  bg="highlight"
                  className="glow-button"
                  name="T G"
                  color="color2"
                  src={tg.src}
                  _hover={{
                    bg: 'color2_50p',
                  }}
                />
              }
            />
          </Link>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={address ? <ChevronDownIcon /> : <></>}
              iconSpacing={{ base: '1px', sm: '5px' }}
              bgColor={'purple'}
              color="white"
              borderColor={'purple'}
              borderWidth="1px"
              _hover={{
                bg: 'bg',
                borderColor: 'purple',
                borderWidth: '1px',
                color: 'purple',
              }}
              _active={{
                bg: 'bg',
                borderColor: 'purple',
                color: 'purple',
              }}
              marginLeft={'10px'}
              display={{ base: 'flex' }}
              height={{ base: '2rem', sm: '2.5rem' }}
              my={{ base: 'auto', sm: 'initial' }}
              paddingX={{ base: '0.5rem', sm: '1rem' }}
              fontSize={{ base: '0.9rem', sm: '1rem' }}
              onClick={address ? undefined : connectWallet}
            >
              <Center>{address ? shortAddress(address) : 'Connect'}</Center>
            </MenuButton>
            <MenuList {...MyMenuListProps}>
              {address && (
                <MenuItem {...MyMenuItemProps} onClick={disconnectWallet}>
                  Disconnect
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Container>
  );
}

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function Login() {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.800'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={"white"} fontSize={'4xl'}>Iniciar sesion</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'gray.500'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Recuerdame</Checkbox>
                  <Link color={'black'}>Olvidaste tu contraseña?</Link>
                </Stack>
                <Button
                  bg={'orange.600'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.400',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
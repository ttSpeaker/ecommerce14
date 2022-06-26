import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.800'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={"white"} fontSize={'4xl'} textAlign={'center'}>
              Crear cuenta
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'gray.500'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Apellido</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'orange.600'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.400',
                  }}>
                  Registrarse
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Ya tienes una cuenta? <Link color={'black'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
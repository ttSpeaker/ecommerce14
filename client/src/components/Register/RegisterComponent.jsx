import { useForm } from "react-hook-form";
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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegisterComponent(props) {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, register } = useForm();

  function onSubmit(values) {
    console.log('submit')
    props.submit(values);
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.800"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"white"} fontSize={"4xl"} textAlign={"center"}>
            Crear cuenta
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"gray.500"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {/* <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      {...register("firstName", {
                        required: "Is required.",
                        minLength: {
                          value: 4,
                          message: "Minimum length is 4",
                        },
                      })}
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      type="text"
                      {...register("lastName", {
                        required: "Is required.",
                        minLength: {
                          value: 4,
                          message: "Minimum length is 4",
                        },
                      })}
                    />
                  </FormControl>
                </Box>
              </HStack> */}
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Is required.",
                    minLength: {
                      value: 6,
                      message: "Minimum length is 4",
                    },
                  })}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Is required.",
                      minLength: {
                        value: 6,
                        message: "Minimum length is 4",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"orange.600"}
                  color={"white"}
                  _hover={{
                    bg: "orange.400",
                  }}
                >
                  Registrarse
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Ya tienes una cuenta? <Link color={"black"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

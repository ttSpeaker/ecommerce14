import { useForm } from "react-hook-form";
import { BACK_URL } from "../../config/configs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
} from "@chakra-ui/react";
import { useState } from "react";

export default function Login(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      const result = await axios.post(BACK_URL + "/auth/login", values);
      if (result.data && result.data.accessToken && result.data.refreshToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }
      setSubmitting(false);
      props.setIsLoggedIn(true);
      navigate("/productos");
    } catch (error) {
      setSubmitting(false);
      alert(error.message);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.800"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"white"} fontSize={"4xl"}>
            Iniciar sesion
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"gray.500"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Is required.",
                    minLength: {
                      value: 4,
                      message: "Minimum length is 4",
                    },
                  })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Is required.",
                    minLength: {
                      value: 4,
                      message: "Minimum length is 4",
                    },
                  })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Recuerdame</Checkbox>
                  <Link color={"black"}>Olvidaste tu contraseña?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"orange.600"}
                  color={"white"}
                  _hover={{
                    bg: "orange.400",
                  }}
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

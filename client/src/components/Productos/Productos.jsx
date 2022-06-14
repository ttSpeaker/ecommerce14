import { Flex, Input, Button } from "@chakra-ui/react"

const Productos = () =>{
    return(
        <Flex marginTop={"20px"} flex={{base: 1}} justify={"center"}>
            <Input borderColor={"orange.400"} background={"white"} marginRight={"10px"} width={"50%"} placeholder='Buscador' color={"gray.400"}  />
            <Button backgroundColor={"orange.400"}>Buscar</Button>
          </Flex>
    )
}

export default Productos
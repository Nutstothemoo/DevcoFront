import {Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {getOrgs, getUserOrgs} from "../../features/user/user.js";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
function Organizations() {
    const dispatch = useDispatch();
    const userOrgs = useSelector((state) => state.login.user);

    const loadOrgs = async () => {
        const organizations = await getUserOrgs();
        console.log(organizations);
        dispatch(getOrgs(organizations));
    }
    useEffect(() => {
        loadOrgs();
    }, [])
    return (
        <Flex w="98%" minH="80%" mt={10} bgColor="gray.50" borderRadius="md" boxShadow="md" p="4">
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" w="100%" h="31%">

            </SimpleGrid>
        </Flex>
    )
}

export default Organizations;
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import homepage from "../../assets/404.json";
import blob from "../../assets/blobanimationBG.svg";
import blob2 from "../../assets/blobanimation.svg";
import login from "../../assets/security6.json";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Notfound() {
  // Homepage

  const [showHomepage, setShowHomepage] = useState(true);
  const [isSmallerThan1050] = useMediaQuery("(max-width: 1050px)");
  const location = useLocation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homepage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex
      zIndex={1}
      w="100%"
      h="100%"
      flexDirection={["column", "column", "column", "row"]}
    >
      {showHomepage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box
            w={["100%", "100%", "100%", "50%"]}
            h={["50%", "50%", "50%", "100%"]}
            display="flex"
            justifyContent={["center", "center", "center", "flex-end"]}
            alignItems="center"
            pr={["0", "0", "0", "10"]}
          >
            <Box
              display="flex"
              flexDirection="column"
              w={["90%", "90%", "80%", "60%"]}
              h="100%"
              alignItems="center"
              justifyContent={[
                "flex-start",
                "flex-start",
                "flex-start",
                "center",
              ]}
              mb={["0", "0", "0", "10"]}
            >
              <Text
                fontSize="70px"
                fontWeight="700"
                bgGradient="linear(to-l, #59a3ff, #9ae9ff)"
                bgClip="text"
                mb="5"
              >
                404
              </Text>

              <Text fontSize="lg" color="gray.300" textAlign="center">
                Sorry, this page doesn't exist. Check out our DevBoard dashboard
                for developers like you to streamline workflow, collaborate, and
                access key metrics. Thanks for visiting, hope to see you soon!
              </Text>
              <Link to="/">
                <Button
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  width="100%"
                  size="lg"
                  display="flex"
                >
                  Home
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            w={["100%", "100%", "100%", "50%"]}
            h={["55%", "50%", "50%", "100%"]}
            display="flex"
            alignItems={["flex-end", "center", "flex-start", "center"]}
            justifyContent={["center", "center", "center", "flex-start"]}
            pl={["0", "0", "0", "10"]}
          >
            <Lottie
              animationData={homepage}
              style={{ width: "550px", height: "100%" }}
            />
          </Box>
        </motion.div>
      )}

      {!showHomepage && (
        <Flex
          w="100%"
          justifyContent="center"
          display={isSmallerThan1050 ? "none" : "flex"}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <Lottie
              animationData={login}
              style={{ width: "500px", height: "100%", opacity: "0.8" }}
            />
          </motion.div>
        </Flex>
      )}
    </Flex>
  );
}

export default Notfound;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Box, Fade, Text} from '@chakra-ui/react';
import './Routeinfo.scss';

function RouteInfo() {
  const location = useLocation();

  // Capitalize the first letter of the route path
  const routePath = location.pathname.substring(1);
  const capitalizedRoutePath =
    routePath.charAt(0).toUpperCase() + routePath.slice(1);

  // Define a state variable to trigger re-rendering of the component
  const [counter, setCounter] = useState(0);

  // Use useEffect to watch for changes to location and increment the counter
  useEffect(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, [location]);

  return (
    <Fade in={true} duration={0.4} key={counter}>
      <Box>
        <Text fontWeight="600" fontSize="lg" color="primary">{capitalizedRoutePath}</Text>
      </Box>
    </Fade>
  );
}

export default RouteInfo;

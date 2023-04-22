import { Button, useToast } from "@chakra-ui/react";
import PropTypes from 'prop-types'
function Notification({ title, description, status }) {
    const toast = useToast();
    const pop = () => {
        toast({
            title,
            description,
            status,
            duration: 9000,
            isClosable: true,
            position: "bottom-right"
        })
    }
    return (
        pop()
    )
  }

Notification.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
}

export default Notification;
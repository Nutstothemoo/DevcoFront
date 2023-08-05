import {
  Text,
  useMediaQuery,
  Flex,
  Box,
  FormControl,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  changeContentValue,
  changeTitleValue,
} from "../../features/Post/post";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification.jsx";
function PostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
  const { title, content, status } = useSelector((state) => state.post);
  const { id } = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigateto = useNavigate();
  const handleTitleChange = (evt) => {
    dispatch(changeTitleValue(evt.target.value));
  };

  const handleContentChange = (evt) => {
    dispatch(changeContentValue(evt));
  };

  const handleSubmit = () => {
    // Définition de la fonction handleSubmit
    if (isLoading) return; // Vérifier si isLoading est vrai et sortir de la fonction si c'est le cas
    setIsLoading(true); // Mettre isLoading à vrai
    dispatch(addPost({ title, content, id })); // Appeler la fonction addPost avec les arguments title, content et id
    setTimeout(() => {
      // Définir une fonction qui sera appelée après un délai de 500 millisecondes
      setIsLoading(false); // Mettre isLoading à faux
      setNotification(true); // Mettre notification à vrai
      dispatch(changeTitleValue(""));
      dispatch(changeContentValue(""));
      setTimeout(() => {
        // Définir une fonction qui sera appelée après un délai de 3000 millisecondes
        setNotification(false); // Mettre notification à faux
        navigateto("/mypost"); // Rediriger l'utilisateur vers la page 'mypost'
      }, 100);
    }, 500);
  };

  return (
    <Flex
      w={isSmallerThan1000 ? "100%" : "50%"}
      data-color-mode="light"
      minH="80%"
      mt={10}
      bgColor="bgPrimary"
      style={{ "backdrop-filter": "blur(15px)" }}
      borderRadius="md"
      boxShadow="lg"
      zIndex={1}
      // p="4"
    >
      <Box w="100%">
        <FormControl
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center" // Center the form content horizontally
          justifyContent="space-around"
        >
          <Input
            placeholder="New post title here..."
            size="md"
            width={isSmallerThan1000 ? "100%" : "50%"}
            height="80px"
            textAlign="center"
            fontSize="xl"
            boxShadow="lg"
            bgColor="bgPost"
            value={title}
            onChange={handleTitleChange}
          />
          <MDEditor
            value={content}
            preview="edit"
            size="lg"
            extraCommands={[commands.fullscreen]}
            onChange={handleContentChange}
            style={{
              width: "80%",
              minHeight: "400px", // Minimum height of MDEditor
              backgroundColor: "rgba(219, 231, 255, 0.9)",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              color: "black",
            }}
          />

          <Button
            style={{
              backgroundColor: "#D8E5FF",
              width: isSmallerThan1000 ? "100%" : "50%",
            }}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </FormControl>
      </Box>
      {notification && (
        <Notification
          title="Published !"
          description="Your post have been published !"
          status="success"
        />
      )}
    </Flex>
  );
}

export default PostForm;

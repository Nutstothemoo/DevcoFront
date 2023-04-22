import React from 'react';
import { Card, CardHeader, CardBody, IconButton } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiLike } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deletePost } from '../../features/Editpost/editpost';
import PropTypes from 'prop-types';
import {getUserPosts} from "../../features/user/user.js";

function Post({ title, content, like, date, imageuser, username, postId, load, onLoad }) {
  const navigateto = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.login);
  const { id } = user;
  const { posts } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleDelete = () => {
    dispatch(deletePost({ postId, id })).then(() => {
      onLoad(!load);
    })

  };

  return (
    <Card opacity="0.8" mb="5" boxShadow="md">
      <CardHeader w="100%" pb="0">
        <Box display="flex" alignItems="center" w="100%" mb="3">
          <Avatar
            name={username}
            size="sm"
            src={`${VITE_BACKEND_URL}/images/${imageuser}`}
          />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Text fontSize="md" ml="3" as="b">
              {username}
            </Text>
            <Text fontSize="xs" ml="3">
              {date}{' '}
            </Text>
          </Box>
        </Box>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody pt="0">
        <Box>
          <Text pt="2" fontSize="sm">
            <div>
              <ReactMarkdown
                children={content}
                className="react-markdown-test"
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </Text>
        </Box>
        <Box
          mt="10"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap="2"
        >
          <BiLike />
          <Text ml="1">{like}</Text>
          <Link to={`/editpost/${postId}`}>
            <IconButton icon={<FaEdit />} aria-label="Edit" />
          </Link>
          <IconButton
            icon={<RiDeleteBin6Line />}
            aria-label="Edit"
            onClick={handleDelete}
          />
        </Box>
      </CardBody>
    </Card>
  );

}

Post.propTypes = {
  postId: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  like: PropTypes.number,
  date: PropTypes.instanceOf(Date),
  imageuser: PropTypes.string,
  username: PropTypes.string,
  isLiked: PropTypes.bool,
  load: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default Post;


import {Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import {
    FaChartLine,
    FaFolderOpen,
    FaColumns,
    FaThumbsUp,
    FaUser,
    FaPlusSquare,
    FaRegNewspaper,
} from 'react-icons/fa';

import { BsStackOverflow } from 'react-icons/bs';

import {Badge} from '@chakra-ui/react'

function BurgerMenu() {

    return (
        <Flex>
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<GiHamburgerMenu />}
                color="black100"
                bgColor="secondary"
            />
            <MenuList>
                <MenuItem icon={<FaChartLine />}>
                        Dashboard <Badge colorScheme='purple'>v2</Badge>
                </MenuItem>
                        <Link to="/addpost">
                        <MenuItem
                        icon={<FaPlusSquare />}
                        // onClick={handleLinkClick}                     
                        >
                        <Text pl="2">Add Post</Text>
                        </MenuItem>
                        </Link>
                        <Link to="/feed">
                        <MenuItem

                        icon={<FaRegNewspaper />}
                        // onClick={handleLinkClick}

                        >
                        <Text pl="2">Rss Feed</Text>
                        </MenuItem>
                    </Link>
                    <Link to="/posts">
                        <MenuItem

                        icon={<FaRegNewspaper />}
                        // onClick={handleLinkClick}

                        >
                        <Text pl="2">Devboard Posts</Text>
                        </MenuItem>
                    </Link>
                    <Link to="/mypost">
                        <MenuItem
                        icon={<FaRegNewspaper />}
                        // onClick={handleLinkClick}
                        >
                        <Text pl="2">My posts</Text>
                        </MenuItem>
                    </Link>

                <Link to="repositories">
                <MenuItem  hoverStyle={{ background: "transparent", boxShadow: "none" }} icon={<FaFolderOpen />}>
                    Your Project
                </MenuItem>
                </Link>
                <Link to="stackoverflow">
                <MenuItem icon={<BsStackOverflow />}>
                    StackOverflow
                </MenuItem>
                </Link>
                <Link to="playground">
                <MenuItem icon={<FaChartLine />}>
                    Playground
                </MenuItem>
                </Link>
                <Link to="kanban">
                <MenuItem icon={<FaColumns />}>
                    kanban
                </MenuItem>
                </Link>
                <Link to="likes">
                <MenuItem icon={<FaThumbsUp />}>
                    Likes
                </MenuItem>
                </Link>
                <Link to="organizations">
                <MenuItem icon={<FaChartLine />}>
                    Oganization
                </MenuItem>
                </Link>
                <Link to="profile">
                <MenuItem icon={<FaUser />}>
                    Profile
                </MenuItem>
                </Link>

            </MenuList>
        </Menu>
        </Flex>
    )
}

export default BurgerMenu;
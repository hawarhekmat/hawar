"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const NavSmall = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <Button ref={btnRef} onClick={onOpen}>
        MENU
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>HAWAR</DrawerHeader>

          <DrawerBody display="flex" flexDir="column" gap="3">
            <Link className="hover:text-sky-500" href={"/new-list"}>
              New list
            </Link>
            <Link className="hover:text-sky-500" href={"/company"}>
              Manage companies
            </Link>
            <Link className="hover:text-sky-500" href={"/driver"}>
              Manage drivers
            </Link>
            <Link className="hover:text-sky-500" href={"/product"}>
              Manage products
            </Link>
            <Link className="hover:text-sky-500" href={"/tickets"}>
              Search
            </Link>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close menu
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavSmall;

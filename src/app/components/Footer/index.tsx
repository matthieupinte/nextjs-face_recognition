'use client'

import React from 'react'
import {
  Box, Text, Link, Icon, Container, Stack,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

import License from '../License'

const Footer: React.FC = () => (
  <Box
    as="footer"
    p={4}
    position="fixed"
    bottom={0}
    left={0}
    right={0}
    bg="white"
  >
    <Container
      as={Stack}
      spacing={4}
      direction={{ base: 'column', md: 'row' }}
      maxW="full"
      justifyContent="space-between"
      alignItems="center"
    >
      <License />
      <Text fontSize="sm" mr={2}>
        Done with ❤️ by
        {' '}
        <Link href="https://matthieupinte.com" isExternal>
          Matthieu Pinte
        </Link>
        .
      </Text>
      <Text fontSize="sm">
        See it on
        {' '}
        <Link
          isExternal
          href="https://github.com/matthieupinte/nextjs-face_recognition"
        >
          <Icon as={FaGithub} verticalAlign="middle" />
          {' '}
          Github
        </Link>
      </Text>
    </Container>
  </Box>
)

export default Footer

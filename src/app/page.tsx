'use client'

import React from 'react'
import {
  Container,
  Heading,
  Text,
  Link,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'

function Home() {
  return (
    <Container maxW="xl" centerContent pb={14}>
      <Heading as="h1" size="2xl" my={8}>
        Welcome to Face-API.js Demo
      </Heading>
      <Text fontSize="lg" my={4}>
        This is a simple web app that uses
        {' '}
        <Link
          href="https://github.com/justadudewhohacks/face-api.js"
          isExternal
        >
          Face-API.js
        </Link>
        {' '}
        to demonstrate facial recognition technology. It's built with
        {' '}
        <Link href="https://nextjs.org/" isExternal>
          Next.js
        </Link>
        ,
        {' '}
        <Link href="https://www.prisma.io/" isExternal>
          Prisma
        </Link>
        {' '}
        and
        {' '}
        <Link href="https://chakra-ui.com/" isExternal>
          Chakra UI
        </Link>
        .
      </Text>
      <Text fontSize="lg" my={4}>
        You can explore two main features:
      </Text>
      <Box my={4}>
        <Flex direction="column" align="start">
          <Text fontSize="lg">
            1.
            {' '}
            <Link as={NextLink} href="/train">
              Train
            </Link>
            {' '}
            - Train the model to recognize faces.
          </Text>
          <Text fontSize="lg">
            2.
            {' '}
            <Link as={NextLink} href="/test">
              Test
            </Link>
            {' '}
            - Test the model's face recognition capabilities.
          </Text>
        </Flex>
      </Box>
      <Button as={NextLink} href="/train" colorScheme="teal" size="lg" mt={8}>
        Get Started
      </Button>
      <Box my={12}>
        <video autoPlay loop muted>
          <source
            src="https://github.com/matthieupinte/nextjs-face_recognition/assets/2217014/f124c3c6-12dc-42c1-abee-5f2213794444"
            type="video/mp4"
          />
        </video>
      </Box>
    </Container>
  )
}

export default Home

import React from 'react'
import {
  Stack,
  Text,
  Link,
  List,
  ListItem,
  Image,
} from '@chakra-ui/react'

function License() {
  return (
    <Stack flexDirection={{ base: 'column', md: 'row' }}>
      <Text
        xmlns-cc="http://creativecommons.org/ns#"
        xmlns-dct="http://purl.org/dc/terms/"
        fontSize="sm"
      >
        <Link
          property="dct:title"
          rel="cc:attributionURL"
          href="https://github.com/matthieupinte/nextjs-face_recognition"
          color="#d14500"
          isExternal
        >
          Next.js Face recognition
        </Link>
        {' '}
        is licensed under
        {' '}
        <Link
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          color="#d14500"
          isExternal
        >
          CC BY-NC-SA 4.0
        </Link>
      </Text>
      <List
        styleType="none"
        display="inline-block"
        ml={0}
        mb={0}
        p={0}
        verticalAlign="middle"
      >
        <ListItem display="inline-block" ml={1}>
          <Image
            w={5}
            h={5}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          />
        </ListItem>
        <ListItem display="inline-block" ml={1}>
          <Image
            w={5}
            h={5}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          />
        </ListItem>
        <ListItem display="inline-block" ml={1}>
          <Image
            w={5}
            h={5}
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
          />
        </ListItem>
        <ListItem display="inline-block" ml={1}>
          <Image
            w={5}
            h={5}
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
          />
        </ListItem>
      </List>
    </Stack>
  )
}

export default License

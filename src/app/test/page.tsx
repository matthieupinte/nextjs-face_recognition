'use client'

import * as faceApi from 'face-api.js'
import React, { useState, useRef, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import {
  Flex, Box, Heading, Button, Stack, Text,
} from '@chakra-ui/react'

import { loadModels, getFaceDetectorOptions } from '../lib/face-api'
import { findBestMatch } from '../actions/descriptor'

import { StyledDropzone, StyledImage } from '../styles'

export default function Home() {
  const [label, setLabel] = useState<string>()
  const [image, setImage] = useState<HTMLImageElement>()
  const [descriptor, setDescriptor] = useState<Float32Array>()

  const handleDrop = async (files: File[]) => {
    const file = files[0]

    const img = await faceApi.bufferToImage(file)
    setImage(img)
  }

  const imageRef = useRef<HTMLImageElement>(null)

  const processImage = async () => {
    const img = imageRef.current

    if (!img) return

    const desc = await faceApi
      .detectSingleFace(img, getFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (!desc) return

    setDescriptor(desc.descriptor)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: match descriptor with existing descriptors and display result
    if (descriptor) {
      const res = await findBestMatch(descriptor)
      setLabel(res)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  return (
    <main>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Test</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <Box display="flex" justifyContent="center" mt={6}>
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <StyledDropzone
                      $empty={!image}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...getRootProps({
                        className: `dropzone ${isDragActive ? 'isActive' : ''}`,
                      })}
                    >
                      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                      <input {...getInputProps()} />
                      {image ? (
                        <StyledImage
                          src={image?.src}
                          ref={imageRef}
                          style={{ maxWidth: '300px' }}
                          onLoad={async () => processImage()}
                        />
                      ) : (
                        <p>Drag'n'drop images, or click to select files</p>
                      )}
                    </StyledDropzone>
                  )}
                </Dropzone>
              </Box>

              <Stack>
                <Button
                  mt={4}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  isDisabled={!descriptor}
                >
                  Who is it?
                </Button>
              </Stack>
            </form>
          </Box>

          {label && (
            <Box>
              <Text>
                It's:
                {label}
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </main>
  )
}

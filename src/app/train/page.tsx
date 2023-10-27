'use client'

import React, { useState, useRef, useEffect } from 'react'
import * as faceApi from 'face-api.js'
import Dropzone from 'react-dropzone'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Icon,
} from '@chakra-ui/react'

import { FaCheckCircle } from 'react-icons/fa'
import { loadModels, getFaceDetectorOptions } from '../lib/face-api'
import { createDescriptor } from '../actions/descriptor'

import {
  StyledDropzone, StyledImage, ImageWrapper, ImagesBox,
} from '../styles'

export default function Home(): React.ReactElement {
  const [label, setLabel] = useState<string>('')
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [descriptors, setDescriptors] = useState<Float32Array[]>([])

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const handleDrop = (files: File[]): void => {
    Promise.all(files.map(async (file) => faceApi.bufferToImage(file))).then(
      (newImages) => {
        setImages([...images, ...newImages])
      },
    )
  }

  const imagesRef = useRef<HTMLImageElement[]>([])
  const canvasRef = useRef<HTMLCanvasElement[]>([])

  const processImage = async (i: number) => {
    const image = imagesRef.current[i]
    const canvas = canvasRef.current[i]

    if (image === null || canvas === null) return

    const descriptor = await faceApi
      .detectSingleFace(image, getFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (!descriptor) return

    setDescriptors([...descriptors, descriptor.descriptor])

    const faceMatcher = new faceApi.FaceMatcher(descriptor)

    faceApi.matchDimensions(canvas, image)

    const result = faceApi.resizeResults(descriptor, image)

    faceMatcher.findBestMatch(result.descriptor).toString()

    const drawBox = new faceApi.draw.DrawBox(result.detection.box)
    drawBox.draw(canvas)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!label || descriptors.length === 0) return

    try {
      setIsSaved(false)
      setIsSubmitting(true)
      await createDescriptor({ label, descriptors })
      setIsSaved(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setLabel('')
    setImages([])
    setDescriptors([])
    setIsSaved(false)
  }

  useEffect(() => {
    loadModels()
  }, [])

  return (
    <main>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Train</Heading>
          </Box>
          <ImagesBox>
            {images.map((image, i) => {
              const key = image.src

              return (
                <ImageWrapper key={`images-${key}`}>
                  <StyledImage
                    src={image.src}
                    ref={(el) => {
                      imagesRef.current[i] = el as HTMLImageElement
                    }}
                    onLoad={async () => processImage(i)}
                  />
                  <canvas
                    key={`canvas-${key}`}
                    ref={(el) => {
                      canvasRef.current[i] = el as HTMLCanvasElement
                    }}
                    className="overlay"
                    width={0}
                    height={0}
                  />
                </ImageWrapper>
              )
            })}
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <StyledDropzone
                  $empty
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...getRootProps({
                    className: `dropzone ${isDragActive ? 'isActive' : ''}`,
                  })}
                >
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <input {...getInputProps()} />
                  <p>Drag'n'drop images, or click to select files</p>
                </StyledDropzone>
              )}
            </Dropzone>
          </ImagesBox>

          <Box maxW={300} m={4}>
            <form onSubmit={handleSubmit}>
              <FormControl mt={6}>
                <FormLabel>Label: </FormLabel>
                <Input
                  type="text"
                  placeholder="Me"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value)
                  }}
                />
              </FormControl>
              <Stack spacing={2} direction="row">
                <Button mt={4} type="submit" variant="solid" colorScheme="teal">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                  {isSaved && <Icon ml={2} color="white" as={FaCheckCircle} />}
                </Button>
                <Button
                  mt={4}
                  type="reset"
                  variant="outline"
                  colorScheme="teal"
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Flex>
    </main>
  )
}

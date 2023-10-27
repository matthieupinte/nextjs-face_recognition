import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

const IMG_WIDTH = 200
const IMG_HEIGHT = 200

export const StyledDropzone = styled.div<{ $empty: boolean }>`
  display: flex;
  align-items: center;
  overflow: hidden;

  width: ${IMG_WIDTH}px;
  height: ${IMG_HEIGHT}px;

  border: ${({ $empty }) => ($empty ? '2px dashed #ccc' : 'none')};
  border-radius: 5px;

  margin: 1rem;
  padding: ${({ $empty }) => ($empty ? '1rem' : '0')};

  text-align: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: #ccc;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-color: #aaa;
    color: #aaa;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;

  width: ${IMG_WIDTH}px;
  height: ${IMG_HEIGHT}px;

  margin: 1rem;
  border-radius: 5px;
}
`

export const StyledImage = styled.img`
  width: ${IMG_WIDTH}px;
  height: ${IMG_HEIGHT}px;
`

export const ImagesBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  flex-flow: wrap;
  margin: 1.5rem 1rem;
  text-align: left;
  max-width: 800px;
`

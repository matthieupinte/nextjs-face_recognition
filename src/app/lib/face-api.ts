import * as faceApi from 'face-api.js'

// eslint-disable-next-line max-len
export const getFaceDetectorOptions = () => new faceApi.SsdMobilenetv1Options({ minConfidence: 0.5 })

export const loadModels = async () => {
  await faceApi.loadFaceLandmarkModel('/weights')
  await faceApi.loadFaceRecognitionModel('/weights')
  await faceApi.loadSsdMobilenetv1Model('/weights')
}

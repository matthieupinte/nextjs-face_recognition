// Inspired by:
// - https://github.com/justadudewhohacks/face-api.js/blob/master/examples/examples-browser/views/faceRecognition.html
// - https://github.com/justadudewhohacks/face-api.js/blob/master/examples/examples-nodejs/faceRecognition.ts

import { Command } from 'commander';
import * as faceapi from 'face-api.js';
import * as fs from 'fs';

// Refs descriptors
import meDescriptors from './features/me-descriptors.json' assert { type: "json" };
import leonardDescriptors from './features/leonard-descriptors.json' assert { type: "json" };
import pennyDescriptors from './features/penny-descriptors.json' assert { type: "json" };

async function run(descriptorUri) {
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./public/weights')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./public/weights')

  const me = meDescriptors.map((descriptor) => new Float32Array(Object.values(descriptor)))
  const leonard = leonardDescriptors.map((descriptor) => new Float32Array(Object.values(descriptor)))
  const penny = pennyDescriptors.map((descriptor) => new Float32Array(Object.values(descriptor)))

  const queryDescriptor = JSON.parse(fs.readFileSync(descriptorUri))
  const query = new Float32Array(Object.values(queryDescriptor))

  const labeledDescriptors = [
    new faceapi.LabeledFaceDescriptors('Leonard', leonard),
    new faceapi.LabeledFaceDescriptors('Penny', penny),
    new faceapi.LabeledFaceDescriptors('Me', me),
  ]

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)
  const bestMatch = faceMatcher.findBestMatch(query)

  console.log(bestMatch.toString())
}

const program = new Command()

program.option('-i, --input <path>', 'Query descriptor path')
program.parse(process.argv)

const options = program.opts()

if (!options.input) {
  console.log('Please provide a query descriptor file path (.json)')
  process.exit(1)
}

run(options.input)

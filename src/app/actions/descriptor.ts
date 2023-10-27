'use server'

import { PrismaClient } from '@prisma/client'
import { FaceMatcher, LabeledFaceDescriptors } from 'face-api.js'

const prisma = new PrismaClient()

export async function createDescriptor({
  label,
  descriptors,
}: {
  label: string
  descriptors: Float32Array[]
}): Promise<void> {
  await prisma.descriptor.create({
    data: { label, descriptors: JSON.stringify(descriptors) },
  })
}

export async function findBestMatch(descriptor: Float32Array): Promise<string> {
  const descriptors = await prisma.descriptor.findMany()

  if (descriptors.length === 0) {
    throw new Error('No descriptors found')
  }

  const query = new Float32Array(descriptor)

  const formattedDescriptors = descriptors.map((d) => {
    const parsedDescriptors = JSON.parse(d.descriptors)
    const float32Descriptors = parsedDescriptors.map(
      (dd: Iterable<number>) => new Float32Array(dd),
    )

    return new LabeledFaceDescriptors(d.label, float32Descriptors)
  })

  const faceMatcher = new FaceMatcher(formattedDescriptors)
  const bestMatch = faceMatcher.findBestMatch(query)

  return bestMatch.toString()
}

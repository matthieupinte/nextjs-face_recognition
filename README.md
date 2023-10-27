This is a simple web app that uses [Face-API.js](https://github.com/justadudewhohacks/face-api.js) to demonstrate facial recognition technology.

It's built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/) and [Chakra UI](https://chakra-ui.com/).

## Getting Started

### App

First, set the SQLite db with `Prisma`:
```bash
yarn prisma migrate dev
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to start testing face recognition.

https://github.com/matthieupinte/nextjs-face_recognition/assets/2217014/f124c3c6-12dc-42c1-abee-5f2213794444

### Try demo.mjs

First, install required dependencies:

```
yarn
```

Second, generate some referential descriptors (via [face-api.js](https://github.com/justadudewhohacks/face-api.js/blob/master/examples/examples-browser/views/faceRecognition.html) for example) and keep it in `features/` folder as `.json`

ex:

```
[
  {
    "0": -0.07616627216339111,
    "1": 0.10632248967885971,
    "2": 0.0073056770488619804,
    "3": -0.11107124388217926,
    "4": -0.13152258098125458,
    ...
  },
  {
    "0": -0.1595122516155243,
    "1": 0.14416350424289703,
    "2": 0.0833432748913765,
    "3": -0.14474943280220032,
    "4": -0.15674208104610443,
    ...
  }
]
```

Finally, generate your query descriptor and store it in a `.json` file

```
{
  "0": -0.07616627216339111,
  "1": 0.10632248967885971,
  "2": 0.0073056770488619804,
  "3": -0.11107124388217926,
  "4": -0.13152258098125458,
  ...
}
```

Then, run:

```
node --experimental-modules demo.mjs -i features/query-descriptor.json
> Me (0.28)
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

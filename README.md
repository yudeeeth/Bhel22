# Bhel22

HMI for bhel sensor stuff.

# Instructtions for running

```
// open three different terminals and in this order run one command in each of them.

// terminal #1 (for running the chip simulator)
npm run chip

// terminal #2 (for starting the express server)
npm run serve

// terminal #3 (for starting your react frontend)
npm run start

```

## /server

The files in this correspond to the the backend.

serve.js => express server that serves the express server that serves the built website.

chip.js => code that simulates the chip that we will be communicating with

jsmwrapper => a wrapper for jsmodbus created to be modifiable if jsmodbuspackage does not work well

apidev.rest => a rest client to quickly check the working of api routes in serve.js

## /design

The contents of this dircetory correspond to the design and implementation details.

imeage/ => holds images for the mg files in this folder

Design.md => Simplified Design specification

## /src

The react frontend code goes here, ideally we'd like to keep the files organised, placing routes in their respective routes.

# Design Doc

## Basic Architecture

![](https://i.imgur.com/gRFnjMV.png)

Subject to change.

Some details regarding wether we'll be using sockets or not for the frontend will be decided later. But its mostly leaning against NO. It was only added here coz it was there last time.

## Life Cycle of a component

So for each component the following things will happen.

1. The page will load in the frontend using the react router (frontend)
2. The components sends a request to the backend in equal intervals.
3. The backend node server receives the request on a certain route and communicates with the chip using the modbus protocol as necessary.
4. The backend node server sends back a response.
5. The frontend parses the response.
6. The frontend updates all the necessary views based on the data and current page.

## Work Assignment

Like we discussed, first we ll make a doc listing all the fuctions requried and the inputs, outputs, description, owner etc. And we ll work on them. Please take a look at the guidelines before working. For any other doubts contact me directly.  work will be assigned in [link](https://docs.google.com/spreadsheets/d/1x2Nz0RtNkf-k6_KUXr8Ht5l5V0QjCEHh-0cQRxbPjrY/edit?usp=sharing)

## Details of Design

### 1 Home Page

### 2 Bar Graph

Bar graph from live data

x-axis sensor number (1-40) with address 200-239

y-axis db level read from the register 40-120

### 3 Frequency Spectrum

Bar Graph of frequency spectrum of each sensor's decibel level.

x-axis frequency 1-12kHz with 32 bands of red and green

y-axis db level 40-120 dB

To get the frequency sprectrum of required sensor, set tag #9 to sensor number.

Then read the db values for green bar from tag 14-45 (33 bands) and read the db values for red bar from tag 146-177(32 bands)

Read current chanel number from tag 9.

Current overall DB from tag 11

### 4 Realtime Trend

A line graph from groups of 10 sensor values based on previous values.

x-axis time different intervals

y-axis db value 40-120

get live db values from 200-239

### 5 Mimic screen

db Values represented in a actual general location of sensor

get db values from 200-239

### 6 Sensor Profile

Same as last screen with additional data being represented from the different bits from different registers.

### 7 Sensor settings

refer requirement.pdf

### 8 System Settings

refer requirement.pdf

### 9 Sensor Status

refer requirement.pdf

### 10 Alarm popup

### 11 Help screen popup

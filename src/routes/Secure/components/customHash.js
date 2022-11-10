import { Buffer } from 'buffer/';  // note: the trailing slash is important!

let key = [120,92,22,105,6,40,14,83,127,91,86,108,55,11,117,112]

function customHash(message,numIter = 32,numArray = false){
    // given a byte array take block size as 32 bytes and convert to 16 bytes
    // if(key == null || key.length!=32 || key.every(e => e < 0 || e > 127))
    let blockSize = 32;
    let blocks = getBlocksFromMessage(message,blockSize,numArray);
    // feed farword previous block
    let prev = key;
    for(let i=0;i<blocks.length;i++){
        let out = customCompressor(prev,blocks[i],numIter);
        prev = out;
    }
    return toHexString(prev);
}

function getBlocksFromMessage(message,blockSize,numArray){
    let arr = message;
    if(!numArray)
        arr = Buffer.from(message);
    let blocks = [];
    for(let i=0;i<arr.length;i+=blockSize){
        blocks.push([...arr.slice(i,i+blockSize)]);
    }
    let last = blocks[blocks.length-1];
    if(last.length<blockSize){
        last.push(1);
        let pad = blockSize-last.length;
        for(let i=0;i<pad;i++){
            last.push(0);
        }
    }
    return blocks;
}

function customCompressor(key,inp,numIter){
    let iv = 19;
    let m = 251;
    let out = []; out.length = 16;
    for(let it = 0;it<numIter;it++){
        for(let i=1;i<32;i++){
            let a = inp[i-1];
            let d = a*iv;
            let e = d%m;
            inp[i-1] = e+i;
            inp[i-1] = Math.abs(inp[i-1]^inp[(inp[i]%32)]);
            // inp[i-1] = Math.abs(inp[i-1]^inp[key[(i-1)/2]%32]);
        }
        inp[0] = (inp[31]*iv)%m+iv;
    }
    for(let i=1;i<32;i+=2){
        out[(i-1)/2]=(
            (  (((inp[i]^key[(i-1)/2]*inp[i-1])%m)*key[(i-1)/2])%m ^ inp[i] ) % 128
            );
    }
    let revout = out.reverse()
    out.map((i,v)=>out[i]^revout[i])
    return out;
}

function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

// console.log(customHash("uditsaefdghsefligbswleffiwbsrligfhbwsrf"));

// console.log(customHash("hello world",32));
// console.log(customHash("hello worlb",32));

const n = 256;
const b = 512;

const ipad = window.BigInt("0x"+("36".repeat(b/8)));
const opad = window.BigInt("0x"+("5c".repeat(b/8)));

function getSi(key){
    return key ^ ipad;
}

function getSo(key){
    return key ^ opad;
}

function HMAC(message,key,whichHash = null){
    let Si = getSi(key);
    let So = getSo(key);
    let hash = (input)=>{
        if(whichHash != "sha512")
            return customHash(input,32);   
    }
    let hash1 = hash(Si.toString(16)+message);
    let hash2 = hash(So.toString(16)+hash1);
    return hash2;
}


export default HMAC
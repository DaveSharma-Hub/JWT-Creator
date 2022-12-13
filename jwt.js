const { default: base64url } = require('base64url');
const { createHash } = require('crypto');

function hashSHA256(string) {
  return createHash('sha256').update(string).digest('hex');
}

function createHeader(){
   const header = {
        "alg": "HS256",
        "type": "JWT"
    };
    return header;
}

function createPayload(payload_information){
    const payload = {};
    Object.entries(payload_information).map((item)=>{
        payload[item[0]] = item[1];
    })
    const time = new Date().getTime();
    payload["iat"] = (time/1000);
    return payload;
}

function createSignature(header,payload,password_secret){
    const signature = base64url(JSON.stringify(header)) + base64url(JSON.stringify(payload)) + base64url(JSON.stringify(password_secret)); 
    return hashSHA256(signature);
}
function reCreateSignature(header,payload,password_secret){
    const signature = base64url(header) + base64url(payload) + base64url(JSON.stringify(password_secret)); 
    return hashSHA256(signature);
}

/*SHOULD BE USED IN SERVER SIDE IMPLEMENTATION ONLY*/
function createJWTSHA256(payload_information,password_secret){
   const header = createHeader();
   const payload = createPayload(payload_information);
   const signature = createSignature(header,payload,password_secret);
   const jwtString =  base64url(JSON.stringify(header)) +"."+ base64url(JSON.stringify(payload)) + "." +base64url(signature);

   return jwtString;
}

/*SHOULD BE USED IN SERVER SIDE IMPLEMENTATION ONLY*/
function verifyJWTSHA256(jwt_load, actual_password_hash){
    const jwtComponents = jwt_load.split(".");
    const header = base64url.decode(jwtComponents[0]);
    const payload = base64url.decode(jwtComponents[1]);
    const correctSignature = reCreateSignature(header,payload,actual_password_hash);
    if(correctSignature===base64url.decode(jwtComponents[2])){
        return true;
    }else{
        return false;
    }
}


module.exports = {
    verifyJWTSHA256:verifyJWTSHA256,
    createJWTSHA256:createJWTSHA256
}
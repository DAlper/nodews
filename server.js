
function getCurrentTime() {
	var gmt_time = new Date();
	return gmt_time.getTime(); //+ gmt_time.getTimezoneOffset() * 60000;
};

function SHA1(msg) {
  function rotate_left(n,s) {
	var t4 = ( n<<s ) | (n>>>(32-s));
	return t4;
  };
  function lsb_hex(val) {
	var str="";
	var i;
	var vh;
	var vl;
	for( i=0; i<=6; i+=2 ) {
  	vh = (val>>>(i*4+4))&0x0f;
  	vl = (val>>>(i*4))&0x0f;
  	str += vh.toString(16) + vl.toString(16);
	}
	return str;
  };
  function cvt_hex(val) {
	var str="";
	var i;
	var v;
	for( i=7; i>=0; i-- ) {
  	v = (val>>>(i*4))&0x0f;
  	str += v.toString(16);
	}
	return str;
  };
  function Utf8Encode(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";
	for (var n = 0; n < string.length; n++) {
  	var c = string.charCodeAt(n);
  	if (c < 128) {
    	utftext += String.fromCharCode(c);
  	}
  	else if((c > 127) && (c < 2048)) {
    	utftext += String.fromCharCode((c >> 6) | 192);
    	utftext += String.fromCharCode((c & 63) | 128);
  	}
  	else {
    	utftext += String.fromCharCode((c >> 12) | 224);
    	utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    	utftext += String.fromCharCode((c & 63) | 128);
  	}
	}
	return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
	j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
	msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
	word_array.push( j );
  }
  switch( msg_len % 4 ) {
	case 0:
  	i = 0x080000000;
	break;
	case 1:
  	i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
	break;
	case 2:
  	i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
	break;
	case 3:
  	i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
	break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
	for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
	for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
	A = H0;
	B = H1;
	C = H2;
	D = H3;
	E = H4;
	for( i= 0; i<=19; i++ ) {
  	temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
  	E = D;
  	D = C;
  	C = rotate_left(B,30);
  	B = A;
  	A = temp;
	}
	for( i=20; i<=39; i++ ) {
  	temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
  	E = D;
  	D = C;
  	C = rotate_left(B,30);
  	B = A;
  	A = temp;
	}
	for( i=40; i<=59; i++ ) {
  	temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
  	E = D;
  	D = C;
  	C = rotate_left(B,30);
  	B = A;
  	A = temp;
	}
	for( i=60; i<=79; i++ ) {
  	temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
  	E = D;
  	D = C;
  	C = rotate_left(B,30);
  	B = A;
  	A = temp;
	}
	H0 = (H0 + A) & 0x0ffffffff;
	H1 = (H1 + B) & 0x0ffffffff;
	H2 = (H2 + C) & 0x0ffffffff;
	H3 = (H3 + D) & 0x0ffffffff;
	H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}

// Computing part

var https = require('https');
var querystring = require('querystring');

          	var apicallparameters = {

	"ops":[
	{
    	"ref":"test1@feedgee.com",
    	"type":"create",
    	"obj":"task",
    	"conv_id":"58c2d45682ba961b5bc36f22",
    	"data":{
        	"apikey": "f603d8ce094444c992e1e47ce55a71b6",
        	"email": "test1@feedgee.com",
        	"tosend": "true",
        	"list_id": "123809",
        	}
	}
	]
//        	"campaign_id": "701276"
};
// 		 var dataobj = 'data:';
//    	var paramsinjson = '';
//    	paramsinjson = JSON.stringify(apicallparameters);
//    	paramsinjson = dataobj.concat('',paramsinjson);
    	var Signature = '';

//   	 var paramsinjson = querystring.stringify(apicallparameters);

    	var GMT_UNIXTIME = getCurrentTime();
    	var API_SECRET = 'BqA0JT0eEGI9Rc8gDqD5dh7GpefoG9t2JLCUoqriGV1PyYovAi';
   	 var CONTENT = querystring.stringify(apicallparameters);
   	 var url =  'https://api.corezoid.com/api/1/json/86712/';

 
  var Signature = Signature.concat(GMT_UNIXTIME, API_SECRET, CONTENT, API_SECRET);
  Signature = SHA1(Signature);
  Signature = Signature.toString(16);

var url_path='/api/1/json/86712/';
url = url.concat(GMT_UNIXTIME,'/',Signature);
url_path = url_path.concat(GMT_UNIXTIME,'/',Signature);

console.log(url);


var postData = querystring.stringify(apicallparameters);

console.log(postData)

var options = {
  hostname: 'api.corezoid.com',
  port: 443,
  path: url_path,
  method: 'POST',
  headers: {
	'Content-Type': 'application/json; charset=utf8',
	'Content-Length': Buffer.byteLength(postData)
  }
};


   // create http request client to consume the QPX API
    var request = require("request")

    // fire request
    request({
        url: url,
        json: true,
        multipart: {
            chunked: false,
            data: [
                {
                    'content-type': 'application/json',
                    body: apicallparameters
                }
            ]
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        }
        else {

            console.log("error: " + error)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusText)
        }
    })

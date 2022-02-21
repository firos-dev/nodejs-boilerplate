const { createXML } = require("./resources/searchIHIXML")
 const fs  = require("fs");
 const axios  = require("axios");
 const https  = require("https");
 const soap  = require("soap")
 var parseString = require('xml2js').parseString;
 const soapRequest = require('easy-soap-request');
const select = require("xml-crypto").xpath,
  dom = require("@xmldom/xmldom").DOMParser,
  SignedXml = require("xml-crypto").SignedXml,
  FileKeyInfo = require("xml-crypto").FileKeyInfo,
  path = require("path"),
  pem = require('pem')

const productPlatform = "windows",
  productName = "AXON",
  productVersion = "1.0.0",
  vendorId = "DPP00000",
  hpioQualifier = "http://ns.electronichealth.net.au/id/hi/hpio/1.0",
  vendorQualifier = "http://ns.electronichealth.net.au/id/hi/vendorid/1.0",
  userId = "DPPTEST",
  userQualifier =
    "http://ns.medipapel/id/AXON/userid/1.0",
  medicareEndpointUrl =
    "https://www5.medicareaustralia.gov.au/cert/soap/services/",
  familyName = "GREEN",
  givenName = "HORACIO",
  gender = "M",
  dateOfBirth = "05/05/1978",
  hpioNumber = "8003624900033751"

async function searchIHI() {
  const body = {
    productPlatform,
    productName,
    productVersion,
    vendorId,
    vendorQualifier,
    userId,
    userQualifier,
    familyName,
    dateOfBirth: new Date(dateOfBirth)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    givenName,
    gender,
    hpioNumber,
    hpioQualifier,
  };

  const xml = createXML(body);

  const publicKey = fs.readFileSync(
    path.join(__dirname, "resources/publicKey.pem"),
    "utf8"
  );

  var sig = new SignedXml();
  sig.addReference("//*[local-name(.)='Body' and namespace-uri(.)]");
  sig.addReference("//*[local-name(.)='timestamp' and namespace-uri(.)]");
  sig.addReference("//*[local-name(.)='user' and namespace-uri(.)]");
  sig.signingKey = fs.readFileSync(
    path.join(__dirname, "resources/fac_sign.pem"),
    "utf8"
  );
  sig.keyInfoProvider = {
    getKeyInfo: () => {
      return `<X509Data><X509Certificate>${publicKey}</X509Certificate></X509Data>`;
    },
  };
  sig.computeSignature(xml, {
    location: { reference: "//*[local-name(.)='signature']" },
    action: "append",
  });
  const request = sig.getSignedXml();

  /**
   * Using SOAP npm
   * @return
   */


  
  //  const wsdlUrl = medicareEndpointUrl + '?wsdl'
   
  //  // passing in overridePromiseSuffix because some of the endpoints end
  //  // with "Async" which breaks promisify.
  //  return soap.createClientAsync(wsdlUrl, {overridePromiseSuffix: 'Promise'})
  //    .then(client => {
  //      client.GetDatabasesPromise({})
  //        .then(results => {
  //          // results is an array with only one item which then has an array called "string".
  //          const databases = results[0].GetDatabasesResult.string

   
  //          // normally we would do some sort of processing or something.
  //          console.dir(databases)

  //          return databases
  //        })
  //    })

  // const agentOption = {
  //   keepAlive: true,
  //   hostname: 'https://www5.medicareaustralia.gov.au',
  //   path: '/cert/soap/services?&wsdl',
  //   port: 443,
  //   pfx: fs.readFileSync(path.join(__dirname + "/resources/fac_sign.p12")),
  //   passphrase: 'Pass-123'
  // };
  // const agent = new https.Agent(agentOption);
  
  // const options = {
  //   url: medicareEndpointUrl,
  //   method: "POST",
  //   headers: { "content-type": "application/xml" },
  //   data: request,
  //   httpsAgent: agent

  // };

  // return axios(options).then(async response => {
  //   const data = response.data
  //   await parseString(data, function (err, result) {
  //     // console.log(result['soap12:Envelope']['soap12:Body'] && result['soap12:Envelope']['soap12:Body'][0]['consWSDL:searchIHIResponse'][0]['out4:searchIHIResult'][0]['out2:ihiNumber']);
  //     return result['soap12:Envelope']['soap12:Body'] && result['soap12:Envelope']['soap12:Body'][0]['consWSDL:searchIHIResponse'][0]['out4:searchIHIResult'][0]['out2:ihiNumber']
  // });
    
  // }).catch(err => {
  //   console.log(err);
  //   return err
  // });
}
module.exports =  { searchIHI }

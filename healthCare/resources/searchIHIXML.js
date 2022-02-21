const { v4: uuidv4 } = require("uuid");

const createXML = (body) => {
  const {
    productPlatform,
    productName,
    productVersion,
    vendorId,
    vendorQualifier,
    userId,
    userQualifier,
    familyName,
    givenName,
    gender,
    hpioNumber,
    hpioQualifier

  } = body;
  const now = new Date();
  const timestamp = now.toISOString();
  const bodyUUID = uuidv4();
  const timeUUID = uuidv4();
  const msgUUID = uuidv4();
  const userUUID = uuidv4();
  return (
    '<s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">' +
    "<s:Header>" +
    '<a:Action s:mustUnderstand="1">http://ns.electronichealth.net.au/hi/svc/ConsumerSearchIHI/3.0/ConsumerSearchIHIPortType/searchIHIRequest</a:Action>' +
    '<h:hpio xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:h="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0">' +
    '<qualifier xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+hpioQualifier+'</qualifier>' +
    '<id xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+hpioNumber+'</id>' +
    "</h:hpio>" +
    '<h:product xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xmlns:h="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0">' +
    "<h:vendor>" +
    '<qualifier xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+vendorQualifier+'</qualifier>' +
    '<id xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+vendorId+'</id>' +
    "</h:vendor>" +
    "<h:productName>"+productName+"</h:productName>" +
    "<h:productVersion>"+productVersion+"</h:productVersion>" +
    "<h:platform>"+productPlatform+"</h:platform>" +
    "</h:product>" +
    '<h:signature xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xmlns:h="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0"></h:signature>' +
    '<h:timestamp xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xmlns:h="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xml:id="timestamp-' +
    timeUUID +
    '">' +
    "<h:created>" +
    timestamp +
    "</h:created>" +
    "</h:timestamp>" +
    '<h:user xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xmlns:h="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0" xml:id="user-' +
    userUUID +
    '">' +
    '<qualifier xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+userQualifier+'</qualifier>' +
    '<id xmlns="http://ns.electronichealth.net.au/hi/xsd/common/QualifiedIdentifier/3.0">'+userId+'</id>' +
    "</h:user>" +
    "<a:MessageID>urn:uuid:" +
    msgUUID +
    "</a:MessageID>" +
    "<a:ReplyTo>" +
    "<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>" +
    "</a:ReplyTo>" +
    "<a:From>" +
    "<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>" +
    "</a:From>" +
    '<a:To s:mustUnderstand="1">http://www.w3.org/2005/08/addressing/anonymous</a:To>' +
    "</s:Header>" +
    '<s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xml:id="body-' +
    bodyUUID +
    '">' +
    '<searchIHI xmlns="http://ns.electronichealth.net.au/hi/svc/ConsumerSearchIHI/3.0">' +
    '<medicareCardNumber xmlns="http://ns.electronichealth.net.au/hi/xsd/consumercore/ConsumerCoreElements/3.0">5950096792</medicareCardNumber>' +
    '<medicareIRN xmlns="http://ns.electronichealth.net.au/hi/xsd/consumercore/ConsumerCoreElements/3.0">1</medicareIRN>' +
    '<dateOfBirth xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0">1978-05-05</dateOfBirth>' +
    '<sex xmlns="http://ns.electronichealth.net.au/hi/xsd/common/CommonCoreElements/3.0">'+gender+'</sex>' +
    '<familyName xmlns="http://ns.electronichealth.net.au/hi/xsd/common/IndividualNameCore/3.0">'+familyName+'</familyName>' +
    '<givenName xmlns="http://ns.electronichealth.net.au/hi/xsd/common/IndividualNameCore/3.0">'+givenName+'</givenName>' +
    "</searchIHI>" +
    "</s:Body>" +
    "</s:Envelope>"
  );
};

module.exports = { createXML }

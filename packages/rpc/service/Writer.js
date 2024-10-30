import  protobuf from "protobufjs";

protobuf.load("../awesome.proto",(err,root)=>{
  const SomeMessage = root.lookupType("awesomepackage.AwesomeMessage")

  const payload = {
    awesomeField: '你好'

  }
  var errMsg = SomeMessage.verify(payload);
  if (errMsg)
      throw Error(errMsg);

  var message = SomeMessage.fromObject(payload)

  var buffer = SomeMessage.encode(message).finish()

  var decoded = SomeMessage.decode(buffer)

  console.log(decoded)

})

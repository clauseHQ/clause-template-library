
# HTTP Post Sample Clause

This is a smart legal clause conforms that to the [Accord Protocol Template Specification](https://docs.google.com/document/d/1UacA_r2KGcBA2D4voDgGE8jqid-Uh4Dt09AE-shBKR0), the protocol is managed by the open-source community of the [Accord Project](https://accordproject.org). The clause can be parsed and executed by the [Cicero](https://github.com/accordproject/cicero) engine and is designed to run on the [Clause platform](https://clause.io)

## Description

> This sample clause demonstrates how to call an external URL. 

You are encouraged to copy this sample when building your own Smart Clause that needs to make a HTTP GET request.


### Sample Payload Data

Request, as in [data.json](https://github.com/accordproject/cicero-template-library/blob/master/acceptance-of-delivery/data.json)
```json
{
    "$class": "io.clause.samples.integration.httpget.Request"
}
```

For the request above, you should see the following response:
```json
{
    "$class":"io.clause.outbound.physical.Http",
    "method":"GET",
    "body":"",
    "url":"http://localhost:1880/alert",
    "transactionId":"b70311b1-88e1-4b3d-b6c2-84c8ee3d8eb7",
    "timestamp":"2018-02-18T13:26:20.886Z"
}
```
The url in the response comes from the value in the [clause text](sample.txt). When executing this clause on the [Clause platform](https://clause.io), this response is automatically understood and the platform will make the HTTP request.

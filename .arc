@app
chit-chats

@http
get /
/shipping
  method get
  src src/http/get-shipping
/shipping
  method post
  src src/http/get-shipping
post /webhook

@aws
# profile default
# region us-west-1
timeout 55

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

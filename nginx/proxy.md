proxy works for the security of the client

https://www.youtube.com/watch?v=MiqrArNSxSM

codedamn what is nginx proxy

proxy is an interface through which you send your request to internet. it acts as a filter/

multiple client can talk to one proxy and then pass it to the outside world
-> firewall
-> better management
-> security (the most important)
-> caching? -> static content in proxy, so proxy can filfiull the request without entering to the internet again-> VERY GOOF PERFORMANCE
-> encryption/decryption - hide your request/your ip address/sensitive data - > encryption your request

REVERSE PROXY
difference: instead of doing it from the client site it does it from server side
instead of protecting the client it protects the server
whenever any requerst comes to access to your servers/websites it has to go by through your proxy

other benefits:
load balancing  between request and the servers
caching -  whenever there is multiople request then caching happens in reverse proxy
security - ip addresses is hidden
helps you comppress rerquest sizer -> zipping reqest into smaller size -> reuses amount of data 

reverse proxy server can be load balancer as well
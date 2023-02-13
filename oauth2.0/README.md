1. Simple login
    * Backend:
        * hash password
        * verify hash
        * look up user info
        * look up authorization info

    * Frontend
        * set-cookie: sessionid=f00b4r; Max-Age: 86400;

    * Downsides:
        * security
        * maintenance

    OAuth 2.0 and OpenID Connect are becoming the industry best practises for solving these problems.

2. OAuth 2.0 - terminology
    * resource owner (users who log in)
    * client (application)
    * authorization server - system that can be used to auth permission (like google/fb)
    * resource server - api - system that holds data that client wants to get to(like fb friends) - sometimes it might be same server as auth server
    * authorization grant - thing that proves that permission is granted
    * redirect uri - callback 
    * access token
    * scope - list of permissions - initial request from the client includes scope details
    * consent - authorization server requests consent from resource owner

    **photo here**

    * back channel - higly secure channel(dashed line on the photo) -> exchange auth code for access token
    * front channel - less secure channel(solid line on the photo)

3. Starting the flow

* https://accounts.google.com/o/oauth2/v2/auth?
    * client_id=anc123&
    * redirect_uri
    * scope
    * response_type
    * state

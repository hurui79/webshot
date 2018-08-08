@echo off
cd C:\SaasOaFtp\webshot
forever start -e C:\SaasOaFtp\webshot\.forever\err_.log -w -a app.js
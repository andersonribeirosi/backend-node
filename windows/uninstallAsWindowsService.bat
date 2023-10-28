setlocal
pushd %~dp0
%@Try%
  REM 
  sc stop sl7tecnologiarifaapi.exe
  sc delete sl7tecnologiarifaapi.exe
%@EndTry%
:@Catch
  REM Exception handling code goes here
:@EndCatch

pause
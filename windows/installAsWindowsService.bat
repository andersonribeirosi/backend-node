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

%@Try%
  REM 
  call npm i -g node-windows
  call npm link node-windows
  call node installAsWindowsService
%@EndTry%
:@Catch
  REM Exception handling code goes here
:@EndCatch

pause
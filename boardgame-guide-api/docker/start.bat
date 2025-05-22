@echo off
REM === Lấy IP từ Wi-Fi adapter ===
FOR /F "tokens=*" %%i IN (
    'powershell -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -match 'Wi-Fi' -and $_.PrefixOrigin -ne 'WellKnown' })[0].IPAddress"'
) DO SET HOST_IP=%%i

REM === Nếu không lấy được IP, fallback về 127.0.0.1 ===
IF "%HOST_IP%"=="" SET HOST_IP=127.0.0.1

REM === Ghi vào .env ===
echo HOST_IP=%HOST_IP% > .env

REM === In ra màn hình ===
echo Using HOST_IP=%HOST_IP%

REM === Khởi động Docker Compose ===
docker compose up
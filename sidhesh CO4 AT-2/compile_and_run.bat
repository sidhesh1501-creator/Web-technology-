@echo off
setlocal enabledelayedexpansion

echo =========================================================================
echo   IT SERVICE REQUEST MANAGEMENT SYSTEM - BUILD & RUN SCRIPT
echo =========================================================================
echo.

:: 1. Check for Tomcat Directory
set "TOMCAT_DIR=C:\Users\kabil\Downloads\apache-tomcat-9.0.120"
if not exist "%TOMCAT_DIR%" (
    echo [ERROR] Tomcat folder not found at %TOMCAT_DIR%
    echo Please edit this script and set TOMCAT_DIR to your Tomcat installation.
    pause
    exit /b 1
)

echo [OK] Located Apache Tomcat at: %TOMCAT_DIR%

:: 2. Target Webapp Directory
set "APP_DIR=%TOMCAT_DIR%\webapps\ITServiceRequestManagement"
set "CLASSES_DIR=%APP_DIR%\WEB-INF\classes"

echo [INFO] Preparing deployment folder: %APP_DIR%
if not exist "%CLASSES_DIR%" mkdir "%CLASSES_DIR%"

:: 3. Copy Webapp Files (JSP, CSS, JS, WEB-INF)
echo [INFO] Copying Webapp files (JSP, CSS, JS, web.xml)...
xcopy /E /I /Y "src\main\webapp\*" "%APP_DIR%\" >nul

:: 4. Locate Java / Javac Compiler
where javac >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set "JAVAC_CMD=javac"
) else (
    if exist "C:\Program Files\Java\jdk*\bin\javac.exe" (
        for /d %%i in ("C:\Program Files\Java\jdk*") do set "JAVAC_CMD=%%i\bin\javac.exe"
    ) else if exist "C:\Program Files\Eclipse Adoptium\jdk*\bin\javac.exe" (
        for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk*") do set "JAVAC_CMD=%%i\bin\javac.exe"
    ) else (
        echo.
        echo [NOTE] JDK javac was not found in PATH or standard Program Files.
        echo If you haven't installed JDK yet:
        echo 1. Run the JDK installer in your Downloads folder:
        echo    C:\Users\kabil\Downloads\jdk-26_windows-x64_bin.exe
        echo 2. Re-run this script.
        echo.
    )
)

:: 5. Compile Java Servlets and Models
if defined JAVAC_CMD (
    echo [INFO] Compiling Java classes with !JAVAC_CMD!...
    "!JAVAC_CMD!" -cp "%TOMCAT_DIR%\lib\servlet-api.jar;%TOMCAT_DIR%\lib\jsp-api.jar" -d "%CLASSES_DIR%" src\main\java\com\service\model\ServiceRequest.java src\main\java\com\service\controller\ServiceRequestServlet.java
    if %ERRORLEVEL% equ 0 (
        echo [SUCCESS] Java classes compiled successfully to WEB-INF\classes!
    ) else (
        echo [ERROR] Compilation failed.
        pause
        exit /b 1
    )
)

:: 6. Launch Tomcat Server
echo.
echo =========================================================================
echo   STARTING APACHE TOMCAT SERVER...
echo =========================================================================
echo.
echo Access the application in your browser at:
echo   http://localhost:8080/ITServiceRequestManagement/serviceRequest.jsp
echo.

start "" "%TOMCAT_DIR%\bin\startup.bat"

timeout /t 3 >nul
start http://localhost:8080/ITServiceRequestManagement/serviceRequest.jsp

echo Application launched!
pause

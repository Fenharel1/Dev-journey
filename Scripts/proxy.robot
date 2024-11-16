*** Settings ***
Suite Setup       Connect To Database    pyodbc    ${db_name}    ${db_user}    ${db_password}    ${db_host}    ${db_port}
Library    SeleniumLibrary
Library    DatabaseLibrary
Library    String
Library    DateTime

*** Variables ***
${city}             CUSCO
${city_code}        080101
${browser}          edge
${db_host}          localhost
${db_name}          dbSegProyInv
${db_user}          sa
${db_password}      secret
${db_port}          1434
${db_driver}        ODBC Driver 22 for SQL Server
${year}             2000
${proxy}=   Evaluate    selenium.webdriver.Proxy()  modules=selenium, selenium.webdriver
${proxy.http_proxy}=    Set Variable    localhost:8080  

*** Test Cases ***
Get Municipalidad Cusco Info - Anual
    Log To Console  Opening browser
    Open browser    https://apps5.mineco.gob.pe/transparencia/Navegador/default.aspx?y=2024&ap=Proyecto   ${browser}     proxy=${proxy}
    Select Frame     name:frame0
    Log To Console   Tipo gobierno
    Click Element    xpath://*[@id="tr0"]
    Click Element    xpath://*[@id="ctl00_CPH1_BtnTipoGobierno"]
    Log To Console   Tipo Subtipogobierno
    Click Element    xpath://*[@id="tr1"]   
    Click Element    xpath://*[@id="ctl00_CPH1_BtnSubTipoGobierno"]
    Log To Console   Select Municipalidades
    Click Element    xpath://*[@id="tr0"]
    Log To Console   Btndepartamento
    Click Element    xpath://*[@id="ctl00_CPH1_BtnDepartamento"]
    Log To Console   Select Cusco 
    Click Element    xpath://*[@id="tr7"]
    Log To Console   BtnMunicipalidad
    Click Element    xpath://*[@id="ctl00_CPH1_BtnMunicipalidad"]
    Log To Console   Buscar codigo
    Input Text    xpath://*[@id="ctl00_CPH1_TxtSearch"]     ${city_code}
    Click Element    xpath://*[@id="ctl00_CPH1_BtnSearchByCode"]
    Sleep   1s
    Log To Console    Municipalidad provincial
    Sleep   1s
    Wait Until Element Is Visible    xpath://*[@id="tr0"]
    ${_PIA}=      Get Text     xpath://*[@id="tr0"]/td[3]
    ${_PIM}=      Get Text     xpath://*[@id="tr0"]/td[4]
    ${_Certificacion}=      Get Text     xpath://*[@id="tr0"]/td[5]
    ${_Compromiso}=      Get Text     xpath://*[@id="tr0"]/td[6]
    ${_Devengado}=      Get Text     xpath://*[@id="tr0"]/td[8]
    ${_Girado}=      Get Text     xpath://*[@id="tr0"]/td[9]
    ${_Avance}=     Get Text     xpath://*[@id="tr0"]/td[10]

    ${PIA}=     Replace String    ${PIA}    ,    ${EMPTY}
    ${PIM}=      Replace String    ${PIM}    ,    ${EMPTY}
    ${Certificacion}=      Replace String    ${Certificacion}    ,    ${EMPTY}
    ${Compromiso}=      Replace String    ${Compromiso}    ,    ${EMPTY}
    ${Devengado}=      Replace String    ${Devengado}    ,    ${EMPTY}
    ${Girado}=      Replace String    ${Girado}    ,    ${EMPTY}
    ${Avance}=     Strip String    ${Avance}
    ${Avance}=     Replace String    ${Avance}     ,       .
    ${year}=    Get Current Date     result_format=%Y

    Log To Console    PIA ${PIA}
    Log To Console    PIM ${PIM}
    Log To Console    CERT ${Certificacion}
    Log To Console    COM ${Compromiso}
    Log To Console    DEV ${Devengado}
    Log To Console    GIR ${Girado}
    Log To Console    AVC ${Avance}

    ${sqlInsertion}=    Catenate  INSERT INTO avance_anual(
    ...    pia, 
    ...    pim, 
    ...    certificacion, 
    ...    compromiso, 
    ...    devengado, 
    ...    girado,  
    ...    avance,  
    ...    anio,
    ...    created_at,
    ...    created_by,
    ...    is_deleted
    ...  ) VALUES(
    ...    '${PIA}', 
    ...    '${PIM}', 
    ...    '${Certificacion}', 
    ...    '${Compromiso}', 
    ...    '${Devengado}', 
    ...    '${Girado}', 
    ...    '${Avance}', 
    ...    '${year}',
    ...    CURRENT_TIMESTAMP,
    ...    '0', 
    ...    'false' 
    ...    );
    ...    
    Log To Console     Show Sql: ${sqlInsertion}

    Execute Sql String   ${sqlInsertion}

    Log To Console    Disconnect from database
    Disconnect From Database
    Log To Console    Cerrando navegador
    close browser
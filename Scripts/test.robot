*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${city}  CUSCO
${city_code}  080101
${browser}  edge

*** Test Cases ***
Visit google
    Log To Console  Opening browser
    Open browser    https://apps5.mineco.gob.pe/transparencia/Navegador/default.aspx?y=2024&ap=Proyecto   ${browser}
    Sleep   2s
    Log To Console   Tipo gobierno
    Select Frame     name:frame0
    Click Element    xpath://*[@id="tr0"]
    Click Element    xpath://*[@id="ctl00_CPH1_BtnTipoGobierno"]
    Sleep   1s
    Log To Console   Tipo Subtipogobierno
    Click Element    xpath://*[@id="tr1"]   
    Click Element    xpath://*[@id="ctl00_CPH1_BtnSubTipoGobierno"]
    Sleep   1s
    Log To Console   Btndepartamento
    Click Element    xpath://*[@id="tr0"]
    Click Element    xpath://*[@id="ctl00_CPH1_BtnDepartamento"]
    Sleep   1s
    Log To Console   buscar cusco
    Input Text    xpath://*[@id="ctl00_CPH1_TxtSearch"]    ${city}
    Click Element    xpath://*[@id="ctl00_CPH1_BtnSearchByDescription"]
    Sleep   3s
    Log To Console   Btn municipalidad
    Click Element    id:tr0
    Sleep   1s
    Log To Console    Clicking btn
    Click Element    xpath://*[@id="ctl00_CPH1_BtnMunicipalidad"]
    Sleep   1s
    Log To Console   Buscar codigo
    Input Text    xpath://*[@id="ctl00_CPH1_TxtSearch"]     ${city_code}
    Click Element    xpath://*[@id="ctl00_CPH1_BtnSearchByCode"]
    Sleep   1s
    Log To Console    Municipalidad provincial
    Click Element    xpath://*[@id="tr0"]
    Log To Console    Termino de sesion
    Sleep   5s
    close browser
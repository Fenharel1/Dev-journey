*** Settings ***
Suite Setup       Connect To Database    pyodbc    ${db_name}    ${db_user}    ${db_password}    ${db_host}    ${db_port}
Library    DatabaseLibrary

*** Variables ***
# ${db_host}         127.0.0.1   # Dirección del servidor SQL Server
${db_host}         localhost   # Dirección del servidor SQL Server
${db_name}         dbDummie     # Nombre de la base de datos
${db_user}         sa          # Usuario de la base de datos
${db_password}     secret          # Contraseña del usuario
${db_port}         1434                   # Puerto por defecto de SQL Server
${db_driver}       ODBC Driver 22 for SQL Server  # Controlador ODBC de SQL Server

*** Test Cases ***
Connect And Query Database
    Log To Console  Executing query
    Execute Sql String   INSERT INTO usuarios(id, password, username) VALUES(1,'admin','admin')
    ${results}        QUERY      Select * from usuarios
    Log To Console  ${results}
    Disconnect From Database

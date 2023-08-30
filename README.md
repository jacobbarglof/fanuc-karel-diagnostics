# README
VSCode extension for providing diagnostic information for Fanuc Karel language. <br/>
On-save the extension compiles *.kl-files with ktrans and sends diagnostics to editor.  <br/>

Project is based on vscode extension diagnostic example, and have probably not been properly cleaned.

## Requirements
* Fanuc Roboguide

## Installation
* Install from vscode marketplace
* Add ktrans.exe to path <br/> 
default location: "C:\Program Files (x86)\Fanuc\WinOLPC\bin"

Shows the extension working together with Error Lens extension
![Multi Diagnostics](./resources/diagnostic-related-info.png)




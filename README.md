# Fanuc KAREL Diagnostics - Comprehensive Setup Guide

This guide explains how to properly set up the Fanuc KAREL Diagnostics Visual Studio Code extension, including adding the KAREL compiler (`ktrans.exe`) to your system PATH and configuring extension settings to ensure a seamless development workflow.

---

## Prerequisites

* Windows-based PC
* FANUC Roboguide software (must be installed)
* Visual Studio Code

---

## Why Add `ktrans.exe` to PATH?

The `ktrans.exe` binary is the official FANUC KAREL compiler used to translate `.kl` source files into `.pc` binary files executable on FANUC robots.

Adding it to your system PATH allows the Fanuc KAREL Diagnostics extension in VS Code to invoke the compiler without needing to hard-code the full path every time. This is important for maintainability and flexibility, especially across different projects or machines.

---

## Step 1: Locate `ktrans.exe`

By default, `ktrans.exe` is installed in the Roboguide installation directory:

```
C:\Program Files (x86)\FANUC\ROBOGUIDE\bin\win32\ktrans.exe
```

If it is not there, search for `ktrans.exe` using Windows Explorer or the command line:

```powershell
Get-ChildItem -Path "C:\" -Recurse -Filter "ktrans.exe" -ErrorAction SilentlyContinue
```

---

## Step 2: Add `ktrans.exe` Directory to System PATH

### Windows 10/11

1. Press `Win + S` and search for **"Environment Variables"**.
2. Click **"Edit the system environment variables"**.
3. In the System Properties window, click **"Environment Variables"**.
4. Under **System variables**, find and select the `Path` variable, then click **Edit**.
5. Click **New** and enter the directory path (not the file path):

```
C:\Program Files (x86)\FANUC\ROBOGUIDE\bin\win32
```

6. Click **OK** to save and apply changes.
7. Restart Visual Studio Code.

To confirm that `ktrans.exe` is now globally accessible:

```cmd
ktrans /?
```

You should see the command-line usage output of `ktrans`.

---

## Step 3: Install Fanuc KAREL Diagnostics Extension

1. Open Visual Studio Code.
2. Go to the **Extensions** panel (Ctrl+Shift+X).
3. Search for `Fanuc KAREL Diagnostics` and install it.

---

## Step 4: Configure Extension Settings

After installation, configure the extension to use `ktrans` properly.

### Option 1: Settings UI

1. Go to File > Preferences > Settings.
2. Search for `Fanuc KAREL Diagnostics`.
3. In the **Ktrans: Args** field, enter command-line flags:

#### Example:

```
/d
```

This enables diagnostic output during compilation.

#### Advanced Example:

```
/o=compiled.pc /config robot.ini /d
```

* `/o=compiled.pc`: Sets the output binary name
* `/config robot.ini`: Uses a specific configuration file
* `/d`: Enables diagnostic output

### Option 2: settings.json

You can also manually edit the VS Code `settings.json`:

1. Press `Ctrl+Shift+P` > `Preferences: Open Settings (JSON)`
2. Add the following entries:

```json
{
  "fanucKarelDiagnostics.ktransPath": "C:\\Program Files (x86)\\FANUC\\ROBOGUIDE\\bin\\win32\\ktrans.exe",
  "fanucKarelDiagnostics.compileOnSave": true,
  "fanucKarelDiagnostics.additionalArgs": [
    "/d"
  ]
}
```

> Note: Use double-backslashes (`\\`) for file paths in JSON.

---

## Step 5: Test Compilation

1. Open a `.kl` KAREL source file.
2. Save the file (Ctrl+S).
3. If set up correctly, the extension will call `ktrans` and compile the file.
4. Compilation output and diagnostics will appear in the VS Code Problems pane or Output tab.

---

## Troubleshooting

### Problem: `ktrans` not found

* Confirm `ktrans.exe` is in the PATH.
* Restart your system and Visual Studio Code.

### Problem: No output after saving

* Check for typos in the settings.
* Verify `compileOnSave` is enabled.
* Look at the Output tab for any error messages.

---

## Conclusion

With `ktrans` in your PATH and the extension correctly configured, you now have an efficient workflow for editing, compiling, and debugging FANUC KAREL programs inside Visual Studio Code.

For further customization, refer to the official documentation of the Fanuc KAREL Diagnostics extension or contact your software support representative.

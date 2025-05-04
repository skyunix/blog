# UUP to ISO

## Overview

- Automated windows command script to process Microsoft Windows 11/10 Unified Update Platform files, allowing to build/convert them into a usable state (ISO / WIM).

- You can get UUP files by performing upgrade from Windows 11/10 build to a later build (starting 15063, aka version 1703).

- You can also obtain UUP canonical source using one of these projects:
  - [UUP dump website](https://uupdump.net/)
  - [UUP Generation Project](https://uup.rg-adguard.net/)

## How To Use

- Administrator privileges are required to run the script.

- Optional: temporarily disable AV or protection program so it doesn't interfere with the process.

- Make sure the files are not read-only or blocked.

- Extract this pack to a folder with simple spaceless path to avoid troubles (example: C:\UUP).

- Place the files in "UUPs" folder to be detected automatically, or drag and drop uup files directory on convert-UUP.cmd. Alternatively, you will be prompted to enter other UUP folder path.

- If multiple Editions detected, you will be prompted first to select one edition, some editions, or create AIO.

- To exit of the prompt or options menu just press "Enter".

## Output Choice

- **1 - Create ISO with install.wim**
- **4 - Create ISO with install.esd**

  Convert UUP files to a regular ISO distribution that contains install.wim or install.esd file.

- **2 - Create install.wim**
- **5 - Create install.esd**

  Create install.wim/install.esd file only, which can be used with other ISO with the same version or for manual apply using dism, imagex, wimlib.

- **3 - UUP Edition info**

  Display info about detected editions (architecture, language, build version, build branch, editions name).

- **6 - Configuration Options**

  Change the state of configuration options.

## Configuration Options

Control conversion behavior, output and automation.

You have three ways to change the state of these options, where 0 means the option is OFF (no), and 1 means the option is ON (yes):
- Edit **ConvertConfig.ini** under [convert-UUP] and [Store_Apps] sections
- Delete **ConvertConfig.ini** and edit **convert-UUP.cmd** script directly
- Use menu choice 6 (this does not include all options)

### Main Options

- **AutoStart**

  Start the conversion process directly without prompts.
  
  This require placing UUP files in **UUPs** folder, or starting convert-UUP.cmd from command prompt with path to UUP source folder, or drag and drop UUP source folder on convert-UUP.cmd.
  
  Set this option to **1** to create ISO with **install.wim**
  Set this option to **2** to create ISO with **install.esd**
  Set this option to **3** to create **install.wim** only
  Set this option to **4** to create **install.esd** only

- **AddUpdates**

  Update the ISO distribution or install.wim with detected updates after conversion.
  
  Set this option to **1** to **integrate updates** into wim files
  Set this option to **2** to **add updates externally** to ISO distribution

- **StartVirtual**

  Start create_virtual_editions.cmd directly after conversion is completed.

- **wim2esd**

  Convert install.wim to install.esd at the end.
  
  This option is intended to be used with **AddUpdates** option.
  This option will be auto enabled if you selected **install.esd** choice and **AddUpdates** is ON.
  
  Warning: creating install.esd will consume high amount of CPU/RAM, and take considerable time to complete.

- **wim2swm**

  Split install.wim into multiple install.swm files.
  
  This option will be auto disabled if install.wim size is below 4 GB.
  If both wim2esd/wim2swm are ON, install.esd takes precedence over split install.swm.

- **SkipISO**

  If you are not interested to create ISO file currently, or want to create Multi-Architecture ISO (x86/x64) later with multi_arch_iso.cmd, or intend to manually use create_virtual_editions.cmd

- **SkipWinRE**

  Do not add winre.wim to install.wim/install.esd, if you are not interested to have recovery environment or want to reduce ISO size/conversion period.. etc.
  
  Note: adding winre.wim to install**.esd** will consume high amount of CPU/RAM.

### Windows 11 Specific Options

Below options apply only for Windows 11 build 22563 and later:

- **SkipApps**

  Do not add Store Apps.

- **AppsLevel**

  Control added Apps for Client editions (except Team).
  
  Set to **0** to add all referenced Apps
  Set to **1** to add Store, Security Health, App Installer
  Set to **2** to add level 1 apps + Photos, Camera, Notepad, Paint
  Set to **3** to add level 2 apps + Terminal, Widgets, Mail / Outlook, Clipchamp
  Set to **4** to add level 3 apps + Media apps (Music, Video, Codecs, Phone Link) / not for N editions

- **CustomList**

  Enable using CustomAppsList.txt or CustomAppsList2.txt to pick and choose the added Apps.
  If enabled, this option takes precedence over AppsLevel option.

## Add Updates Option

### Info

- Starting Windows 10 version 1709, Servicing Stack Update and Latest Cumulative Update are handled and distributed with UUP source. In addition to some small dynamic updates used in upgrades.

- According to that, UUP Dump will offer multiple builds for the same Windows 11/10 version. Each one will represent refreshed Feature Update or new Cumulative Update.

- However, those updates are only used and applied by Windows Update, they not actual part of the UUP source itself and will not be included in the converted ISO/WIM by default.

- **AddUpdates** option provide built-in ability to directly integrate these updates, resulting a refreshed ISO/WIM, or to add them externally.

### Notes

- **Integrate** updates mode only works with install.wim (ISO or Single), and require **Windows 11/10 Host OS or Windows 11/10 ADK**.

- **External** updates mode only works with **builds 17763 and later**, and the updates will be installed during setup (clean install or upgrade).

- **Cleanup** option control image cleanup for integration mode, and will delta-compress superseded components.

- **ResetBase** option works only with Cleanup option, and will further remove superseded components.

## Virtual Editions

### Info

- Starting Windows 10 build 17063, regular editions have been unified into two base editions: Home & Pro (with their variants Home N & Pro N)

- Home China edition is still separate

- According to that, UUP will deliver installation files for the above editions only

- The following editions now exist as "virtual upgrade editions" with base editions

### Extra Notes

- If the conversion or updating process failed and you got "access denied" errors, run **Remove_Failure_MountDir_TempDir.cmd** as administrator to remove temporary mount directory and extraction leftovers.

- If the upgrade is done via Express UUP (multiple expanded folders in the download directory), you need to perform the UUP > ISO operation before starting the upgrade process (before first restart).
  To do so, when WU prompt you to restart, start convert-UUP.cmd and paste the path to download directory, example:
  C:\Windows\SoftwareDistribution\Download\07172dda91861218ecc095600216d792

  Alternatively, if you are testing in VM machine or have multi boot systems, you can choose to Shut down/Restart the system without upgrading.
  On Desktop, press Alt+F4 and choose an option without Update

## Credits

- [whatever127](https://github.com/uup-dump) - UUP dump
- [Eric Biggers](https://wimlib.net) - wimlib
- [Igor Pavlov](https://www.7-zip.org) - 7-zip
- [Melinda Bellemore](https://forums.mydigitallife.net/members/superbubble.250156/) - SxSExpand
- [BetaWorld](https://github.com/Secant1006/PSFExtractor) - PSFExtractor
- [Jeff Kluge](https://github.com/jeffkl/ManagedDism) - Managed DismApi Wrapper
- [erwan.l](http://reboot.pro/files/file/313-offlinereg) - offlinereg
- [cdob](http://reboot.pro/topic/20471-windows-pe-5x-boot-problem) - create aio efisys.bin
- Special thanks to: @rgadguard, @Enthousiast, @Windows_Addict, @s1ave77, @Ratiborus58, @NecrosoftCore, @DiamondMonday, @WzorNET
- cabarc, cdimage, imagex and bcdedit are intellectual property of Microsoft Corporation.

Author: [abbodi1406](https://github.com/abbodi1406)
# Xplora 📁

A Command line file explorer.

Xplora is a command-line tool to visualize files & directories on your file system and output them into a hierarchical tree. Xplora also comes with many other great features.

<div align="center">
<img src="https://raw.githubusercontent.com/hicodersofficial/images/main/xplora-promo.png" />
</div>

## **Installation**

```
$ npm install -g xplora
```

OR

```
$ npx xplora
```

## **Help**

```
$ xplora --help
```

```
Usage: index [options]

Options:
  -v,   --version              output the version number
  -i,   --ignore <value...>    Ignore files and directories.
  -igp, --ignore-path <value>  Path for .ignorepath file.
  -e,   --extension <value>    Matches for file extension.
  -loc, --line-of-code         Outputs Lines of code.
  -f,   --filter               Filter only matched files.
  -d,   --date <value>         Matches created date of file. Formats:
                               (">=mm-dd-yy"), ("<=mm-dd-yy hh:mm a"),
                               (">mm-dd-yy hh:mm"),
                               (">=mm-dd-yy | <mm-dd-yy")

  -s,   --file-size <value>    Matched file size in bytes. Format: 1000,
                               (">=1000"), ("<1000"),
                               (">=1000 | <2000")

  -fn,  --file-name <value>    Matches for file name.
  -nr,  --not-recursive        Not recursive
  -nf,  --not-formatted        Not formatted
  -sd,  --start-dir <path>     Starting Directory path.
  -ncd, --not-created-date     Hides file created date.
  -fct, --file-created-time    Shows file created time.
  -h,   --help                 Display help for command for xplora.
```

## **Ignoring file & directories**

Xplora support two ways for ignoring files & directories firstly by arguments and secondly by `.igonrepath` file.

### 1 Method

```
$ xplora --ignore node_modules .git .vscode .idea
```

Use `**` at start of file/directory name to ignore in all sub directories.

```
$ xplora --ignore "**node_modules" "**Readme.md"
```

By default xplora ignore these directories `node_modules .git .vscode .idea`.

### 2 Method

Create `.ignorepath` file

```
$ touch .ignorepath
```

And just add file & directories on each line.

## **Filtering files**

Files can be filtered by their extensions, name (_support_ `regex exp`), created date or, by size (_in bytes_).

**Examples:**

Include `--filter` flag to filter only match files.

- `xplora --extension .js --filter` Filter files that matches `.js` extension.

- `xplora --file-name index --filter` Filter files that matches `index` filename.

- `xplora --file-size 1024 --filter` Filter files that are >= 1KB.

- `xplora --file-size "<=1024" --filter` Filter files that are <=1KB.

- `xplora --file-size ">=1024 | <5120" --filter` Filter files that are >=1KB but <5KB.

- `xplora --date "08-24-21" --filter` Filter files that are created after August 24, 2021.

- `xplora --date ">=08-24-21 | <10-20-21" --filter` Filter files that are created in between of August 24, 2021 to September 01, 2021.

## **Line Of Code (LOC)**

It was never this easy to calculate lines of code for your whole project but, by using one command Xplora can calculate the total lines of code of your project.

Any `text-based extension`(_non-binary_) files are support loc. [List of supported extension](https://github.com/hicodersofficial/xplora/blob/main/lib/shared/textExt.js).

**Command:** `-loc, --line-of-code `

```
$ xplora -e .js --line-of-code
```

## **Screenshot**

| `xplora`                                                                                                |                                `xplora --extension .js --filter --line-of-code`                                |
| ------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------: |
| <img src="https://raw.githubusercontent.com/hicodersofficial/images/main/xplora-1.1.0.png" width="500"> | <img src="https://raw.githubusercontent.com/hicodersofficial/images/main/xplora-1.1.0-filter.png" width="500"> |

### **Thank You!** 💙

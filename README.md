# Xplora 📁

A Command line file explorer.

Xplora is a command-line tool to visualize files & directories on your file system and output them into a hierarchical tree. Xplora also comes with many other great features.

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
  -v,   --version            output the version number
  -i,   --ignore [value...]  Ignore files and directories
  -e,   --extension <value>  File extension
  -f,   --filter             filter only matched files
  -loc, --line-of-code       Line of code
  -s,   --file-size <value>  File size
  -fn,  --file-name <value>  File name
  -nr,  --not-recursive      Not recursive
  -nf,  --not-formatted      Not formatted
  -ncd, --not-created-date   Hides file created time
  -fct, --file-created-time  Show file created time
  -h,   --help               Display help for command for xplora
```

## **Ignoring file & directories**

Xplora support two ways for ignoring files & directories firstly by arguments and secondly by `.igonrepath` file.

### 1 Method

```
$ xplora --ignore node_modules .git .vscode .idea
```

By default xplora ignore these directories `node_modules .git .vscode .idea`.

### 2 Method

Create `.ignorepath` file

```
$ touch .ignorepath
```

And just add file & directories on each line.

## **Filtering files**

Files can be filter using extensions, name (_support_ `regex exp`), and size (_in bytes_).

**Examples:**

Include `--filter` flag to filter only match files.

`xplora --extension .js --filter` Filter files that matches `.js` extension.

`xplora --file-name index --filter` Filter files that matches `index` filename.

`xplora --file-size 1024 --filter` Filter files that are >= 1KB.

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

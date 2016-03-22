# BitcoinRobots
A collection of robot scripts that can be used to earn bitcoins on websites offering "free" bitcoins

## How to use
Follow these general steps to proceed:
* Navigate to the website listed at the top of the script
* Create an account if you don't already have one
* Claim your free bitcoins and/or transfer from an external wallet
* Right click anywhere on the site -> choose "inspect element" -> go to "console" tab
* Paste the script into the console and hit enter

## How does it work
By default it works under the assumption that you can double your bet each time you loose, each time you loose the chance of winning by betting on the same value increases, here's a few examples:

### Default config: profit: 2.00 / win: reset / loose: x2
| Round:        | Bet:    | Loss (if loose) | Profit (if win) |
| ------------- | ------- | ---------------:| ---------------:|
| 1             | 1       | 1               | 1               |
| 2             | 2       | 3               | 1               |  
| 3             | 4       | 7               | 1               |   
| 4             | 8       | 15              | 1               |  

### Double profit config: profit: 3.00 / win: reset / loose: x2
| Round:        | Bet:    | Loss (if loose) | Profit (if win) |
| ------------- | ------- | ---------------:| ---------------:|
| 1             | 1       | 1               | 2               |
| 2             | 2       | 3               | 4               |  
| 3             | 4       | 7               | 8               |   
| 4             | 8       | 15              | 16              | 

### 4x on loose config: profit: 2.00 / win: reset / loose: x4
| Round:        | Bet:    | Loss (if loose) | Profit (if win) |
| ------------- | ------- | ---------------:| ---------------:|
| 1             | 1       | 1               | 1               |
| 2             | 4       | 5               | 4               |  
| 3             | 16      | 21              | 16              |   
| 4             | 64      | 85              | 64              | 

### 4x on loose and double profit config: profit: 3.00 / win: reset / loose: x4
| Round:        | Bet:    | Loss (if loose) | Profit (if win) |
| ------------- | ------- | ---------------:| ---------------:|
| 1             | 1       | 1               | 2               |
| 2             | 4       | 5               | 8               |  
| 3             | 16      | 21              | 32              |   
| 4             | 64      | 85              | 128             | 

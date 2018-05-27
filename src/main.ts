import { app, BrowserWindow, session, Menu } from "electron";
import * as path from "path";
import * as url from "url";

let win: Electron.BrowserWindow;
let willQuitApp: boolean = false;
let menu: any;

function createWindow() {

    win = new BrowserWindow({
        width: 1180,
        height: 780,
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
    }));

    win.webContents.openDevTools();

    win.on('close', (e) => {

        if (willQuitApp) {
            /* the user tried to quit the app */
            win = null;
        } else {
            /* the user only tried to close the window */
            e.preventDefault();
            win.hide();
        }

    });

    menu = require('./menu')

    filterRequests()

}

/* 

  Block Facebook AJAX calls
    Read indicator: https://www.messenger.com/ajax/mercury/change_read_status.php?dpr=2
    Typing indicator: https://www.facebook.com/ajax/messaging/typ.php

*/

function filterRequests() {

    session.defaultSession.webRequest.onBeforeRequest({urls: ['*://*./*']}, function(details: any, callback: any) {
        
        var test_url = details.url;
        var reg_read_ind = new RegExp('(.)*change_read_status.php(.)*');
        var reg_typing_ind = new RegExp('(.)*messaging/typ.php(.)*');
    
        if(reg_read_ind.test(test_url) && menu.isBlockingReadIndicator){
    
            console.log("Blocked url (reading indicator): ", test_url);
            callback({cancel: true})
    
        }
        else if(reg_typing_ind.test(test_url) && menu.isBlockingTypingIndicator){
            console.log("Blocked url (typing indicator): ", test_url);
            callback({cancel: true})
    
        }
        else {
    
            callback({cancel: false})
    
        }
  
    });
  
  }

app.on("ready", createWindow);
app.on("activate", () => win.show());
app.on('before-quit', () => willQuitApp = true);
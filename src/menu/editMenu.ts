const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app

let isBlockingReadIndicator = true;
let isBlockingTypingIndicator = true;

module.exports.isBlockingReadIndicator = true;
module.exports.isBlockingTypingIndicator = true;

class MainMenu {

  isBlockingReadIndicator: boolean;
  isBlockingTypingIndicator: boolean;
  template : Array<Object>;

  constructor(isBlockingReadIndicator: boolean, isBlockingTypingIndicator: boolean) {

    this.template = [
      {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          {
            role: 'pasteandmatchstyle'
          },
          {
            role: 'delete'
          },
          {
            role: 'selectall'
          }
        ]
      },
      {
        label: 'Privacy',
        submenu: [
          {
            label: 'Block Read Indicator',
            type: 'checkbox',
            checked: true,
    
            click: this.toggleBlockReadIndicator()
          },
          {
            label: 'Block Typing Indicator',
            type: 'checkbox',
            checked: true,
    
              click: this.toggleBlockTypingIndicator()
          }
        ]
      }
    ]

    if (process.platform === 'darwin') {

      const name = app.getName()
    
      this.template.unshift({
        label: name,
        submenu: [
          {
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            role: 'services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            role: 'hide'
          },
          {
            role: 'hideothers'
          },
          {
            role: 'unhide'
          },
          {
            type: 'separator'
          },
          {
            role: 'quit'
          }
        ]
      })
    
    }

    const menu = Menu.buildFromTemplate(this.template)
    Menu.setApplicationMenu(menu)

  }

  toggleBlockReadIndicator() {
    isBlockingReadIndicator = !isBlockingReadIndicator;
  }

  toggleBlockTypingIndicator() {
    isBlockingTypingIndicator = !isBlockingTypingIndicator;
  }

}
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kiberAPI', {
  executeTask: async (action, payload) => {
    const allowedActions = ['removeScreenTime', 'removeScreenTimeAccount', 'blockOtaReset', 'scanDevice'];
    if (!allowedActions.includes(action)) {
      throw new Error('Ruxsat berilmagan harakat!');
    }
    return await ipcRenderer.invoke('kiber-api-task', { action, payload });
  }
});
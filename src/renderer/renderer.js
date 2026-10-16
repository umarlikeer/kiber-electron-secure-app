document.addEventListener('DOMContentLoaded', async () => {
  const btnScan = document.getElementById('btnScan');
  const btnExecute = document.getElementById('btnExecute');
  const logBox = document.getElementById('logBox');

  function addLog(msg) {
    const p = document.createElement('p');
    p.className = 'log-entry';
    p.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logBox.appendChild(p);
    logBox.scrollTop = logBox.scrollHeight;
  }

  async function performScan() {
    addLog('Qurilma skan qilinmoqda...');
    try {
      const res = await window.kiberAPI.executeTask('scanDevice');
      if (res && res.device) {
        document.getElementById('devSN').textContent = `SN: ${res.device.serialNumber}`;
        document.getElementById('deviCloud').textContent = `iCloud: ${res.device.iCloudStatus}`;
        document.getElementById('devVer').textContent = `iOS: ${res.device.iosVersion}`;
        addLog('Qurilma ma\'lumotlari yangilandi.');
      }
    } catch (e) {
      addLog(`Xatolik: ${e.message}`);
    }
  }

  btnScan.addEventListener('click', performScan);

  btnExecute.addEventListener('click', async () => {
    const selectedTask = document.querySelector('input[name="taskOption"]:checked').value;
    const otaBlocked = document.getElementById('chkOtaReset').checked;

    addLog(`Topshiriq yuborilmoqda: ${selectedTask}`);
    try {
      const resTask = await window.kiberAPI.executeTask(selectedTask, {});
      addLog(`Natija (${selectedTask}): ${JSON.stringify(resTask)}`);

      if (otaBlocked) {
        const resOta = await window.kiberAPI.executeTask('blockOtaReset', true);
        addLog(`OTA Bloklash natijasi: ${JSON.stringify(resOta)}`);
      }
    } catch (e) {
      addLog(`Xatolik: ${e.message}`);
    }
  });

  await performScan();
});
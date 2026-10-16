async function scanDevice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        device: {
          serialNumber: 'C02XL189JGH7',
          iCloudStatus: 'Partially Clean',
          iosVersion: 'iOS 17.4'
        }
      });
    }, 1000);
  });
}

module.exports = { scanDevice };
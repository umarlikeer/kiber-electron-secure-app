async function blockOtaReset(enabled) {
  try {
    return {
      success: true,
      module: 'blockOtaReset',
      status: enabled ? 'BLOCKED' : 'UNBLOCKED',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { blockOtaReset };
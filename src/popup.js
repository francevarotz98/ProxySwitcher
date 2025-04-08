// Set proxy on click and save it
document.getElementById("apply").addEventListener("click", async () => {
  const selected = document.querySelector("input[name='proxy']:checked");
  if (selected) {
    const proxyType = selected.value;
    await browser.runtime.sendMessage({ action: "set-proxy", proxyType });
    await browser.storage.local.set({ lastProxy: proxyType });
    updateStatus(proxyType);
  }
});

// On popup open: load last used proxy and update UI
document.addEventListener("DOMContentLoaded", async () => {
  const { lastProxy } = await browser.storage.local.get("lastProxy");

  if (lastProxy) {
    const radio = document.querySelector(`input[value="${lastProxy}"]`);
    if (radio) radio.checked = true;
    updateStatus(lastProxy);
  } else {
    updateStatus("unknown");
  }
});

function updateStatus(proxy) {
  document.getElementById("status").textContent = `Current Proxy: ${proxy}`;
}

const proxySelect = document.getElementById("proxySelect");
const statusText = document.getElementById("status");
const statusDot = document.getElementById("statusDot");

// On Apply button click
document.getElementById("applyBtn").addEventListener("click", async () => {
  const selectedProxy = proxySelect.value;
  await browser.runtime.sendMessage({ action: "set-proxy", proxyType: selectedProxy });
  await browser.storage.local.set({ lastProxy: selectedProxy });
  updateStatus(selectedProxy);
});

// On popup open: restore saved proxy setting
document.addEventListener("DOMContentLoaded", async () => {
  const { lastProxy } = await browser.storage.local.get("lastProxy");
  const active = lastProxy || "none";
  proxySelect.value = active;
  updateStatus(active);
});

function updateStatus(proxyType) {
  const dot = proxyType === "none" || proxyType === "unknown" ? "gray" : "green";
  statusText.innerHTML = `
    <span class="dot ${dot}" id="statusDot"></span>
    Current Proxy: ${proxyType}
  `;
}

console.log("[*] Background script loaded");

let activeProxy = "none";

// Handle button clicks from popup
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "set-proxy") {
    activeProxy = message.proxyType;
    console.log("[*] Set activeProxy to:", activeProxy);
  }
});

// applying the right proxy and intrcepting all requests
browser.proxy.onRequest.addListener(
  (requestInfo) => {
    // un-comment following line if you want to log intercepted requests 
    //comment.log("[*] Intercepting request to:", requestInfo.url);

    if (activeProxy === "http") {
      return {
        type: "http",
        host: "127.0.0.1",
        port: 8080
      };
    } 
    
    else if (activeProxy === "socks5") {
      return {
        type: "socks",
        host: "127.0.0.1",
        port: 9050
      };
    } else {
      return { type: "direct" };
    }
  },
  { urls: ["<all_urls>"] }
);


// Required error handler for proxy API
browser.proxy.onError.addListener((error) => {
  console.error("[-] Proxy error:", error.message);
});

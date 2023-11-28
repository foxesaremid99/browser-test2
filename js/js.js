let history = {};
let sir = true;

// functions
function getUrl(x) {
  console.log(x);
  const urlBarcontents = x || document.getElementById("urlbar").value;
  const urlThing = "/main.php";
  if (urlThing === null) throw Error("Invalid URL " + urlBarcontents);
  const b64Url = btoa(urlBarcontents);
  return b64Url;
}
const getActiveFrameId = () =>
  +document.querySelector(".chrome-tab[active]").getAttribute("ifd") + 1;
function addPageToHistory(id, page) {
  if (!sir) {
    sir = true;
    return;
  }
  if (!(id in history)) {
    history[id] = [[], -1];
  }

  if (history[id][1] < history[id][0].length - 1) {
    history[id][0] = history[id][0].slice(0, history[id][1] + 1);
  }
  if (history[id][0][[history[id].length - 1]] === page) return;
  history[id][0].push(page);
  history[id][1] = history[id][0].length - 1;
}
function getPage(id) {
  return ((history[id] || [])[0] || [])[history[id][1]] || "";
}
function getBack(id) {
  sir = false;
  history[id][1]--;
  return getPage(id);
}
function getForward(id) {
  if (history[id][1] >= history[id][0].length - 1) return getPage(id);
  sir = false;
  history[id][1]++;
  return getPage(id);
}
function decodeUrl(x) {
  const y = x.split("/");
  if (y[0].includes("%") === true) {
    return atob(y[0].split("%")[0]);
  } else {
    return atob(y[0]);
  }
}
function getBookmark() {
  let abmk = document
    .getElementById(getActiveFrameId())
    .contentDocument.querySelector(
      'link[rel="favicon"], link[rel="shortcut icon"], link[rel="icon"]'
    );
  if (abmk !== null) {
    return abmk.href;
  } else {
    return "/favicon.ico";
  }
}
function setinfo(aa) {
  document.getElementsByClassName(
    aa
  )[0].firstChild.data = document.getElementById(
    aa
  ).contentWindow.document.title;
  if (!document.getElementById(aa).contentWindow.location.href.includes("")) {
    addPageToHistory(
      aa,
      document.getElementById(aa).contentWindow.location.href
    );
    return;
  }
  let regUrl = document.getElementById(aa).contentWindow.location.href;
  regUrl = regUrl.split("").slice(1).join("");
  let b64Url = decodeUrl(regUrl);
  if (getActiveFrameId() === +aa) {
    document.getElementById("urlbar").value = b64Url;
  }
  document.querySelector(
    `div[ifd="${+aa - 1}"]`
  ).children[2].children[0].attributes[1].value = `background-image: url(${getBookmark()})`;
  addPageToHistory(aa, document.getElementById(aa).contentWindow.location.href);
}
function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}
function action(a) {
  document.getElementById(getActiveFrameId()).src = document.getElementById(
    "urlbar"
  ).value;
  let value = document.getElementById("urlbar");
  if (value === "") {
    alert("Please insert a URL");
  } else if (!value.value.includes("http")) {
    if (!isUrl(value.value)) {
      value.value = "https://www.bing.com/search?q=" + value.value;
    } else {
      value.value = "https://" + value.value;
    }
    // let b64URL = document.getElementById("urlbar").value;
    document.getElementById(getActiveFrameId()).src = document.getElementById(
      "urlbar"
    ).value;
  } else {
    // let b64URL = document.getElementById("urlbar").value;
    document.getElementById(getActiveFrameId()).src = document.getElementById(
      "urlbar"
    ).value;
  }
  /*
else if (!value.value.includes("http")) {
    value.value = "http://" + value.value;
    // let b64URL = document.getElementById("urlbar").value;
    document.getElementById(getActiveFrameId()).src = document.getElementById(
      "urlbar"
    ).value;
  } 
  */
}
function hideId(...x) {
  x.forEach((a) => {
    document.getElementById(a).style.display = "none";
  });
}
document.getElementById("refreshbtn").onclick = function () {
  refresh();
};
document.getElementById("forwardbtn").onclick = function () {
  forward();
};
document.getElementById("backbtn").onclick = function () {
  back();
};
function refresh() {
  document.getElementById(
    getActiveFrameId()
  ).contentWindow.location = document.getElementById(
    getActiveFrameId()
  ).contentWindow.location;
}
function forward() {
  document.getElementById(getActiveFrameId()).src = getForward(
    getActiveFrameId()
  );
}
function back() {
  document.getElementById(getActiveFrameId()).src = getBack(getActiveFrameId());
}
function showId(...x) {
  x.forEach((a) => {
    document.getElementById(a).style.display = "block";
  });
}
function toggleId(...x) {
  x.forEach((a) => {
    if (getComputedStyle(document.getElementById(a)).display === "none") {
      showId(a);
    } else {
      hideId(a);
    }
  });
}
function openMenu(...x) {
  let elems = x.map((id) => document.getElementById(id));
  let shouldOpen = true;
  elems.forEach((elm) => {
    if (getComputedStyle(elm).display !== "none") {
      shouldOpen = false;
    }
  });
  if (shouldOpen) {
    showId(elems[0].id);
  } else {
    elems.forEach((elm) => hideId(elm.id));
  }
}
function inspect() {
  (function () {
    var script = document.createElement("script");
    script.src = "js/inspect.js";
    script.className = "webxray";
    script.setAttribute("data-lang", "en-US");
    script.setAttribute("data-baseuri", "https://x-ray-goggles.mouse.org");
    document.body.appendChild(script);
  })();
}
function opencity(a) {
  tc = document.getElementsByClassName("iframething");
  for (ii = 0; ii < tc.length; ii++) {
    tc[ii].style.display = "none";
  }
  document.getElementById(a).style = "display:inline";
  document.getElementById(a).focus();
  switch (document.getElementById(a).contentWindow.location.href) {
    case `${document.URL}main.php`:
      document.getElementById("urlbar").value = " ";
      break;
    case "":
      break;
    default:
      let regUrl = document.getElementById(a).contentWindow.location.href;
      regUrl = regUrl.split("").slice(1).join("");
      let b64Url = decodeUrl(regUrl);
      if (getActiveFrameId() === +a) {
        // document.getElementById("urlbar").value = b64Url;
        // document.getElementById("urlbar").value = document.getElementById(a).contentWindow.location.href;
      }
      break;
  }
}
try {
  setTimeout(() => {
    (
      [...document.getElementsByTagName`iframe`].reverse().find((a) => !a.src)
        .contentDocument.getElementsByTagName`button`[0] ||
      document.createElement`a`
    ).click();
  }, 10000);
} catch (err) {}
var el = document.querySelector(".chrome-tabs");
var chromeTabs = new ChromeTabs();
chromeTabs.init(el);
var i = 2;
document
  .querySelector("button[data-add-tab]")
  .addEventListener("click", (_) => {
    _.preventDefault();
    chromeTabs.addTab({
      title: "New Tab",
      favicon:
        "data:image/png;base64,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"
    });
    document.getElementById("urlbar").value = "";
    var uwu = i++;
    var frame = document.createElement("IFRAME");
    frame.setAttribute("src", "");
    frame.setAttribute("allow", "fullscreen");
    frame.setAttribute(
      "sandbox",
      "allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
    );
    document.body.appendChild(frame);
    frame.setAttribute("class", "iframething");
    frame.setAttribute("style", "display:none");
    frame.setAttribute("id", uwu);
    frame.setAttribute("onload", `setinfo(${uwu});`);
    frame.onload = function() {
      document.getElementById("urlbar").value = frame.contentWindow.location.href;
    };
    opencity(uwu);
  });

function OpenTab(url, name) {
  //_.preventDefault();
  chromeTabs.addTab({
    title: name,
    favicon: ""
  });
  document.getElementById("urlbar").value = "";
  var uwu = i++;
  var frame = document.createElement("IFRAME");
  frame.setAttribute("src", url);
  frame.setAttribute("allow", "fullscreen");
  frame.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
  );
  document.body.appendChild(frame);
  frame.setAttribute("class", "iframething");
  frame.setAttribute("style", "display:none");
  frame.setAttribute("id", uwu);
  frame.setAttribute("onload", `setinfo(${uwu});`);
  frame.onload = function() {
    document.getElementById("urlbar").value = frame.contentWindow.location.href;
  };
  opencity(uwu);
}

function WebU() {
  // _.preventDefault()
  chromeTabs.addTab({
    title: "Search",
    favicon:
      "data:image/png;base64,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"
  });
  document.getElementById("urlbar").value = "";
  var uwu = i++;
  var frame = document.createElement("IFRAME");
  frame.setAttribute("src", "https://bing.com");
  frame.setAttribute("allow", "fullscreen");
  frame.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
  );
  document.body.appendChild(frame);
  frame.setAttribute("class", "iframething");
  frame.setAttribute("style", "display:none");
  frame.setAttribute("id", uwu);
  frame.setAttribute("onload", `setinfo(${uwu});`);
  frame.onload = function() {
    document.getElementById("urlbar").value = frame.contentWindow.location.href;
  };
  opencity(uwu);
}

document.querySelector("#urlbar").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;
  action("");
  event.preventDefault();
});
document.getElementById("createTab").click();
document.getElementById("optionsdrop").style.display = "none";
if (!("tabbkg" in localStorage)) {
  localStorage.setItem("tabbkg", "#202124");
  localStorage.setItem("tabhover", "#292b2e");
  localStorage.setItem("tabact", "#323639");
  localStorage.setItem("tabacttit", "#f1f3f4");
  localStorage.setItem("tabinatit", "#9ca1a7");
  localStorage.setItem("searchbar", "#202124");
  localStorage.setItem("mockb", "#323639");
  localStorage.setItem("nt", "#FFF");
  localStorage.setItem("ua", navigator.userAgent);
}
let items = [
  "tabbkg",
  "tabhover",
  "tabact",
  "tabacttit",
  "tabinatit",
  "searchbar",
  "ua"
];
function applyTheme(a) {
  switch (a) {
    case "Apply":
      for (ii = 0; ii < items.length; ii++) {
        localStorage.setItem(
          items[ii],
          `${document.getElementById(items[ii]).value}`
        );
      }
      localStorage.setItem("mockb", document.getElementById("tabact").value);
      location.reload();
      break;
    case "Dark":
    case "Reset":
      localStorage.setItem("tabbkg", "#202124");
      localStorage.setItem("tabhover", "#202124");
      localStorage.setItem("tabact", "#323639");
      localStorage.setItem("tabacttit", "#9ca1a7");
      localStorage.setItem("tabacttit", "#f1f3f4");
      localStorage.setItem("tabinatit", "#9ca1a7");
      localStorage.setItem("searchbar", "#202124");
      localStorage.setItem("mockb", "#323639");
      localStorage.setItem("nt", "#FFF");
      location.reload();
      break;
    case "Light":
      localStorage.setItem("tabbkg", "#f4f5f6");
      localStorage.setItem("tabhover", "#f4f5f6");
      localStorage.setItem("tabact", "#fff");
      localStorage.setItem("tabacttit", "#9ca1a7");
      localStorage.setItem("tabacttit", "#45474a");
      localStorage.setItem("tabinatit", "#5f6368");
      localStorage.setItem("searchbar", "#D0D8E8 ");
      localStorage.setItem("mockb", "#fff");
      localStorage.setItem("nt", "#323639");
      location.reload();
      break;
  }
}
for (ii = 0; ii < items.length; ii++) {
  document.getElementById(items[ii]).value = localStorage.getItem(items[ii]);
}
document.cookie = `alloyua=${localStorage.getItem("ua")}`;
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>.chrome-tabs.chrome-tabs-dark-theme {background: ${localStorage.getItem(
    "tabbkg"
  )};} .dropdown-content {background-color: ${localStorage.getItem(
    "tabbkg"
  )};} .mock-browser-content {background-color: ${localStorage.getItem(
    "mockb"
  )};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tabs-bottom-bar {background-color: ${localStorage.getItem(
    "tabact"
  )};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem(
    "tabact"
  )};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem(
    "tabhover"
  )};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-title {color: ${localStorage.getItem(
    "tabacttit"
  )};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-title {color: ${localStorage.getItem(
    "tabinatit"
  )};} #urlbar {background: ${localStorage.getItem(
    "searchbar"
  )}; color: ${localStorage.getItem(
    "nt"
  )}; } #createTab {color: ${localStorage.getItem(
    "nt"
  )}} .dropdown-content a {color: ${localStorage.getItem(
    "nt"
  )}} #backbtn {color: ${localStorage.getItem(
    "nt"
  )}} #forwardbtn {color: ${localStorage.getItem(
    "nt"
  )}} #refreshbtn {color: ${localStorage.getItem(
    "nt"
  )}} #options {color: ${localStorage.getItem("nt")}} </style>`
);
window.onbeforeunload = function () {};
//bookmarks
function AddBookmark() {
  let data = JSON.parse(localStorage.getItem("bookmarks"));
  console.log(
    document.getElementById(getActiveFrameId()).contentWindow.location.href +
      "  " +
      getBookmark() +
      " " +
      document.getElementById(getActiveFrameId()).contentWindow.document.title
  );
  data.push([
    document.getElementById(getActiveFrameId()).contentWindow.location.href,
    getBookmark(),
    document.getElementById(getActiveFrameId()).contentWindow.document.title
  ]);
  localStorage.setItem("bookmarks", JSON.stringify(data));
}
function setUA(a) {
  switch (a) {
    case "chrome":
      break;
    case "firefox":
      break;
    case "iphone":
      break;
    case "ipad":
      break;
    default:
      break;
  }
}


function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

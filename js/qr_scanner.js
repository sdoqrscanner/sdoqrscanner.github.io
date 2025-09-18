"use strict";
const callbacks = {
  display: function (response, responseCode) {
    display1.innerHTML = "";
    display1.innerHTML = response;
    if (responseCode == 200) {
      beep.play();
      display1.innerHTML = response;
      due.setAttribute("style", "background-color: green !important");
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit");
      }, 1000);
    } else if (responseCode === 13) {
      beep2.play();
      display1.innerHTML = response;
      due.setAttribute("style", "background-color: yellow !important");
      display1.setAttribute("style", "color: #172a3a !important");
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit; color: inherit");
        display1.setAttribute("style", "color: inherit");
        display1.innerHTML = display1.innerHTML;
      }, 1000);
    } else if (responseCode == 11) {
      beep3.play();
      display1.innerHTML = response;
      due.setAttribute("style", "background-color: red !important");
      display1.setAttribute("style", "color: #f1edee !important");
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit; color: inherit");
        display1.setAttribute("style", "color: inherit");
      }, 1000);
    } else {
      beep3.play();
      display1.innerHTML = "Errore: " + xhr.response;
      due.setAttribute("style", "background-color: red !important");
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit");
      }, 1000);
    }
  },
  onBan: function (response, responseCode, arg) {
    if (responseCode === 200) {
      dispaly2.innerHTML = response;
      ban_name.value = "";
      if (arg == "checkban") {
        var risposta = response;
        risposta.replace("[", "").replace("]", "");
        let suggestion = [];
        suggestion = risposta.split(",");
        let suggestionArray = [];
        dataList.innerHTML = "";
        for (let i = 0; i < suggestion.length; i++) {
          if (suggestion[i].replace(" ", "").length > 0) {
            suggestionArray[i] = document.createElement("option");
            if (
              suggestion[i].indexOf("[") >= 0 ||
              suggestion[i].indexOf("]") >= 0
            ) {
              suggestionArray[i].text = suggestion[i];
              suggestionArray[i].value = suggestion[i]
                .replace("[", "")
                .replace("]", "");
            } else {
              suggestionArray[i].value = suggestion[i];
            }
            dataList.appendChild(suggestionArray[i]);
          }
        }
      }
    } else if (responseCode === 11) {
      dispaly2.innerHTML = response;
      ban_name.value = "";
    } else {
      dispaly2.innerHTML = xhr.response;
      ban_name.value = "";
    }
  },
  onSignIn: function (response, responseCode) {
    if (responseCode === 200) {
      sgin.classList.add("form_invisible");
      input.value = "";
      Signin_input.setAttribute("placeholder", response);
      input.setAttribute("placeholder", Ip);
      display1.innerHTML = response;
      due.setAttribute("style", "background-color: green !important");
      if (UserId == "KALI") {
        container.classList.add("Yspace");
        settings.setAttribute("style", "visibility: inherit");
        body.insertBefore(settings, body.firstChild);
      } else {
        container.classList.remove("Yspace");
        if (body.contains(settings)) {
          body.removeChild(settings);
        }
      }
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit");
      }, 1000);
    } else if (responseCode === 11) {
      sgin.classList.remove("form_invisible");
      Signin_input.setAttribute("placeholder", response);
      setTimeout(() => {
        Signin_input.setAttribute("placeholder", "User-Id");
      }, 1500);
      UserId_test = "";
      UserId = "";
      Signin_input.value = "";
    } else {
      sgin.classList.remove("form_invisible");
      Signin_input.setAttribute("placeholder", response);
      setTimeout(() => {
        Signin_input.setAttribute("placeholder", "User-Id");
      }, 1500);
      User_test = "";
      UserId = "";
      Signin_input.value = "";
    }
  },
  onSignUp: function (response, responseCode) {
    if (responseCode === 200) {
      form.classList.remove("form_invisible");
      if (UserId == "KALI") {
        container.classList.add("Yspace");
        settings.setAttribute("style", "visibility: inherit !important");
        body.insertBefore(settings, body.firstChild);
      } else {
        if (body.contains(settings)) {
          body.removeChild(settings);
        }
      }
      input.value = "";
      formInput.setAttribute("placeholder", response);
      input.setAttribute("placeholder", Ip);
      display1.innerHTML = response;
      due.setAttribute("style", "background-color: green !important");
      setTimeout(() => {
        due.setAttribute("style", "background-color: inherit");
      }, 1000);
      setTimeout(() => {
        form.classList.add("form_invisible");
      }, 500);
    } else if (responseCode === 11) {
      form.classList.remove("form_invisible");
      formInput.setAttribute("placeholder", response);
      setTimeout(() => {
        formInput.setAttribute("placeholder", "User-Id");
      }, 1500);
      User_test = "";
      UserId = "";
      formInput.value = "";
    } else {
      form.classList.remove("form_invisible");
      formInput.setAttribute("placeholder", response);
      User_test = "";
      UserId = "";
      formInput.value = "";
      setTimeout(() => {
        formInput.setAttribute("placeholder", "User-Id");
      }, 1500);
    }
  },
  onStatus: function (response, responseCode) {
    if (responseCode === 200) {
      if (change.contains(play)) {
        change.removeChild(play);
      }
      change.appendChild(pause);
      circle.setAttribute("style", "background-color: green");
    } else if (responseCode == 13) {
      if (change.contains(pause)) {
        change.removeChild(pause);
      }
      change.appendChild(play);
      circle.setAttribute("style", "background-color: yellow");
      return response;
    } else if (responseCode == 11) {
      if (change.contains(play)) {
        change.removeChild(play);
      }
      if (change.contains(pause)) {
        change.removeChild(pause);
      }
      circle.setAttribute("style", "background-color: red");
      return response;
    } else {
      settings.classList.remove("settings_invisible");
      container.classList.add("Yspace");
      if (change.contains(play)) {
        change.removeChild(play);
      }
      if (change.contains(pause)) {
        change.removeChild(pause);
      }
      circle.setAttribute("style", "background-color: red");
      return response;
    }
  },
};

const request = function (Ip, User, arg, headers, callback) {
  const xhr = new XMLHttpRequest();
  if (User.length <= 0 || Ip.length <= 0) {
    alert("Inserisci Ip e User (2)");
  } else {
    xhr.open("GET", "https://" + Ip + "/" + arg);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.setRequestHeader("User-id", User);
    if (typeof headers == "object") {
      /*PER OGNI ITEM NELL' OGETTO CREA UN HEADER CON NOME == CHIAVE OGGETTO  ,  VALROE == VALORE OGGETTO  */
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    } else {
      throw new TypeError(
        `Expected type object for headers, got ${typeof headers}`
      );
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          UserId = User;
          if (arg == "checkban") {
            callback(xhr.response, xhr.status, arg);
          } else {
            callback(xhr.response, xhr.status);
          }
          return xhr.response, xhr.status;
        } else if (xhr.status === 13) {
          callback(xhr.response, xhr.status);
          return xhr.response, xhr.status;
        } else if (xhr.status === 11) {
          callback(xhr.response, xhr.status);
          return xhr.response, xhr.status;
        } else {
          callback(xhr.response, xhr.status);
          return xhr.response, xhr.status;
        }
      } else {
        callback(xhr.response, xhr.status);
        return xhr.response, xhr.readyState;
      }
    };
  }
  xhr.send();
  if (callback.name == "BAN") {
    dispaly2.innerHTML = "Connecting...";
  }
};

let contentMax;
function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(function () {
  var lastMessage;
  var codeId = 0;
  function onScanSuccess(decodedText, decodedResult) {
    if (lastMessage !== decodedText) {
      display1.innerHTML = "";
      lastMessage = decodedText;
      contentMax = decodedText;
      display1.innerHTML = "";
      if (
        decodedText.startsWith("https://") ||
        decodedText.startsWith("http://") ||
        decodedText.startsWith("www.")
      ) {
        let link = document.createElement("a");
        link.setAttribute("href", decodedText);
        link.setAttribute("target", "blank");
        link.innerHTML = decodedText;
        display1.appendChild(link);
      } else {
        display1.innerHTML = decodedText;
      }
      document.querySelectorAll("video")[0].classList.add("border_colored");
      setTimeout(() => {
        document
          .querySelectorAll("video")[0]
          .classList.remove("border_colored");
      }, 500);

      if (Ip == undefined || Ip.length <= 0 || UserId == "") {
        /*SE L'IP NON è DEFINITO L'INPUT PER L'IP DIVENTA DI BORDO ROSSO*/
        input.setAttribute("style", "border: solid 2px red !important");
        setTimeout(() => {
          input.setAttribute("style", "");
        }, 800);
      } else {
        request(Ip, UserId, contentMax, {}, callbacks.display);
      }
    }
  }
  var qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    // Square QR Box, with size = 80% of the min edge.
    var minEdgeSizeThreshold = 400;
    var edgeSizePercentage = 0.75;
    var minEdgeSize =
      viewfinderWidth > viewfinderHeight ? viewfinderHeight : viewfinderWidth;
    var qrboxEdgeSize = Math.floor(minEdgeSize * edgeSizePercentage);
    if (qrboxEdgeSize < minEdgeSizeThreshold) {
      if (minEdgeSize < minEdgeSizeThreshold) {
        return { width: minEdgeSize, height: minEdgeSize };
      } else {
        return {
          width: minEdgeSizeThreshold,
          height: minEdgeSizeThreshold,
        };
      }
    }
    return { width: qrboxEdgeSize, height: qrboxEdgeSize };
  };
  let html5QrcodeScanner = new Html5QrcodeScanner("uno", {
    fps: 10,
    qrbox: qrboxFunction,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true,
    },
    rememberLastUsedCamera: true,
    showTorchButtonIfSupported: true,
  });
  html5QrcodeScanner.render(onScanSuccess);
});

/*TASTI*/
const beep = new Audio("./js/beep.mp3");
const beep2 = new Audio("./js/beep2.mp3");
const beep3 = new Audio("./js/beep3.mp3");
const body = document.querySelector("body");
const btnTrue = document.querySelector("#true");
const btnFalse = document.querySelector("#false");
const submit = document.querySelector("#submit");
const input = document.querySelector("#ip_input");
const display1 = document.querySelector("#display");
const container = document.querySelector("#main_container");
const due = document.querySelector("#due");
const form = document.querySelector("#form");
const sigUpButton = document.querySelector("#UserId_button");
const formInput = document.querySelector("#UserId_input");
const signinlogin = document.querySelector("#sign_in_log_in");
const signin = document.querySelector("#signin");
const login = document.querySelector("#login");
const sgin = document.querySelector("#divsignin");
const signInButton = document.querySelector("#signin_big_button");
const Signin_input = document.querySelector("#UserId_inputS");
const password_input = document.querySelector("#ServerPassword_input");
/*BAN_MENU*/
const bbutton = document.querySelector("#ban_menu_button_container");
const dispaly2 = document.querySelector("#display2");
const check = document.querySelector("#check");
const ban = document.querySelector("#ban");
const unban = document.querySelector("#unban");
const ban_password = document.querySelector("#ban_password");
const ban_name = document.querySelector("#ban_name");
const bbutton_container = document.querySelector("#ban_menu_container");
const settings_toggler = document.querySelector("#settings_container > img ");
const settings = document.querySelector("#settings_button_container");
const circle = document.querySelector("#check_circle");
const change = document.querySelector("#change_status_button_container");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const ipInput = document.querySelector("#ip_inputs");

let Ip;
let UserId = "";
let User_test = "";

submit.addEventListener("click", () => {
  if (input.value.length <= 0) {
    alert("Fornisci un Ip (1)");
  } else {
    Ip = input.value;
    if (UserId.length <= 0) {
      signinlogin.classList.remove("form_invisible");
      form.classList.add("form_invisible");
      sgin.classList.add("form_invisible");
    } else {
      request(Ip, UserId, "checkconnection", {}, callbacks.display);
    }
  }
});
signInButton.addEventListener("click", function () {
  if (
    Signin_input.value.length <= 0 ||
    password_input.value.length <= 0 ||
    Ip == undefined
  ) {
    alert("Inserisci Id e Password");
  } else {
    let User_test = Signin_input.value;
    let Signin_password = password_input.value;
    Signin_input.value = "";
    password_input.value = "";
    Signin_input.setAttribute("placeholder", "Connecting...");
    let header = { "Server-passw": Signin_password };
    request(Ip, User_test, "checkconnection", header, callbacks.onSignIn);
  }
});
sigUpButton.addEventListener("click", function () {
  if (formInput.value.length <= 0) {
    alert("Inserisci un User-Id");
  } else {
    let User_test = formInput.value;
    formInput.value = "";
    formInput.setAttribute("placeholder", "Connecting...");
    request(Ip, User_test, "checkconnection", {}, callbacks.onSignUp);
  }
});

/*form signinsgnup ecc*/
const form_escape1 = document.querySelector(".form_escape1");
const form_escape2 = document.querySelector(".form_escape2");
const form_back1 = document.querySelector(".form_back1");
const form_back2 = document.querySelector(".form_back2");
const form_escape3 = document.querySelector(".form_escape3");

form_escape1.addEventListener("click", function () {
  signinlogin.classList.add("form_invisible");
});

form_escape2.addEventListener("click", function () {
  form.classList.add("form_invisible");
  sgin.classList.add("form_invisible");
});
form_back1.addEventListener("click", function () {
  form.classList.add("form_invisible");
  sgin.classList.add("form_invisible");
  signinlogin.classList.remove("form_invisible");
});

form_escape3.addEventListener("click", function () {
  form.classList.add("form_invisible");
  sgin.classList.add("form_invisible");
});

form_back2.addEventListener("click", function () {
  form.classList.add("form_invisible");
  sgin.classList.add("form_invisible");
  signinlogin.classList.remove("form_invisible");
});

input.addEventListener("blur", () => {
  submit.focus();
});

signin.addEventListener("click", function () {
  signinlogin.classList.add("form_invisible");
  form.classList.add("form_invisible");
  sgin.classList.remove("form_invisible");
});

login.addEventListener("click", function () {
  signinlogin.classList.add("form_invisible");
  sgin.classList.add("form_invisible");
  form.classList.remove("form_invisible");
});
/*form signinsgnup ecc*/
/*BAN E UNBAN*/

const menu = document.querySelector("#ban_menu_container");
const menuBk = menu.innerHTML;
let menu2 = document.querySelector("#ban_menu_2_container");
const escape4 = document.querySelector("#form_escape4");
const dataList = document.querySelector("#name_input");

bbutton.addEventListener("click", function () {
  if (UserId == "KALI") {
    menu.innerHTML = "";
    menu.appendChild(menu2);
    menu.classList.toggle("form_invisible");
  } else {
    menu.innerHTML = "!! WORK IN PROGRESS !!";
    menu.appendChild(escape4);
    menu.classList.toggle("form_invisible");
  }
});
window.onload = (event) => {
  menu.innerHTML = "!! WORK IN PRGRESS !!";
  body.removeChild(settings);
  /*TO DO*/
  /* let localIp = request("None", "None", "ipcheck");
  console.log(localIp);
  if (String(localIp).startsWith("172.10.10")) {
    ipInput.innerHTML = "";
    let suggesion2 = [
      "172.20.10.3",
      "172.20.10.5",
      "172.20.10.11",
      "172.20.10.13",
    ];
    for (let i = 0; i < suggesion2.length; i++) {
      let sugg = document.createElement("option");
      sugg.setAttribute("value", suggesion2[i]);
      ipInput.appendChild(sugg);
    }
  } else if (String(localIp).startsWith("192.168.1")) {
    ipInput.innerHTML = "";
    let suggesion2 = ["192.168.1.53", "192.168.1.54", "192.168.1.55"];
    for (let i = 0; i < suggesion2.length; i++) {
      let sugg = document.createElement("option");
      sugg.setAttribute("value", suggesion2[i]);
      ipInput.appendChild(sugg);
    }
  } else if (String(localIp).startsWith("127.0.0.1")) {
    ipInput.innerHTML = "";
    let suggesion2 = ["192.168.1.53", "192.168.1.54", "192.168.1.55"];
    for (let i = 0; i < suggesion2.length; i++) {
      let sugg = document.createElement("option");
      sugg.setAttribute("value", suggesion2[i]);
      ipInput.appendChild(sugg);
    }
  } else {
  } */
};
escape4.addEventListener("click", function () {
  ban_name.value = "";
  ban_password.value = "";
  dispaly2.innerHTML = "";
  menu.classList.toggle("form_invisible");
});

check.addEventListener("click", function () {
  if (ban_password.value.length <= 0) {
    alert("Inserisci admin password");
  } else {
    let pass = ban_password.value;
    let header = { "Server-passw": pass };
    request(Ip, UserId, "checkban", header, callbacks.onBan);
  }
});

ban.addEventListener("click", function () {
  if (ban_password.value.length <= 0 || ban_name.value.length <= 0) {
    alert("Inserisci name e admin password");
  } else {
    let pass = ban_password.value;
    let nm = ban_name.value;
    let header = { "Server-passw": pass, Toban: nm };
    request(Ip, UserId, "ban", header, callbacks.onBan);
    setTimeout(() => {
      request(Ip, UserId, "checkban", header, callbacks.onBan);
    }, 1000);
    ban_name.value = "";
  }
});

unban.addEventListener("click", function () {
  if (ban_password.value.length <= 0 || ban_name.value.length <= 0) {
    alert("Inserisci name e admin password");
  } else {
    let pass = ban_password.value;
    let nm = ban_name.value;
    let header = { "Server-passw": pass, Toban: nm };
    request(Ip, UserId, "unban", header, callbacks.onBan);
    setTimeout(() => {
      request(Ip, UserId, "checkban", header, callbacks.onBan);
    }, 1000);
    ban_name.value = "";
  }
});

/*BAN E UNBAN*/

settings_toggler.addEventListener("click", function () {
  if (UserId == "KALI") {
    settings.classList.toggle("settings_invisible");
    let header = { "Server-passw": "None", Status: "uptade" };
    request(Ip, UserId, "status", header, callbacks.onStatus);
  } else {
    settings.setAttribute("style", "visibility : hidden;");
  }
});

pause.addEventListener("click", function () {
  if (change.contains(pause)) {
    change.removeChild(pause);
  }
  change.appendChild(play);
  if (UserId == "KALI") {
    let header = { "Server-passw": "None", Status: "changestatus" };
    request(Ip, UserId, "status", header, callbacks.onStatus);
  }
});

play.addEventListener("click", function () {
  if (change.contains(play)) {
    change.removeChild(play);
  }
  change.appendChild(pause);
  if (UserId == "KALI") {
    let header = { "Server-passw": "None", Status: "changestatus" };
    request(Ip, UserId, "status", header, callbacks.onStatus);
  }
});

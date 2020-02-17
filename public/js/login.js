const fs = require('fs');
const $ = jQuery = require('jquery');
const db = JSON.parse(fs.readFileSync("./user.json", "utf8"));

function cek() {
  var usr = document.getElementById('username').value
  var pwd = document.getElementById('password').value
  localStorage.setItem("namauser", usr)

  if (!Object.keys(db).includes(usr)) return alert("Tidak terdaftar");
  if (db[usr].password !== pwd) return alert("Password salah");
  if (db[usr].password === pwd) {
    window.location.pathname = 'C:/Users/Anton/Desktop/aa/view/Home.html';
    return alert("Berhasil Login");
  } else return alert("Terjadi kesalahan!");
}

function submit(ev) {
  if (ev.keyCode == 13) {
    document.querySelector('button').click()
  }
}
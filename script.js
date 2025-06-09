const $ = id => document.getElementById(id),  
  d = JSON.parse(localStorage.getItem("gpa")) || [];

const r = () => {
  $("list").innerHTML = d.map((a, i) => `<li>${i + 1}. ${a.name} - ${a.grade}/5 <button onclick="deleteItem(${i})">Delete</button></li>`).join("");
  $("gpa").textContent = d.length ? (d.reduce((s, a) => s + a.grade, 0) / d.length).toFixed(2) : "0.00";
};

const deleteItem = (index) => {
  d.splice(index, 1);
  localStorage.setItem("gpa", JSON.stringify(d));
  r();
};

$("form").onsubmit = e => {
  e.preventDefault();
  let n = $("name").value.trim(), g = +$("grade").value;
  if (!n || g < 0 || g > 5) return alert("Invalid input");
  d.push({ name: n, grade: g });
  localStorage.setItem("gpa", JSON.stringify(d));
  r();
  e.target.reset();
};

$("clear").onclick = () => confirm("Clear all?") && (d.length = 0, localStorage.setItem("gpa", "[]"), r());
onkeydown = e => e.key === "s" && console.log(d);
r();

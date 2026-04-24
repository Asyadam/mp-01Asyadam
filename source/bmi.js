let selectedGender = "";
let dataList = [];
let editIndex = null;

function setGender(gender, btn) {
  selectedGender = gender;

  document
    .querySelectorAll(".gender-btn")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");
}

function hitungBMI() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value / 100;
  const weight = document.getElementById("weight").value;

  if (!name || !selectedGender || !age || !height || !weight) {
    alert("Lengkapi semua data!");
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);

  let kategori = "";
  let bar = document.getElementById("bar");

  if (bmi < 18.5) {
    kategori = "Kurus";
    bar.style.background = "yellow";
  } else if (bmi < 25) {
    kategori = "Normal";
    bar.style.background = "green";
  } else if (bmi < 30) {
    kategori = "Gemuk";
    bar.style.background = "orange";
  } else {
    kategori = "Obesitas";
    bar.style.background = "red";
  }

  bar.style.width = bmi + "%";

  document.getElementById("hasil").innerText = `BMI: ${bmi} (${kategori})`;

  const newData = {
    name,
    gender: selectedGender,
    age,
    height: height * 100,
    weight,
    bmi,
    kategori,
  };

  if (editIndex !== null) {
    dataList[editIndex] = newData;
    editIndex = null;
  } else {
    dataList.push(newData);
  }

  clearForm();
  renderTable();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";

  selectedGender = "";

  document
    .querySelectorAll(".gender-btn")
    .forEach((b) => b.classList.remove("active"));
}

// RENDER TABLE
function renderTable() {
  let html = "";

  dataList.forEach((item, index) => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.gender}</td>
        <td>${item.age}</td>
        <td>${item.height}</td>
        <td>${item.weight}</td>
        <td>${item.bmi}</td>
        <td>${item.kategori}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editData(${index})">Edit</button>
          <button 
  class="btn btn-sm btn-danger" 
  onclick="if(confirm('Are you sure want to delete?')) deleteData(${index})"
>
  Hapus
</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("tableData").innerHTML = html;
}

// DELETE
function deleteData(index) {
  dataList.splice(index, 1);
  renderTable();
}

function editData(index) {
  const data = dataList[index];

  document.getElementById("name").value = data.name;
  document.getElementById("age").value = data.age;
  document.getElementById("height").value = data.height;
  document.getElementById("weight").value = data.weight;

  selectedGender = data.gender;

  // set active button gender
  document.querySelectorAll(".gender-btn").forEach((b) => {
    if (b.innerText.includes(data.gender)) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  editIndex = index;
}

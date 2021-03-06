let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};
async function theData() {
  let students = await getData("https://api.mocki.io/v2/01047e91/students");
  let schools = await getData("https://api.mocki.io/v2/01047e91/schools");
  let list = document.getElementById("listDiv");
  sortDiv = document.getElementById("sortDiv");
  sortDiv.style.display = "none";
  let infoElement = document.createElement("h2");
  infoElement.textContent = "Tryck på student för att se matchande skola/or.";
  list.appendChild(infoElement);
  students.forEach((student) => {
    let profileCard = document.createElement("div");
    profileCard.style.border = "2px solid black";
    profileCard.style.margin = "40px 0 60px 0";

    let studentName = document.createElement("p");
    studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
    profileCard.appendChild(studentName);

    let studentAge = document.createElement("p");
    studentAge.textContent = `Ålder: ${student.age}`;
    profileCard.appendChild(studentAge);

    let studentHobbies = document.createElement("p");
    studentHobbies.textContent = `Hobbys: ${student.hobbies}`;
    profileCard.appendChild(studentHobbies);

    let studentProgramme = document.createElement("p");
    studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;
    profileCard.appendChild(studentProgramme);

    list.appendChild(profileCard);

    let filterSchools = schools.filter((school) => {
      let hobbyMatch = false;
      student.hobbies.forEach((hobby) => {
        if (school.activities.includes(hobby)) {
          hobbyMatch = true;
        }
      });
      return school.programmes.includes(student.programme) && hobbyMatch;
    });

    filterSchools.forEach((schools) => {
      console.log("hej");
      let schoolSpan = document.createElement("span");
      schoolSpan.style.display = "none";
      profileCard.appendChild(schoolSpan);

      profileCard.addEventListener("click", () => {
        if (schoolSpan.style.display === "none") {
          schoolSpan.textContent = `${schools.name}`;
          studentAge.textContent = "";
          studentHobbies.textContent = "";
          studentProgramme.textContent = "";
          schoolSpan.style.display = "block";
          schoolSpan.style.textDecoration = "underline";
          schoolSpan.style.color = "green";
          profileCard.style.outline = "5px solid black";
        } else {
          schoolSpan.style.display = "none";
          profileCard.style.outline = "";
          studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
          studentAge.textContent = `Ålder: ${student.age}`;
          studentHobbies.textContent = `Hobbys: ${student.hobbies}`;
          studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;
        }
      });
    });
  });

  let button = document.querySelector("button");
  let programmeRadio = document.querySelectorAll(
    "input[name='programmeRadio']"
  );
  console.log(programmeRadio);

  button.addEventListener("click", () => {
    listDiv.innerHTML = "";
    let programme;
    programmeRadio.forEach((input) => {
      if (input.checked) {
        programme = input.value;
      }
    });

    let filterProgramme = students.filter(
      (students) => students.programme === programme
    );
    filterProgramme.forEach((student) => {
      console.log("student");

      let profileCard = document.createElement("div");
      profileCard.style.border = "2px solid black";
      profileCard.style.margin = "40px 0 60px 0";
      let studentName = document.createElement("p");
      studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
      profileCard.appendChild(studentName);

      let studentAge = document.createElement("p");
      studentAge.textContent = `Ålder: ${student.age}`;
      profileCard.appendChild(studentAge);

      let studentProgramme = document.createElement("p");
      studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;
      profileCard.appendChild(studentProgramme);

      list.appendChild(profileCard);
    });

    sortDiv.style.display = "block";
    let sortRadio = document.querySelectorAll("input[name='sortRadio']");

    console.log(filterProgramme);
    let sortSelect;
    sortRadio.forEach((input) => {
      if (input.checked) {
        sortSelect = input.value;
      }
    });
    console.log(sortSelect);
    if (sortSelect === "age") {
      list.innerHTML = "";
      console.log("hej");
      let sortByAge = filterProgramme.sort((age1, age2) => age1.age - age2.age);
      sortByAge.forEach((student) => {
        let profileCard = document.createElement("div");
        profileCard.style.border = "2px solid black";
        profileCard.style.margin = "40px 0 60px 0";
        let studentName = document.createElement("p");
        studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
        let studentAge = document.createElement("p");
        studentAge.textContent = `Ålder: ${student.age}`;

        let studentHobbies = document.createElement("p");
        studentHobbies.textContent = `Hobbys: ${student.hobbies}`;

        let studentProgramme = document.createElement("p");
        studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;

        profileCard.appendChild(studentName);

        profileCard.appendChild(studentAge);

        profileCard.appendChild(studentHobbies);

        profileCard.appendChild(studentProgramme);

        list.appendChild(profileCard);
      });

      console.log(sortByAge);
    } else if (sortSelect === "firstName") {
      let sortByFirstName = filterProgramme.sort((firstName1, firstName2) => {
        if (firstName1.firstName < firstName2.firstName) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(sortByFirstName);
      list.innerHTML = "";
      sortByFirstName.forEach((student) => {
        let profileCard = document.createElement("div");
        profileCard.style.border = "2px solid black";
        profileCard.style.margin = "40px 0 60px 0";
        let studentName = document.createElement("p");
        studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
        let studentAge = document.createElement("p");
        studentAge.textContent = `Ålder: ${student.age}`;

        let studentHobbies = document.createElement("p");
        studentHobbies.textContent = `Hobbys: ${student.hobbies}`;

        let studentProgramme = document.createElement("p");
        studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;

        profileCard.appendChild(studentName);

        profileCard.appendChild(studentAge);

        profileCard.appendChild(studentHobbies);

        profileCard.appendChild(studentProgramme);

        list.appendChild(profileCard);
      });
    } else if (sortSelect === "lastName") {
      let sortByLastName = filterProgramme.sort((lastName1, lastName2) => {
        if (lastName1.lastName < lastName2.lastName) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(sortByLastName);
      list.innerHTML = "";
      sortByLastName.forEach((student) => {
        let profileCard = document.createElement("div");
        profileCard.style.border = "2px solid black";
        profileCard.style.margin = "40px 0 60px 0";
        let studentName = document.createElement("p");
        studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
        let studentAge = document.createElement("p");
        studentAge.textContent = `Ålder: ${student.age}`;

        let studentHobbies = document.createElement("p");
        studentHobbies.textContent = `Hobbys: ${student.hobbies}`;

        let studentProgramme = document.createElement("p");
        studentProgramme.textContent = `Program eleven vill gå: ${student.programme}`;

        profileCard.appendChild(studentName);

        profileCard.appendChild(studentAge);

        profileCard.appendChild(studentHobbies);

        profileCard.appendChild(studentProgramme);

        list.appendChild(profileCard);
      });
    }
  });
}
theData();

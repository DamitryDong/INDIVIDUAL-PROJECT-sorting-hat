
/////////////////////////////////////////////////////////////////////
// ARRAY OF STUDENTS 
/////////////////////////////////////////////////////////////////////

const Students = [
    {
        id: 1,
        name: "Harry Potter",
        house: "Gryffindor",
    },
    {
        id: 2,
        name: "Hannah Abbott",
        house: "Hufflepuff",
    },
    {
        id: 3,
        name: "Draco Malfoy",
        house: "Slytherin",
    },
    {
        id: 4,
        name: "Luna Lovegood",
        house: "Ravenclaw",
     }
]



/////////////////////////////////////////////////////////////////////
// load array to dom function
/////////////////////////////////////////////////////////////////////

//location for first years
const Targethtml = document.querySelector("#cards")

//locations for expell students (used later)
const TargethtmlExpell = document.querySelector("#expellCards")

const cardsOnDom = (array, domLocation) => {   
    let domString = "";
    

    // if targeted into expell we dont want expell button
    if (domLocation === TargethtmlExpell) {

        for (const student of array) {
     
            domString += 
    
            `<div class="card" style="width: 15rem;" id="cards">
    
                <div class="card-body">
                    <h5 class="name-title">${student.name}</h5>
                    <p class="house-text">${student.house}</p>
                </div>
    
            </div>`;
            
            domLocation.innerHTML = domString;
    }}
    else
    // filling in empty string like normal if not expell 
        for (const student of array) {
        
            domString += 

            `<div class="card" style="width: 15rem;" id="cards">

                <div class="card-body">
                    <h5 class="name-title">${student.name}</h5>
                    <p class="house-text">${student.house}</p>
                    <button class="btn btn-danger" id="expell--${student.id}">Expell</button>
                </div>

            </div>`;
            
            domLocation.innerHTML = domString;
        };

}

//INVOKING
cardsOnDom(Students,Targethtml)

/////////////////////////////////////////////////////////////////////
// Button filtering
/////////////////////////////////////////////////////////////////////

//  filter function (using map instead of for loop)

const houseFilter = (array, houseType) => {
    return array.map(student => student.house === houseType ? student : null).filter(student => student !== null);
};

//  connecting button

const allButton = document.querySelector("#all-button")
const gryffindorButton = document.querySelector("#Gryffindor-button")
const hufflepuffButton = document.querySelector("#Hufflepuff-button")
const slytherinButton = document.querySelector("#Slytherin-button")
const ravenclawButton = document.querySelector("#Ravenclaw-button")

// adding eventlistener and also 

allButton.addEventListener("click", () => {
    cardsOnDom(Students,Targethtml)
})

gryffindorButton.addEventListener("click", () => {
    const gryArray = houseFilter(Students,"Gryffindor")
    cardsOnDom(gryArray,Targethtml)
})

hufflepuffButton.addEventListener("click", () => {
    const hufArray = houseFilter(Students,"Hufflepuff")
    cardsOnDom(hufArray,Targethtml)
})

slytherinButton.addEventListener("click", () => {
    const slyArray = houseFilter(Students,"Slytherin")
    cardsOnDom(slyArray,Targethtml)
})

ravenclawButton.addEventListener("click", () => {
    const ravArray = houseFilter(Students,"Ravenclaw")
    cardsOnDom(ravArray,Targethtml)
})

/////////////////////////////////////////////////////////////////////
// Sorting new student
/////////////////////////////////////////////////////////////////////

//  location 

const form = document.querySelector("form");

// function to randomize houses using floor and random function

const randomhouse = () => {

    let house = ""
    randomNum = Math.floor(Math.random() * 4) + 1;  //this returns a whole number 1 2 3 or 4

    if (randomNum === 1) {
        house = "Gryffindor"
    }
    else if (randomNum === 2) {
        house = "Hufflepuff"
    }
    else if (randomNum === 3) {
        house = "Slytherin"
    }
    else if (randomNum === 4) {
        house = "Ravenclaw"
    };
    return house;
}


//  function to insert new person into a house which calls thr randomhouse functions


const sortNewStudent = (e) => {

    e.preventDefault();

    const newStudent = {
        id: Students.length + 1,
        name: document.querySelector("#newStudentName").value,
        house: randomhouse()
    }

    Students.push(newStudent)
    cardsOnDom(Students,Targethtml)
    form.reset();
}

// add eventlistener for "sort" button to run functions

form.addEventListener("submit", sortNewStudent)

/////////////////////////////////////////////////////////////////////
// Expelling students
/////////////////////////////////////////////////////////////////////

//location 
const Cards = document.querySelector("#cards")

//new array for expelled students
let expelledStudents =[];

//event listener running even through logic 
Cards.addEventListener("click", (e) => {

    if (e.target.id.includes("expell")) {

        const [, justId] = e.target.id.split("--")

        const index = Students.findIndex((student) => student.id === Number(justId));

        const expStudent = Students.splice(index, 1)[0];  //[0] the first element of splice will give you the removed student
        expelledStudents.push(expStudent)  //we add the student variable to our new array
        
    }

    //now we load dom for our non expell student and our expell students

    cardsOnDom(expelledStudents,TargethtmlExpell)
    cardsOnDom(Students,Targethtml);
})
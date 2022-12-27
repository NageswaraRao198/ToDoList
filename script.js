let addButton = document.querySelector('#add-btn');
let listsContainer = document.querySelector('.lists-container');
let listTitles = [];
let listTimes = [];
let listDescriptions = [];
let boolCompleted=[];
showLists();
completedBtnClicked();
deletedBtnClicked();

addButton.addEventListener('click', function (e) {
    let title = document.querySelector('#title');
    let description = document.querySelector('#description');
    let time = document.querySelector('#time');
    addList(title.value, description.value, time.value);
    title.value = '';
    description.value = '';
    time.value = '';
    showLists();
    completedBtnClicked();
    deletedBtnClicked();
});
function addList(titleValue, descriptionValue, timeValue) {
    if (titleValue == '' && descriptionValue == '' && timeValue == '') {
        alert("No values entered.")
    }
    else if (titleValue == '' || descriptionValue == '' || timeValue == '') {
        alert("One of the values is empty!");
    }
    else {
        let listTitless = localStorage.getItem("listTitless");
        let listDescriptionss = localStorage.getItem("listDescriptionss");
        let listTimess = localStorage.getItem("listTimess");
        let boolCompletedd=localStorage.getItem("boolCompletedd");

        if (listTitless == null) {
            listTitles = [];
            listDescriptions = [];
            listTimes = [];
            boolCompleted=[];
        }
        else {
            listTitles = JSON.parse(listTitless);
            listDescriptions = JSON.parse(listDescriptionss);
            listTimes = JSON.parse(listTimess);
            boolCompleted=JSON.parse(boolCompletedd);
        }

        if (listTitles.includes(titleValue) === true) {
            alert("The entered title already exists..");
        }
        else {
            listTitles.push(titleValue);
            listDescriptions.push(descriptionValue);
            listTimes.push(timeValue);
            boolCompleted.push('0');
        }

        localStorage.setItem("listTitless", JSON.stringify(listTitles));
        localStorage.setItem("listDescriptionss", JSON.stringify(listDescriptions));
        localStorage.setItem("listTimess", JSON.stringify(listTimes));
        localStorage.setItem("boolCompletedd",JSON.stringify(boolCompleted));



    }
}

function showLists(e) {


    let listTitless = localStorage.getItem("listTitless");
    let listDescriptionss = localStorage.getItem("listDescriptionss");
    let listTimess = localStorage.getItem("listTimess");
    let boolCompletedd=localStorage.getItem("boolCompletedd");


    let listTitlesss,listDescriptionsss,listTimesss,boolCompleteddd;

    if (listTitless == null) {
        listTitlesss = [];
        listDescriptionsss = [];
        listTimesss = [];
        boolCompleteddd=[];
    }
    else {
        listTitlesss = JSON.parse(listTitless);
        listDescriptionsss = JSON.parse(listDescriptionss);
        listTimesss = JSON.parse(listTimess);
        boolCompleteddd=JSON.parse(boolCompletedd);
    }

    let x = listTitlesss.length;
    if (x == 0) {
        str="";
        str=`
            <div class="No-Lists">
                <h5>No lists to show here</h5>
            </div>
            `
            listsContainer.innerHTML = str;
    }
    else {
        str="";
        for (let i = 0; i < x; i++) {
            if (boolCompleteddd[i]==0) {
                str += `
                    <div class="lists row container-fluid">
                    <div class="table-element col-1 s-no">
                    ${i + 1}
                    </div>
                        <div class="table-element col-3">
                            ${listTitlesss[i]}
                        </div>
                        <div class="table-element col-3">
                            ${listDescriptionsss[i]}
                        </div>
                        <div class="table-element col-3">
                            ${listTimesss[i]}
                        </div>
                        <div class="table-element col-2 buttons">
                            <button class="completedBtn">
                                <i class="fa-regular fa-square-check"></i>
                            </button>
                            <button class="deleteBtn">
                                <i class="fa-sharp fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    `
            }
            else{
                str += `
                    <div class="lists row container-fluid">
                    <div class="table-element col-1 s-no">
                    ${i + 1}
                    </div>
                        <div class="table-element col-3">
                            ${listTitlesss[i]}
                        </div>
                        <div class="table-element col-3">
                            ${listDescriptionsss[i]}
                        </div>
                        <div class="table-element col-3">
                            ${listTimesss[i]}
                        </div>
                        <div class="table-element col-2 buttons">
                            <button class="completed-div">
                                <i class="fa-regular fa-square-check"></i>
                            </button>
                            <button class="deleteBtn">
                                <i class="fa-sharp fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    `
            }
        }
        listsContainer.innerHTML = str;
    }

}




function completedBtnClicked(e) {
    let completedBtn = document.querySelectorAll('.completedBtn');
    completedBtn.forEach(function (element) {
        element.addEventListener('click', function () {
            element.classList.add("completed-div");
            // element.classList.remove("completedBtn");


            let listContainerCompleted = element.parentElement.parentElement;
            var indexNumber = listContainerCompleted.children[0].innerText;


            let boolCompletedd=localStorage.getItem("boolCompletedd");

            let boolCompleteddd=JSON.parse(boolCompletedd);

            boolCompleteddd[indexNumber-1]=1;

            localStorage.setItem("boolCompletedd",JSON.stringify(boolCompleteddd));
            
            
            
        })
    })

}



function deletedBtnClicked(e) {
    let deletedBtn = document.querySelectorAll('.deleteBtn');

    deletedBtn.forEach(function (element) {
        element.addEventListener('click', function () {
            let listContainerToBeDeleted = element.parentElement.parentElement;
            let TitleValueToBeDeleted = listContainerToBeDeleted.children[1].innerText;


            let listTitless = localStorage.getItem("listTitless");
            let listDescriptionss = localStorage.getItem("listDescriptionss");
            let listTimess = localStorage.getItem("listTimess");
            let boolCompletedd=localStorage.getItem("boolCompletedd");




            let listTitlesss = JSON.parse(listTitless);
            let listDescriptionsss = JSON.parse(listDescriptionss);
            let listTimesss = JSON.parse(listTimess);
            let boolCompleteddd=JSON.parse(boolCompletedd);

            let index = listTitlesss.indexOf(TitleValueToBeDeleted);
            listTitlesss.splice(index, 1);
            listDescriptionsss.splice(index, 1);
            listTimesss.splice(index, 1);
            boolCompleteddd.splice(index,1);


            localStorage.setItem("listTitless", JSON.stringify(listTitlesss));
            localStorage.setItem("listDescriptionss", JSON.stringify(listDescriptionsss));
            localStorage.setItem("listTimess", JSON.stringify(listTimesss));
            localStorage.setItem("boolCompletedd",JSON.stringify(boolCompleteddd));


            listContainerToBeDeleted.remove();
            changeSerialNumbers();
        })
    })

}

function changeSerialNumbers() {
    let sNoDiv = document.querySelectorAll(".s-no");
    let y = 1;
    sNoDiv.forEach(function (e) {
        e.innerText = y;
        y++;
    })
}






































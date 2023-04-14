window.onload = (event) => {
     showTableData('', true);
};

function showTableData(sortCol, defaultSort) {
    fetch('./sample.json')
    .then((response) => response.json())
    .then(function(stdMarks){
        var sortTypeLbl = document.getElementById('sortType');
        var sortColLbl = document.getElementById('sortCol');
        
        let sortType = parseInt(sortTypeLbl.value);
        if(defaultSort==false)
        {
            let oldSortCol = sortColLbl.value;
            if (oldSortCol != sortCol) {
                sortType = 1;
                sortTypeLbl.value =  sortType;
            }
        }

        stdMarks = sortData(stdMarks, sortCol);
        let col = [];
        for (let i = 0; i < stdMarks.length; i++) {
            for (let key in stdMarks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        const table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-dark");
        table.classList.add("table-striped");
        let tr = table.insertRow(-1);

        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < stdMarks.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = stdMarks[i][col[j]];
            }
        }

        const divShowData = document.getElementById('divTbl');
        divShowData.innerHTML = "";
        divShowData.appendChild(table);
        AddOnClickEvent();
        if(defaultSort==false)
        {
            sortType += 1;

            if (sortType > 3)
                sortType = 1;

            sortTypeLbl.value = sortType;
            sortColLbl.value =  sortCol;
        }
    });
}

function sortData(stdMarks, sortCol) {
    //Get sort type
    let sortType = parseInt(document.getElementById('sortType').value);
    if (sortCol != '' && sortCol != undefined) {
        if (sortType == 1) {
            stdMarks = stdMarks.sort((a, b) => {
                if (a[sortCol] < b[sortCol]) {
                    return -1;
                }
            });
        } else if (sortType == 2) {
            stdMarks = stdMarks.sort((a, b) => {
                if (a[sortCol] > b[sortCol]) {
                    return -1;
                }
            });
        }
    }
    return stdMarks;
}
function AddOnClickEvent() {
    let elements = document.querySelectorAll('th');

    for(let i=0; i<elements.length; i++)
    {
        elements[i].onclick = async function () {
            let newSortCol = elements[i].innerHTML;
            showTableData(newSortCol, false);
        };
    }

}

const main = document.getElementById("main");
const cell = document.getElementsByClassName("cell");
const menu = document.getElementById("menus");

createAGrid(16);

function createARow(cols) {
    const row = document.createElement("div");
    row.classList = "row";
    for (let i = 0; i < cols; i++) {
        const cell = document.createElement("div");
        cell.classList = "cell";
        row.appendChild(cell);
    }

    return row;
}

function createAGrid(rows) {
    const grid = document.createElement("div");
    grid.id = "grid";
    for (let i = 0; i < rows; i++) {
        const row = createARow(rows);
        grid.append(row);
    }

    main.appendChild(grid);
}

function colorFunction(color) {
    const grid = document.getElementById("grid");
    grid.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        e.target.style.backgroundColor = color;
    });
}

function changeGrid(grid) {
    main.removeChild(main.lastChild);
    createAGrid(grid);
}

menu.addEventListener("click", (e) => {
    console.log(e.target.id);
    let classes = "";
    if (e.target.id === "red") {
        classes = "red";
    } else if (e.target.id === "black") {
        classes = "black";
    } else if (e.target.id === "eraser") {
        classes = "white";
    } else if (e.target.id === "change") {
        const result = prompt("Enter the number of grids(min 2, max 100): ");
        changeGrid(parseInt(result));
    }
    console.log(classes);
    colorFunction(classes);
});

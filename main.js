const main = document.getElementById("main");
const cell = document.getElementsByClassName("cell");
const menu = document.getElementById("menus");
const options = document.getElementsByClassName("menu");

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

function clearGrid() {
    const grid = document.getElementById("grid");
    for (let row = grid.firstChild; row !== null; row = row.nextSibling) {
        for (
            let cell = row.firstChild;
            cell !== null;
            cell = cell.nextSibling
        ) {
            cell.style.backgroundColor = "white";
        }
    }
}

function generateRandom() {
    const red = Math.floor(Math.random() * 250);
    const green = Math.floor(Math.random() * 250);
    const blue = Math.floor(Math.random() * 250);

    return [red, green, blue];
}

function colorFunction(color) {
    const grid = document.getElementById("grid");
    let isMouseDonwn = false;
    grid.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        if (e.target.className === "cell") {
            isMouseDonwn = true;
            if (color === "r") {
                const colors = generateRandom();
                e.target.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
            } else {
                e.target.style.backgroundColor = color;
            }
        }
    });

    grid.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        if (isMouseDonwn) {
            if (e.target.className === "cell") {
                isMouseDonwn = true;
                if (color === "r") {
                    const colors = generateRandom();
                    e.target.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
                } else {
                    e.target.style.backgroundColor = color;
                }
            }
        }
    });

    grid.addEventListener("mouseup", (e) => {
        e.stopPropagation();
        isMouseDonwn = false;
    });
}

function changeGrid(grid) {
    main.removeChild(main.lastChild);
    createAGrid(grid);
}

menu.addEventListener("click", (e) => {
    let classes = "";
    if (e.target.classList.contains("menu")) {
        if (e.target.id === "red") {
            classes = "red";
        } else if (e.target.id === "black") {
            classes = "black";
        } else if (e.target.id === "eraser") {
            classes = "white";
        } else if (e.target.id === "randomize") {
            classes = "r";
        } else if (e.target.id === "clear") {
            clearGrid();
        } else if (e.target.id === "change") {
            const result = parseInt(
                prompt("Enter the number of grids(min 2, max 100): ")
            );

            if (result < 2) {
                changeGrid(2);
            } else if (result > 100) {
                changeGrid(100);
            } else {
                changeGrid(result);
            }
        }
        Array.from(options, (menu) => {
            if (menu.classList.contains("active")) {
                menu.classList.remove("active");
            }
        });

        e.target.classList.add("active");

        colorFunction(classes);
    }
});

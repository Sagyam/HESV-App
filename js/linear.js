const linearDetectUrl =
	"https://hesv-backend.herokuapp.com/equations/get-linear-equation";

const twoDegreeSolveUrl =
	"https://hesv-backend.herokuapp.com/equations/solve-2d-linear-equation";

const threeDegreeSolveUrl =
	"https://hesv-backend.herokuapp.com/equations/solve-3d-linear-equation";

let linearEqn = "";
let elt = document.getElementById("calculator");
let calculator = Desmos.GraphingCalculator(
	elt,
	(options = {
		settingsMenu: false,
		keypad: false,
		expressionsTopbar: false,
		expressions: false,
	})
);

let drawer = null;
let activeBox = null;

let inputBox1 = document.getElementById("1");
let inputBox2 = document.getElementById("2");
let inputBox3 = document.getElementById("3");

// Listen for focus events

inputBox1.addEventListener("focus", function () {
	activeBox = inputBox1;
});

inputBox2.addEventListener("focus", function () {
	activeBox = inputBox2;
});

inputBox3.addEventListener("focus", function () {
	activeBox = inputBox3;
});

//Listen for keypress events

inputBox1.addEventListener("keyup", function (event) {
	calculator.setExpression({ id: "graph1", latex: inputBox1.value });
});

inputBox2.addEventListener("keyup", function (event) {
	calculator.setExpression({ id: "graph2", latex: inputBox2.value });
});

inputBox3.addEventListener("keyup", function (event) {
	calculator.setExpression({ id: "graph3", latex: inputBox3.value });
});

function dataURItoBlob(dataURI) {
	var binary = atob(dataURI.split(",")[1]);
	var array = [];
	for (var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], { type: "image/png" });
}

function sendImage() {
	polyEqn = "";
	let imageBase64 = drawer.api.getCanvasAsImage();
	if (imageBase64) {
		let blob = dataURItoBlob(imageBase64);
		let formData = new FormData();
		formData.append("image", blob);

		var requestOptions = {
			method: "POST",
			body: formData,
			redirect: "follow",
		};

		fetch(linearDetectUrl, requestOptions)
			.then((response) => response.json())
			.then((result) => linDetectSuccess(result))
			.catch((error) => console.log("error", error));
	} else {
		alert("Draw Something!!");
	}
}

function solve() {
	if (true) {
		var requestOptions = {
			method: "POST",
			body: formData,
			redirect: "follow",
		};
		fetch(polySolveUrl, requestOptions)
			.then((response) => response.json())
			.then((result) => linSolveSuccess(result))
			.catch((error) => console.log("error", error));
	} else {
		alert("Enter Equation");
	}
}

function linSolveSuccess(result) {
	let solutions = result.solutions;
	let sol_type = result.solution_type;
	let logs = result.debug_logs;
}

function linDetectSuccess(result) {
	let equation = result.equation;
	let logs = result.debug_logs;
	console.log(equation, logs);

	if (!activeBox) {
		activeBox = inputBox1;
	}
	calculator.setExpression({ id: activeBox.id, latex: equation });
	activeBox.value = equation;
	nextBox();
}

function nextBox() {
	if (activeBox == inputBox1) {
		activeBox = inputBox2;
	} else if (activeBox == inputBox2) {
		activeBox = inputBox3;
	} else {
		activeBox = inputBox1;
	}
}

function clearCanvas() {
	drawer = null;
	$("#canvas-editor").empty();
	setupCanvas();
}

function setupCanvas() {
	drawer = new DrawerJs.Drawer(
		null,
		{
			texts: customLocalization,
			plugins: ["Pencil", "Eraser"],

			defaultActivePlugin: { name: "Pencil", mode: "lastUsed" },
			pluginsConfig: {
				Eraser: {
					brushSize: 25,
				},
				Pencil: {
					brushSize: 5,
				},
			},
			activeColor: "#000000",
			transparentBackground: false,
			toolbars: {
				drawingTools: {
					positionType: "inside",
				},

				settings: {
					positionType: "inside",
				},
			},
		},

		window.innerWidth * 0.9375,
		window.innerHeight * 0.4
	);
	$("#canvas-editor").append(drawer.getHtml());
	drawer.onInsert();
}

window.onload = function () {
	setupCanvas();
};

window.onresize = function () {
	var width = window.innerWidth * 0.9375;
	var height = window.innerHeight * 0.37037;
	drawer.api.setSize(width, height);
};

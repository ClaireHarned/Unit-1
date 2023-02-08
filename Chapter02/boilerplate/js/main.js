function myFunc() {
    var myDiv = document.getElementById("myDiv");
}
function initialize() {
    cities();
    loadData();
    debugAjax();
};

function cities() {

    var cityPop = [
        {
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    var table = document.createElement("table");


    var headerRow = document.createElement("tr");
    table.appendChild(headerRow);

    headerRow.insertAdjacentHTML("beforeend", "<th>City</th><th>Population</th>")

    cityPop.forEach(function (cityObject) {

        var rowHtml = "<tr><td>" + cityObject.city + "</td><td>" + cityObject.population + "</td></tr>";

        table.insertAdjacentHTML('beforeend', rowHtml);
    })

    document.querySelector("#myDiv").appendChild(table);

    addColumns(cityPop);
    addEvents();

};


function addColumns(cityPop) {


    var rows = document.querySelectorAll("tr")

    document.querySelectorAll("tr").forEach(function (row, i) {

        if (i == 0) {

            newHeader = document.createElement('th');
            newHeader.innerHTML = 'City Size';

            row.appendChild(newHeader)
        } else {
            var citySize;

            if (cityPop[i - 1].population < 100000) {
                citySize = 'Small';
            } else if (cityPop[i - 1].population < 500000) {
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            };


            var newRow = document.createElement('td')
            newRow.innerHTML = citySize

            row.appendChild(newRow)
        };
    })
};


function addEvents() {
    table = document.querySelector("table");

    document.querySelector("table").addEventListener("mouseover", function () {
        var color = "rgb(";

        for (var i = 0; i < 3; i++) {

            var random = Math.round(Math.random() * 255);
            color += random;

            if (i < 2) {
                color += ",";
            } else {
                color += ")";
            };
        }

        table.style.color = color;
    });
    function clickme() {
        alert('Hey, you clicked me!');
    };
    table.addEventListener("click", clickme)
};
document.addEventListener('DOMContentLoaded', initialize)







function loadData() {
    var cities;

    fetch("data/MegaCities.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            cities = response;
            console.log(cities);
        })
}

function debugCallback(myData) {
    document.querySelector("#myDiv").insertAdjacentHTML('beforeend', "GeoJSON data:" + JSON.stringify(myData));
};

function debugAjax() {
    fetch("data/MegaCities.geojson")
        .then(function (response) {
            return response.json();
        })
        .then(debugCallback)
};
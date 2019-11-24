var rows =[];
var counterId = 0;

var parsePoderSwitch = (value) => {
    if(value){
        return "Si";
    }
    return "No";
}
function addRow(nombre,clasificacion,apariencia,ubicacion, poder,tbody){
    console.log("entra");
    var newRow = document.createElement("tr");
    rows.push({                     
        "nombre": nombre,
        "clasificacion": clasificacion,
        "apariencia" : apariencia,
        "ubicacion": ubicacion,
        "poder": poder
    })
    console.log(rows);
    newRow.innerHTML = 
            `<td><b>${nombre}</b></td>
            <td>${clasificacion}</td>
            <td>${apariencia}</td>
            <td>${ubicacion}</td> 
            <td>${poder}</td>`;

    newRow.className="back";
    var cellContainer = document.createElement("td");
    var deleteButton = document.createElement("button");
    var modificarB = document.createElement("button")
    var cellContainer2 = document.createElement("td");

    

    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");
    deleteButton.innerText ="Del";

    modificarB.classList.add("btn");
    modificarB.classList.add("btn-danger");
    modificarB.innerText ="Edit";


    deleteButton.addEventListener("click",function(event){
        
        var idElement = event.srcElement.value;
        var trToDelete = document.querySelector(`button[value='${idElement}']`).parentElement.parentElement;
        var validnombre = document.querySelector(`#input${idElement}`).value;

        rows.forEach((item,index) => {
            if(item.id == idElement){
                if(item.nombre == validnombre)
                {
                    tbody.removeChild(trToDelete)
                    rows.splice(index, 1);
                }else{
                    alert("nombre no coincide")
                }
            }
            
        })
        
    })

    cellContainer.appendChild(deleteButton);
    newRow.appendChild(cellContainer);
    cellContainer2.appendChild(modificarB);
    newRow.appendChild(cellContainer2);
    tbody.appendChild(newRow);
    counterId++;

}
window.onload = function() 
{
    var submit_btn = document.querySelector("#submit_btn");
    var nombre_field = document.querySelector("#name");
    var clasificacion_field = document.querySelector("#clasificacion");
    var apariencia_field = document.querySelector("#apariencia");
    var ubicacion_field = document.querySelector("#ubicacion")
    var poder_field = document.querySelector("#late_switch");
    var tBody = document.querySelector("#table_body");

    var nombreRegex = new RegExp('[A-Za-z]*');

    submit_btn.addEventListener("click",()=>{
        var nombre = nombre_field.value;
        var clasificacion = clasificacion_field.value;
        var apariencia = apariencia_field.value;
        var ubicacion = ubicacion_field.value;
        var poder = parsePoderSwitch(poder_field.checked);
        if(nombreRegex.test(nombre)){
            addRow(nombre,clasificacion,apariencia,ubicacion, poder,tBody);
        }else{
            alert("Formato no valido");
        }
    });
};
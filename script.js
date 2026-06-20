let choiceCount = 0;
let conditionCount = 0;

function addChoice(){

    choiceCount++;

    const div = document.createElement("div");

    div.className = "choice";

    div.innerHTML = `
        <h3>Choice ${choiceCount}</h3>

        <input class="choiceText"
        placeholder="Choice Text">
        <br>

        <input class="choiceAI"
        placeholder="AI Will Do">
        <br>

        <input class="choiceMoney"
        placeholder="Money">
        <br>

        <input class="choiceStability"
        placeholder="Stability">
        <br>
    `;

    document
        .getElementById("choices")
        .appendChild(div);
}

function removeChoice(){

    const container =
        document.getElementById("choices");

    if(container.lastElementChild){

        container.removeChild(
            container.lastElementChild
        );

        choiceCount--;
    }
}

function addCondition(){

    conditionCount++;

    const div = document.createElement("div");

    div.className = "condition";

    div.innerHTML = `
        <h3>Condition ${conditionCount}</h3>

        <select class="conditionVariable">
            <option>Stability</option>
            <option>Money</option>
            <option>Population</option>
            <option>Research</option>
            <option>HasIdeology</option>
            <option>AtWar</option>
            <option>Manpower</option>
            <option>Oil</option>
            <option>Food</option>
        </select>

        <select class="conditionOperator">
            <option>></option>
            <option><</option>
            <option>==</option>
            <option>>=</option>
            <option><=</option>
            <option>!=</option>
        </select>

        <input class="conditionValue"
        placeholder="Value">
    `;

    document
        .getElementById("conditions")
        .appendChild(div);
}

function generate(){

    let lua = `{
    Name = "${document.getElementById("name").value}",
    Description = "${document.getElementById("description").value}",

    Conditions = {
`;

    const conditions =
        document.querySelectorAll(".condition");

    conditions.forEach((condition,index)=>{

        const variable =
            condition.querySelector(".conditionVariable").value;

        const operator =
            condition.querySelector(".conditionOperator").value;

        const value =
            condition.querySelector(".conditionValue").value;

        lua += `
        {
            Variable = "${variable}",
            Operator = "${operator}",
            Value = "${value}"
        }`;

        if(index < conditions.length - 1){
            lua += ",";
        }
    });

    lua += `
    },

    Choices = {
`;

    const choices =
        document.querySelectorAll(".choice");

    choices.forEach((choice,index)=>{

        const text =
            choice.querySelector(".choiceText").value;

        const ai =
            choice.querySelector(".choiceAI").value || 0;

        const money =
            choice.querySelector(".choiceMoney").value || 0;

        const stability =
            choice.querySelector(".choiceStability").value || 0;

        lua += `
        {
            Text = "${text}",
            AIWillDo = ${ai},

            Effects = {
                Money = ${money},
                Stability = ${stability}
            }
        }`;

        if(index < choices.length - 1){
            lua += ",";
        }
    });

    lua += `
    }
}`;

    document
        .getElementById("output")
        .textContent = lua;
}

addChoice();
addChoice();

addCondition();
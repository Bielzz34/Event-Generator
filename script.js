let choiceCount = 0;
let conditionCount = 0;

function addChoice(){

    choiceCount++;

    const div = document.createElement("div");

    div.className = "choice";

    div.innerHTML = `
        <h3>Choice ${choiceCount}</h3>

        <input class="choiceText" placeholder="Choice Text">

        <input class="choiceAI" placeholder="AI Will Do">

        <input class="choiceMoney" placeholder="Money">

        <input class="choiceStability" placeholder="Stability">
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

        <input
            class="conditionVariable"
            placeholder="Variable (Stability, HasIdeology...)"
        >

        <select class="conditionOperator">
            <option>></option>
            <option><</option>
            <option>==</option>
            <option>>=</option>
            <option><=</option>
            <option>!=</option>
        </select>

        <input
            class="conditionValue"
            placeholder="Value"
        >
    `;

    document
        .getElementById("conditions")
        .appendChild(div);
}

function removeCondition(){

    const container =
        document.getElementById("conditions");

    if(container.lastElementChild){

        container.removeChild(
            container.lastElementChild
        );

        conditionCount--;
    }
}

function generate(){

    let lua = `{
    Name = "${document.getElementById("name").value}",
    Description = [[${document.getElementById("description").value}]],

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

async function copyLua(e){

    const text =
        document.getElementById("output").textContent;

    await navigator.clipboard.writeText(text);

    const button = e.target;

    const oldText =
        button.innerText;

    button.innerText =
        "✅ Copied";

    setTimeout(()=>{
        button.innerText =
            oldText;
    },1500);
}

function exportLua(){

    const content =
        document.getElementById("output").textContent;

    const blob =
        new Blob([content],{
            type:"text/plain"
        });

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    const eventName =
        document.getElementById("name").value || "Event";

    link.download =
        eventName + ".lua";

    link.click();
}

function clearAll(){

    document.getElementById("name").value = "";
    document.getElementById("description").value = "";

    document.getElementById("choices").innerHTML = "";
    document.getElementById("conditions").innerHTML = "";

    document.getElementById("output").textContent = "";

    choiceCount = 0;
    conditionCount = 0;

    addChoice();
    addChoice();
    addCondition();
}

addChoice();
addChoice();
addCondition();
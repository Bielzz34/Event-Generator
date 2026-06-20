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

        <input class="choiceAI"
        placeholder="AI Will Do">

        <div class="effects"></div>

        <button type="button"
        onclick="addEffect(this)">
        ➕ Add Effect
        </button>
    `;

    document
        .getElementById("choices")
        .appendChild(div);
}

function addEffect(button){

    const effectsContainer =
        button.parentElement.querySelector(".effects");

    const effect =
        document.createElement("div");

    effect.className = "effect";

    effect.innerHTML = `
        <input
        class="effectName"
        placeholder="Effect Name">

        <select class="effectType">
            <option>Flat</option>
            <option>Percent</option>
            <option>Set</option>
        </select>

        <input
        class="effectValue"
        placeholder="Value">

        <button
        type="button"
        onclick="removeEffect(this)">
        🗑 Delete Effect
        </button>
    `;

    effectsContainer.appendChild(effect);
}

function removeEffect(button){

    button.parentElement.remove();
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

    const div =
        document.createElement("div");

    div.className = "condition";

    div.innerHTML = `
        <h3>Condition ${conditionCount}</h3>

        <input
        class="conditionVariable"
        placeholder="Variable">

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
        placeholder="Value">
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

        lua += `
        {
            Variable = "${condition.querySelector(".conditionVariable").value}",
            Operator = "${condition.querySelector(".conditionOperator").value}",
            Value = "${condition.querySelector(".conditionValue").value}"
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

        let effectsLua = "";

        const effects =
            choice.querySelectorAll(".effect");

        effects.forEach((effect,eIndex)=>{

            effectsLua += `
                {
                    Effect = "${effect.querySelector(".effectName").value}",
                    Type = "${effect.querySelector(".effectType").value}",
                    Value = ${effect.querySelector(".effectValue").value}
                }`;

            if(eIndex < effects.length - 1){
                effectsLua += ",";
            }
        });

        lua += `
        {
            Text = "${choice.querySelector(".choiceText").value}",
            AIWillDo = ${choice.querySelector(".choiceAI").value || 0},

            Effects = {
${effectsLua}
            }
        }`;

        if(index < choices.length - 1){
            lua += ",";
        }
    });

    lua += `
    }
}`;

    document.getElementById("output").textContent = lua;
}

async function copyLua(e){

    await navigator.clipboard.writeText(
        document.getElementById("output").textContent
    );

    e.target.innerText = "✅ Copied";

    setTimeout(()=>{
        e.target.innerText = "📋 Copy Lua";
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

    link.download =
        (document.getElementById("name").value || "Event")
        + ".lua";

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
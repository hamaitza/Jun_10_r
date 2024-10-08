const toolbox = `
<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
  <category name="Variables" colour="330" custom="VARIABLE"></category>
  <category name="Actions" colour="210">
    <block type="controls_if"></block>
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <block type="math_number">
          <field name="NUM">10</field>
        </block>
      </value>
    </block>
    <block type="controls_whileUntil">
      <field name="MODE">WHILE</field>
    </block>
    <block type="controls_for">
      <field name="VAR">i</field>
      <value name="FROM">
        <block type="math_number">
          <field name="NUM">1</field>
        </block>
      </value>
      <value name="TO">
        <block type="math_number">
          <field name="NUM">10</field>
        </block>
      </value>
      <value name="BY">
        <block type="math_number">
          <field name="NUM">1</field>
        </block>
      </value>
    </block>
    <block type="controls_forEach">
      <field name="VAR">element</field>
    </block>
    <block type="controls_flow_statements">
      <field name="FLOW">BREAK</field>
    </block>
  </category>
  <category name="Logic" colour="160">
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
  </category>
  <category name="Math" colour="230">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
    <block type="math_arithmetic">
      <field name="OP">ADD</field>
    </block>
    <block type="math_round">
      <field name="OP">ROUND</field>
    </block>
    <block type="math_single">
      <field name="OP">ROOT</field>
    </block>
    <block type="math_trig">
      <field name="OP">SIN</field>
    </block>
  </category>
  <category name="Text" colour="260">
    <block type="text"></block>
    <block type="text_length"></block>
    <block type="text_join"></block>
    <block type="text_print"></block>
  </category>
  <category name="Lists" colour="300">
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_repeat"></block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf"></block>
    <block type="lists_getIndex"></block>
    <block type="lists_setIndex"></block>
    <block type="lists_getSublist"></block>
    <block type="lists_split"></block>
    <block type="lists_sort"></block>
  </category>
  
</xml>
`;

let user_box = document.querySelector(".user-box");
let user_id = localStorage.getItem("session");
let close_button_3 = document.querySelector(".close-button-3");
let user_page = document.querySelector(".user-page-container");
let disconnect_button = document.querySelector(".disconnect-button");
let ok = 0;

console.log(user_id);
if(user_id === "0") {
    user_box.classList.remove("active");
}
else{
    user_box.classList.add("active");
}

const workspace = Blockly.inject('blockly-editor-container', {toolbox: toolbox});
function updateCode(event) {

    let code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code-area').innerText = code;
}
workspace.addChangeListener(updateCode);

let run_button = document.querySelector(".blockly-run-button");

run_button.addEventListener('click', () => {
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    eval(code);
});

async function user_details() {
  let user_id = localStorage.getItem("session"); 
  const request = new Request('http://localhost:8080/users/id/' + user_id);
  const response = await fetch(request);
  const temp = await response.json();
  let user_name = document.getElementsByClassName("user_name")[0];
  let user_email = document.getElementsByClassName("user_email")[0];
  let user_phone = document.getElementsByClassName("user_phone")[0];
  let user_nickname = document.getElementsByClassName("user-page-nickname")[0];

  user_name.innerHTML = "Nume: " + temp['name'];
  user_email.innerHTML = "E-mail: " + temp['email'];
  user_phone.innerHTML = "Telefon: " + temp['phone'];
  user_nickname.innerHTML = temp['nickname'];


}

async function user_exercices() {
  let user_id = localStorage.getItem("session");
  var exercice_container = document.getElementsByClassName("user-exercices-container")[0];
  let user_exercices = document.getElementsByClassName("user_exercices")[0];
  const request = new Request('http://localhost:8080/exercices/id/' + user_id);
  const response = await fetch(request);
  const temp = await response.json();
  for(var i = 0; i < temp.length; i++){
      var exercice = document.createElement("h2");
      exercice.innerHTML= `
      <h2 class="user-individual-exercice"> ${temp[i]['exerciceName']} </h2>
     `;
     exercice_container.append(exercice);
  }
  user_exercices.innerHTML = "Probleme rezolvate: " + temp.length;
  
  
}

user_box.addEventListener('click', () => {
  user_page.classList.add("active");
  user_details();
  if(ok === 0){
    user_exercices();
    ok = 1;
}
});

close_button_3.addEventListener('click', () => {
  user_page.classList.remove("active");
});

disconnect_button.addEventListener('click', () => {
  localStorage.setItem("session", 0);
  user_page.classList.remove("active");
  user_box.classList.remove("active");
});
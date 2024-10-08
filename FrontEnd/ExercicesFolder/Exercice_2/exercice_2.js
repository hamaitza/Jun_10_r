Blockly.Blocks['print_to_string'] = {
    init: function() {
      this.appendValueInput('VALUE')
          .setCheck(null)
          .appendField('print');
      this.setOutput(true, 'String');
      this.setColour(260);
      this.setTooltip('Converts the value to a string.');
      this.setPreviousStatement(false);
      this.setHelpUrl('');
    }
  };
  
  Blockly.JavaScript['print_to_string'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '';
    var code = 'String(' + value + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  const toolbox = `
  <xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
    
    <category name="Math" colour="230">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
      <block type="math_arithmetic">
        <field name="OP">ADD</field>
      </block>
    </category>
    <category name="Text" colour="260">
      <block type="print_to_string"></block>
    </category>
  </xml>
  `;
  
  const workspace = Blockly.inject('blockly-editor-container', {toolbox: toolbox});
  
  let run_button = document.querySelector(".blockly-run-button");
  let close_button_3 = document.querySelector(".close-button-3");
  let user_box = document.querySelector(".user-box");
  let user_page = document.querySelector(".user-page-container");
  let disconnect_button = document.querySelector(".disconnect-button");
  
  let ok = 0;
  let user_id = localStorage.getItem("session");
  if(user_id === "0") {
      user_box.classList.remove("active");
  }
  else{
      user_box.classList.add("active");
  }
      
  
  run_button.addEventListener('click', () => {
    let code = Blockly.JavaScript.workspaceToCode(workspace);
    let result = eval(code);

    if(result > 100 || result < 0){
        document.getElementById('code-area-1').innerText = " " + result;
        document.getElementById('code-area-2').innerText = "\nRaspunsul este gresit.";
    }
    else{
        document.getElementById('code-area-1').innerText = " " + result;
        document.getElementById('code-area-2').innerText = "\nFelicitari.";
        var object = new Object();
        let user_id2 = localStorage.getItem("session");
        object.exerciceName = "Exercitiul 2: Operatii matematice";
        object.userId = user_id2;
        console.log(object);
        fetch("http://localhost:8080/exercices/add", {
              method: "POST",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(object)
              }).then(res => {
            
              });
    }
    
  
   
  
  });
  
  
  async function user_details() {
    user_id = localStorage.getItem("session");
    localStorage.setItem("session", user_id);
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
    user_id = localStorage.getItem("session");
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
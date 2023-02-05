// Meu CEP ---- 09572600

//Events listeners
//document.getElementById("file-input").addEventListener("change", function() { // Adicionando addEventListener aos inputs
    //uploadFile();
//});

//Cep_Luan: 09780130



function cep() {

    var numero_cep = document.getElementById("txt-cep").value;
    req_api_cep(numero_cep);

    function req_api_cep(valor) {
        
        if (valor.length !== 8) { //Validando a entrada do usuário pela quantidade de caracteres
            alert('CEP inválido');
            return;
        }

        let url = 'https://viacep.com.br/ws/' + valor + '/json'; //Concatenando texto de uma maneira mais facil
            

        fetch(url).then(function(responsse) {//Bloco da requisição

            responsse.json().then(function(data) {

                let cep_status = ''

                if (data.erro) {    //Validando resposta da API
                    cep_status = 'erro'
                    document.getElementById('txt-cep').value = ''
                    alert('CEP não encontrado')

                }
                
                let tipo_logradouro = data.logradouro;

                var list_tipo_logradouro = ''

                for(iten in tipo_logradouro) {
                    if(tipo_logradouro[iten] !== " ") {
                      list_tipo_logradouro = (list_tipo_logradouro + tipo_logradouro[iten]);
                    }
                    else {
                        break;
                    }
                }

                console.log(cep_status);

                if (cep_status !== 'erro') {
                    show_results(data, list_tipo_logradouro); // Chamar função para mostrar o resulado ao usuário "Meu json está aqui"
                }

            })
            
        }); //Minha requisição morreaqui --------             
        
    }

    function show_results(data_json, tipo_logradouro) {

        let obj_card_cep = document.getElementById('card-cep');
        let obj_screen_validation = document.getElementById('screen-validation');
        obj_card_cep.style.display = 'none';
        obj_screen_validation.style.display = 'flex';

        let obj_h1_paracomecar = document.getElementById('left-container-h1-01');
        let obj_h1_agr_valide = document.getElementById('left-container-h1-02');
        obj_h1_paracomecar.style.display = 'none';
        obj_h1_agr_valide.style.display = 'flex';

        document.getElementById('tipo-logradouro').value        = (tipo_logradouro);
        document.getElementById('logradouro').value             = (data_json.logradouro);
        document.getElementById('numero-residencia').value      = ('Insira o número...');   //Solicitar ao usuário
        document.getElementById('complemento-residencia').value = (data_json.complemento);
        document.getElementById('bairro').value                 = (data_json.bairro);
        document.getElementById('municipio').value              = (data_json.localidade);
        document.getElementById('uf').value                     = (data_json.uf);
        document.getElementById('pais').value                   = 'Brasil';
        document.getElementById('cep').value                    = (data_json.cep);
    }

}

function enviar_infos_cep (numero_residencia) {

    //Validar entradas e informações inseridas
    if (numero_residencia == 'Insira o número...' || numero_residencia == '') {
        alert('Antes de enviar as informações, insira o número do endereço.');
        return;
    }

    //Comprimir forms em um array   []
    var keys_cep = ['tipo-logradouro', 'logradouro', 'numero-residencia', 'complemento-residencia', 'bairro', 'municipio', 'uf', 'pais', 'cep'];
    data_forms = {'tipo-logradouro' : '', 'logradouro' : '', 'numero-residencia' : '', 'complemento-residencia' : '', 'bairro' : "", 'municipio' : '', 'uf' : '', 'pais' : '', 'cep' : ''};

    for  (iten in keys_cep) {
        chave = keys_cep[iten];
        data_forms[chave] = document.getElementById(keys_cep[iten]).value;
    }

    //Mostra etapa para upload dos documentos
    let obj_screen_validation = document.getElementById('screen-validation');
    let obj_card_upload_file = document.getElementById('card-upload-file');
    obj_screen_validation.style.display = 'none';
    obj_card_upload_file.style.display = 'flex';

    let obj_h1_faca_upload = document.getElementById('left-container-h1-03');
    let obj_h1_agr_valide = document.getElementById('left-container-h1-02');
    obj_h1_agr_valide.style.display = 'none';
    obj_h1_faca_upload.style.display = 'flex';

    let obj_animation_cep = document.getElementById('cep-animation')
    let obj_animation_upload = document.getElementById('upload-animation')
    obj_animation_cep.style.display = 'none';
    obj_animation_upload.style.display = 'flex';
}

function upload_rel_ativos () {

    //Pegando arquivo pela lista de objetos
    var rel_ativos = document.getElementById('input-file-01').files[0];
    var reader = new FileReader();
    reader.onload = processFile(rel_ativos);
    reader.readAsText(rel_ativos); 
    
    function processFile(theFile){
        return function(e) { 
            // Use the .split I've included when calling this from uploadFile()
            var rel_ativos_theBytes = e.target.result; //.split('base64,')[1]; 
            document.getElementById('input-file-01').textContent = rel_ativos_theBytes;
            rel_ativos_theBytes = convert_csv_json_rel_ativos(rel_ativos_theBytes)
            data_rel_ativos = rel_ativos_theBytes;

        }
    }
    
    function convert_csv_json_rel_ativos(csv){
    
        var lines=csv.split("\n");
    
        var result = [];
    
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(";");
    
        for(var i=1;i<lines.length;i++){
    
            var obj = {};
            var currentline=lines[i].split(";");
    
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
    
            result.push(obj);
    
        }
    
        //return result; //JavaScript object
        return result; //JSON
    }

    let obj_btn_upload = document.getElementById('btn-upload-01')
    obj_btn_upload.style.backgroundColor = '#0eee15';
    obj_btn_upload.setAttribute('disabled', '')

}



function upload_rel_faturamento () {

    //Pegando arquivo pela lista de objetos
    var rel_faturamento = document.getElementById('input-file-02').files[0];
    var reader = new FileReader();
    reader.onload = processFile(rel_faturamento);
    reader.readAsText(rel_faturamento); 
    
    
    function processFile(theFile){
        return function(e) { 
            // Use the .split I've included when calling this from uploadFile()
            var rel_faturamento_theBytes = e.target.result; //.split('base64,')[1]; 
            document.getElementById('input-file-02').textContent = rel_faturamento_theBytes;
            rel_faturamento_theBytes = convert_csv_json(rel_faturamento_theBytes);
            data_rel_faturamento = rel_faturamento_theBytes;
        }
    }
    
    function convert_csv_json(csv){
    
        var lines=csv.split("\n");
    
        var result = [];
    
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(";");
    
        for(var i=1;i<lines.length;i++){
    
            var obj = {};
            var currentline=lines[i].split(";");
    
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
    
            result.push(obj);
    
        }
    
        //return result; //JavaScript object
        return result; //JSON
    }

    let obj_btn_upload = document.getElementById('btn-upload-02')
    obj_btn_upload.style.backgroundColor = '#0eee15';
    obj_btn_upload.setAttribute('disabled', '')

}






function compile_files () {

    //for (keys in Object.keys(data_rel_ativos)) {
        //console.log(Object.keys(data_rel_ativos));
        //console.log('-------------------------------------------------------------------------------------------')
    //}

    data_rel_ativos = data_rel_ativos[0];

    console.log(data_rel_ativos);
    console.log(data_rel_ativos['1']);


    console.log(data_rel_faturamento);
    console.log(data_rel_faturamento[0]);


    console.log(data_forms);
}

function export_layouts () {

}
class CalcController {

    constructor(){

        this._audio = new Audio ('click.mp3'); // Não é uma classe nativa Audio Web API - Pesquisar
        this._audioOnOff = false;

        this._lastOperator ='';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); // El é colocado por convensão para se referir ao elemento
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");  // This - referencia de atributos e metodos
        this._currentDate;
        this.initialize();
        this.initButtomEvents();
        this.initKeyBoard();


    }
    // TRATANDO O INTERVALO DE DATA 
    initialize(){

        this.setDisplayDateTime();  

        setInterval(()=>{
            this.setDisplayDateTime();            
        }, 1000);// Os parâmetros são em milisegundos

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn=>{

            btn.addEventListener('dblclick', e=>{

                this.toggleAudio();

            });

        });

    }
    /*INSERINDO AUDIO*/
    toggleAudio(){

        this._audioOnOff = !this._audioOnOff; // Assim ele nega ele mesmo e sempre inverte os valores

    }

    playAudio(){
        
       if (this._audioOnOff) {

        this._audio.currentTime = 0;
        this._audio.play();

       }

    }
    // CTRL +c CTRK +V 
    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    pasteFromClipboard(){

        document.addEventListener('paste', e=>{

           let text = e.clipboardData.getData('Text');

           this.displayCalc = parseFloat(text);

        });

    }

    /*EVENTOS DE TECLADO*/
    initKeyBoard(){

        document.addEventListener('keyup', e=>{

            this.playAudio();

            switch (e.key){

                case 'Escape':
                    this.clearAll();
                     break;
                case 'Backspace':
                    this.clearEntry();
                     break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key)
                     break;                
                     
                case 'Enter':
                case '=':
                    this.calc();
                     break;
                case '.':
                case ',':
                    this.addDot()
                     break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
    
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
                /*case 'v':
                    if(e.ctrlKey) this.pasteFromClipboard();
                    break;*/
    
            }

        });

    }
    // TRATANDO EVENTOS
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        });

    }
    // LIMPAR TUDO
    clearAll(){

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator ='';

        this.setLastNumberToDisplay();

    }
    // LIMPAR O ULTIMO VALOR
    clearEntry(){

        this._operation.pop();

        this.setLastNumberToDisplay();

    }   
    // TRATAR ERROS
    setError(){
        this.displayCalc = "Error";
    }
    //RETORNAR O ULTIMO VALOR INSERIDO
    getLastOperation() {

      return this._operation[this._operation.length - 1];

    }
    // VER O ÚLTIMO VALOR INSERIDO
    setLastOperation(value){

        this._operation[this._operation.length - 1] = value;

    }
    // TRATAR OPERADORES
    isOperator(value){

       return( ['+','-','*','%','/'].indexOf(value) > -1); // Não precisa de if ou else, pois ele ja retorna True or False
        
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();

        }
    }
    /* VARIAÇÕES DO BOTÃO = */

    getResult(){

        try{ //Tratando erros com try Catch Posso colocar em toda area sensível da aplicação
             return eval(this._operation.join(""));
    }   catch(e) {

        setTimeout(()=>{
            this.setError()
        }, 1);
        

    }

    }
    // Começando com os calculos
    calc(){

        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3){

            last = this._operation.pop();             
            this._lastNumber = this.getResult();
        }

         else if(this._operation.length == 3){ //Se tiver else if, não cai nos dois if

            this._lastNumber = this.getLastItem(false);

        }
        let result = this.getResult();

        if (last == '%'){

           result /=  100; // Ele é igual a ele mesmo dividido por 100

           this._operation = [result];

        } else{

            this._operation = [result];

            if (last) this._operation.push(last);

        }


        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true){

        let lastItem;

        for(let i = this._operation.length - 1; i>=0; i--){
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break; //para execução do For

             }
         }

        if(!lastItem){

            lastItem =(isOperator) ? this._lastOperator : this._lastNumber; // Operador ternário

        }

        return lastItem;

    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }
    
/* VALIDAÇÃO PARA OS BOTÕES, SE É UM NÚMERO, ACRESCENTA NO ARRAY, SEM MUDAR A POSIÇÃO */
    addOperation(value){
        if (isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //trocar o operador
                this.setLastOperation(value);

             }
                 else{
                    this.pushOperation(value);

                    this.setLastNumberToDisplay();
                }
            

        } else{
            //Number
            if (this.isOperator(value)){
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                //atualizar display
                this.setLastNumberToDisplay();
            }

            
        }


    }

    /*ADICIONAR O PONTO*/

    addDot(){

       let lastOperation = this.getLastOperation();

       if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 ) return;

       if (this.isOperator(lastOperation) || !lastOperation){
           this.pushOperation('0.');
       } else{
           this.setLastOperation(lastOperation.toString() + '.');
       }
       this.setLastNumberToDisplay();

    }

    /* CASOS DE CLICKS DO BOTÃO*/

    execBtn(value){

        this.playAudio();

        switch (value){

            case 'ac':
                this.clearAll();
                 break;
            case 'ce':
                this.clearEntry();
                 break;
            case 'soma':
                this.addOperation('+')
                 break;
            case 'subtracao':
                this.addOperation('-')
                 break;
            case 'divisao':
                this.addOperation('/')
                 break;
            case 'multiplicacao':
                this.addOperation('*')
                 break;
            case 'porcento':
                this.addOperation('%')
                 break;
            case 'igual':
                this.calc();
                 break;
            case 'ponto':
                this.addDot()
                 break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }
    }
 /* DEFININDO EVENTOS DE CLICKS */ 
     initButtomEvents(){

       let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // > é o seletor de filhos

       buttons.forEach((btn, index)=>{
           this.addEventListenerAll(btn, "click drag", e=>{
              
                let textBtn = btn.className.baseVal.replace("btn-","");// traz só o nome da clase, fica mais clean
            
                this.execBtn(textBtn);
           
            });

           this.addEventListenerAll(btn," mouseover mouseup mousedown", e=>{
               btn.style.cursor = "pointer";
           });
       });

    }

    /* DEFININDO DATA E HORA DO DISPLAY   CALCULADORA */
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
       this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){


        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value){

        if(value.toString().length > 10){

            this.setError();
            return false;

        }

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}
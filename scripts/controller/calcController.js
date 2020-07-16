class CalcController {

    constructor(){

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); // El é colocado por convensão para se referir ao elemento
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");  // This - referencia de atributos e metodos
        this._currentDate;
        this.initialize();
        this.initButtomEvents();

    }
    // TRATANDO O INTERVALO DE DATA 
    initialize(){

        this.setDisplayDateTime();  

        setInterval(()=>{
            this.setDisplayDateTime();            
        }, 1000);// Os parâmetros são em milisegundos

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

    }
    // LIMPAR O ULTIMO VALOR
    clearEntry(){

        this._operation.pop();

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
    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

    }

    setLastNumberToDisplay(){
        
    }
    
/* VALIDAÇÃO PARA OS BOTÕES, SE É UM NÚMERO, ACRESCENTA NO ARRAY, SEM MUDAR A POSIÇÃO */
    addOperation(value){
        if (isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //trocar o operador
                this.setLastOperation(value);

             } else if(isNaN(value)){
                //outra coisa
                
                console.log('outra coisa', value);

                } else{
                    this.pushOperation(value);
                }
            

        } else{
            //Number
            if (this.isOperator(value)){
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberToDisplay();
            }

            
        }


    }

    /* CASOS DE CLICKS DO BOTÃO*/

    execBtn(value){
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
                
                 break;
            case 'ponto':
                this.addOperation('.')
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
 /* DEFININDO EVENTOS DE CLICKS     */ 
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
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}
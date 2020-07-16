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

    initialize(){

        this.setDisplayDateTime();  

        setInterval(()=>{
            this.setDisplayDateTime();            
        }, 1000);// Os parâmetros são em milisegundos

    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        });

    }

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    setError(){
        this.displayCalc = "Error";
    }

    addOperation(value){

        this._operation.push(value);

        console.log(this._operation);

    }


    execBtn(value){
        switch (value){

            case 'ac':
                this.clearAll();
                 break;
            case 'ce':
                this.clearEntry();
                 break;
            case 'soma':
                
                 break;
            case 'subtracao':
                
                 break;
            case 'divisao':
            
                 break;
            case 'multiplicacao':
                
                 break;
            case 'porcento':
                
                 break;
            case 'igual':
                
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
class CalcController {

    constructor(){
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

    initButtomEvents(){

       let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // > é o seletor de filhos

       buttons.forEach((btn, index)=>{
           this.addEventListenerAll(btn, "click drag", e=>{
               console.log(btn.className.baseVal.replace("btn-",""));// traz só o nome da clase, fica mais clean
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
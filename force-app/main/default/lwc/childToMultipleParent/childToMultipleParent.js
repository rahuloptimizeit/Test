import { LightningElement,track } from 'lwc';

export default class ChildToMultipleParent extends LightningElement {

    @track condtion=0;

    handleAdd() {
        this.dispatchEvent(new CustomEvent('add'));
      }
      handleSubtract() {
        this.dispatchEvent(new CustomEvent('subtract'));
      }
      handleMulti() {
        this.dispatchEvent(new CustomEvent('multi'));
      }


      @track selectedOption;
      changeHandler(event) {
       // console.log('you have selected',this.selectedOption);
      const field = event.target.name;
      if (field === 'optionSelect') {
          this.selectedOption = event.target.value;
          console.log('you have selected1',this.selectedOption);
           //   alert("you have selected : ",this.selectedOption);
              if(this.selectedOption == 'ADD') {
                console.log('you have selected2',this.selectedOption);
                document.getElementById("cont2").style="visibility: hidden;";
               // document.getElementById("cont2").style.visibility="hidden";
            }
            else if(this.selectedOption == 'SUB') {
                console.log('you have selected2',this.selectedOption);
                document.getElementById("cont1").style="visibility: hidden;";
               // document.getElementById("cont2").style.visibility="hidden";
            }
           else if(this.selectedOption == 'MUL') {
                console.log('you have selected2',this.selectedOption);
                document.getElementById("cont3").style="visibility: hidden;";
               // document.getElementById("cont2").style.visibility="hidden";
            }
          } 
      }

       Selector(condtion) {
          if(condtion == 0) {
              document.getElementById("cont1").style.visibility="hidden";
             // document.getElementById("cont2").style.visibility="hidden";
          }

          if(condtion == 1) {
              document.getElementById("cont2").style.visibility="visible";
              //document.getElementById("cont2").style.visibility="hidden"; 
          }

          if(condtion == 2)  {
              document.getElementById("cont3").style.visibility="hidden";
             // document.getElementById("cont2").style.visibility="visible"; 
          }
      }






    //   demodisplay()
    //   {
    //     document.getElementById("Add").style.visibility = "hidden";
    //   }
    //   connectedCallback(){
    //     demodisplay();
    // }
}
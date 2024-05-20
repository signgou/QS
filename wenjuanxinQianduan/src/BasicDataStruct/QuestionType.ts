import  { ref, shallowRef } from "vue";
interface OP
{
    name: string;
    isSelect: boolean;
}

export class OPtion
{
  name: string='';
  isSelect: boolean=false;

  constructor(name :string,isSelect :boolean)
  {
     this.name=name;
     this.isSelect=isSelect;

  }
   
  changeName(nameNew:string):void
  {
     this.name=nameNew;
  }

  changeChooseOrNot():void
  {
    this.isSelect=!this.isSelect;
  }
  
  returnIsselect():boolean
  {
    return this.isSelect
  }

  returnName():string
  {
    return this.name;
  }


}

export class oneChoiceP
{
tittle: string='';
  Qusetion?:OPtion[];
  whichBeChoose?:number;
  
  changeTittle(tittle :string):void
  {
    this.tittle=tittle;
  }

  addOpyion():void{


  }

  subOption():void
  {

  }

  returnTittle():string
  {
    return this.tittle;
  }

  returnQuestion():void//未实现
  {

  }




}


export class MoreChoice
{
  tittle: string='';
  Qusetion?:OPtion[];
  whichBeChoose?:number[];
  
  changeTittle(tittle :string):void
  {
    this.tittle=tittle;
  }

  addOpyion():void{


  }

  subOption():void
  {

  }

  returnTittle():string
  {
    return this.tittle;
  }

  returnQuestion():void//未实现
  {

  }


}

export class FillIn
{
  Tittle: string='';
  Answer: string='';

  changeTittle(tittle :string):void
  {
    this.Tittle=tittle;
  }

  changeAnswer(answer: string):void
  {
    this.Answer=answer;
  }

  returnTittle():void
  {

  }

  returnAnswer():void
  {

  }

}

export class QuestionnaireAll
{
   questionNaire?: (oneChoiceP|MoreChoice|FillIn)[];

   construct()
   {

   };

   addQusetion():void
   {

   }

   removeQuestion():void
   {

   }

   getQuestions():void  //未实现
   {

   }

}
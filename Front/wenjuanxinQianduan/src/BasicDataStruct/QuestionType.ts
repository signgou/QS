
export class OPtion
{
  value: string='';//选项序号-索引
  label: string = '';//选项名字

  constructor(value :string,name :string)
  {
     this.value=value;
     this.label=name;

  }
   
  changeLabel(nameNew:string):void
  {
     this.label=nameNew;
  }
  
  returnValue():string
  {
    return this.value
  }

  returnlabel():string
  {
    return this.label;
  }


}

export class oneChoiceP
{
tittle: string='';
  question:OPtion[]=[];
  whichBeChoose?:string='';
  constructor(tittle:string,question: OPtion[])
  {
      this.tittle=tittle;
      this.question=question;
  }
  
  changeTittle(tittle :string):void
  {
    this.tittle=tittle;
  }

  addOption(option: OPtion): void {
    this.question.push(option);
  }

  removeOption(index: number): void {
    this.question.splice(index, 1);
  }

  returnTittle():string
  {
    return this.tittle;
  }

  returnQuestion():OPtion[]//未实现
  {
    return this.question;
  }
   setWhichBechoice(whi:string):void
   {
       this.whichBeChoose=whi;
   }



}


export class MoreChoice {
  tittle: string = '';
  Question: OPtion[] = [];
  whichBeChoose: string[] = [];  

  constructor(tit: string, que: OPtion[]) {
    this.tittle = tit;
    this.Question = que;
  }

  changeTittle(tittle: string): void {
    this.tittle = tittle;
  }

  addOption(option: OPtion): void {
    this.Question.push(option);
  }

  removeOption(index: number): void {
    this.Question.splice(index, 1);
  }

  returnTittle(): string {
    return this.tittle;
  }

  returnQuestion(): OPtion[] {
    return this.Question;
  }
}


export class FillIn
{
  Tittle: string='';
  Answer: string='';
  constructor(tit:string,Ans:string)
  {
     this.Tittle=tit;
     this.Answer=Ans;
  }

  changeTittle(tittle :string):void
  {
    this.Tittle=tittle;
  }

  changeAnswer(answer: string):void
  {
    this.Answer=answer;
  }

  returnTittle():string
  { 
    return this.Tittle;
  }

  returnAnswer():string
  {
     return this.Answer;
  }

}

export class QuestionnaireAll
{
   questionNaire: (oneChoiceP | MoreChoice | FillIn)[] = [];
  Title: string = '';

  constructor(title: string, que: (oneChoiceP | MoreChoice | FillIn)[]) {
    this.Title = title;
    this.questionNaire = que;
  }

   returnTittle():string
   {
    return this.Title;
   }

   changeTittle(tit:string)
   {
     this.Title=tit;
   }

   addQuestion(question: oneChoiceP | MoreChoice | FillIn): void {
    this.questionNaire.push(question);
  }

  removeQuestion(index: number): void {
    this.questionNaire.splice(index, 1);
  }

  getQuestions(): (oneChoiceP | MoreChoice | FillIn)[] {
    return this.questionNaire;
  }

}
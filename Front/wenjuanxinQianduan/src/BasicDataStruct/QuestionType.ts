import { apiModQt } from "@/apis/modQt";
export class OPtion
{
  value: string='';//选项序号-索引
  label: string = '';//选项名字
  selectedNum: number=0;
  constructor(value :string,name :string,num:number)
  {
     this.value=value;
     this.label=name;
    this.selectedNum=num;
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
  qid:string=''
  whichBeChoose?:string='';
  constructor(tittle:string,question: OPtion[],qidInfo:string)
  {
      this.tittle=tittle;
      this.question=question;
      this.qid=qidInfo
  }
  
  changeTittle(tittle :string):void
  {
    this.tittle=tittle;
    let param={
      title:tittle
    }
    async function mod(qid:string){
      await apiModQt(param,"oneQns",qid)
    }
    let res=mod(this.qid)
  }

  addOption(option: OPtion): void {
    this.question.push(option);
    let tmp:string[]=[]
    this.question.forEach(it => {
      tmp.push(it.returnlabel())
    });
    let param={
      options:tmp
    }
    async function mod(qid:string){
      await apiModQt(param,"oneQns",qid)
    }
    let res=mod(this.qid)
  }

  removeOption(index: number): void {
    this.question.splice(index, 1);
    let tmp:string[]=[]
    this.question.forEach(it => {
      tmp.push(it.returnlabel())
    });
    let param={
      options:tmp
    }
    async function mod(qid:string){
      await apiModQt(param,"oneQns",qid)
    }
    let res=mod(this.qid)
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
  qid:string=''
  whichBeChoose: string[] = [];  

  constructor(tit: string, que: OPtion[],qidInfo:string) {
    this.tittle = tit;
    this.Question = que;
    this.qid=qidInfo
  }

  changeTittle(tittle: string): void {
    this.tittle = tittle;
    let param={
      title:tittle
    }
    async function mod(qid:string){
      await apiModQt(param,"moreQns",qid)
    }
    let res=mod(this.qid)
  }

  addOption(option: OPtion): void {
    this.Question.push(option);
    let tmp:string[]=[]
    this.Question.forEach(it => {
      tmp.push(it.returnlabel())
    });
    let param={
      options:tmp
    }
    async function mod(qid:string){
      await apiModQt(param,"moreQns",qid)
    }
    let res=mod(this.qid)
  }

  removeOption(index: number): void {
    this.Question.splice(index, 1);
    let tmp:string[]=[]
    this.Question.forEach(it => {
      tmp.push(it.returnlabel())
    });
    let param={
      options:tmp
    }
    async function mod(qid:string){
      await apiModQt(param,"moreQns",qid)
    }
    let res=mod(this.qid)
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
  Answer: string[]=[];
  qid:string=''
  TmpAns:string=''
  constructor(tit:string,Ans:string[],qidInfo:string)
  {
     this.Tittle=tit;
     this.Answer=Ans;
     this.qid=qidInfo
  }

  changeTittle(tittle :string):void
  {
    this.Tittle=tittle;
    let param={
      title:tittle
    }
    async function mod(qid:string){
      await apiModQt(param,"fillQns",qid)
    }
    let res=mod(this.qid)
    
  }

  changeAnswer(answer: string):void
  {
    // this.Answer.push(answer);
    this.Answer.push(answer)
    let param={
      ans:this.Answer
    }
    async function mod(qid:string){
      await apiModQt(param,"fillQns",qid)
    }
    let res=mod(this.qid)
  }

  returnTittle():string
  { 
    return this.Tittle;
  }

  returnAnswer():string[]
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
  changeQuestions(que:(oneChoiceP | MoreChoice | FillIn)[]){
    this.questionNaire=que
  }

}
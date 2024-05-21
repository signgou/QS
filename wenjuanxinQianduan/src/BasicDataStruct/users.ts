import {QuestionnaireAll} from"./QuestionType"

export class Users
{
    userName: string = '';
  passWord: string = '';
  questionnaire: QuestionnaireAll[] = [];

  constructor(userName: string, passWord: string) {
    this.userName = userName;
    this.passWord = passWord;
  }

  setQuestionnaire(Naire: QuestionnaireAll[])
  {
      this.questionnaire=Naire;
  }

  addQuestionnaire(questionnaire: QuestionnaireAll): void {
    this.questionnaire.push(questionnaire);
  }

  removeQuestionnaire(index: number): void {
    this.questionnaire.splice(index, 1);
  }

  returnUserName(): string {
    return this.userName;
  }

  returnQuestionnaireAll(): QuestionnaireAll[] {
    return this.questionnaire;
  }
}
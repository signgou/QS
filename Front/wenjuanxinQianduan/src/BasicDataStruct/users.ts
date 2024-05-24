import {QuestionnaireAll} from"./QuestionType"

export class Users
{
    userName: string = '';
  uid: string = '';
  questionnaire: QuestionnaireAll[] = [];

  constructor(uid: string, userName: string,que:QuestionnaireAll[]) {
    this.userName = userName;
    this.uid = uid;
    this.questionnaire=que;
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
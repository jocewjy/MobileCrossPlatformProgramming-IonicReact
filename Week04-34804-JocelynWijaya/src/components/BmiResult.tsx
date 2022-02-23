import { IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";

const BmiResult: React.FC <{ bmiResult:number; bmiCriteria: string}>= props => {
    
    return(
        <IonRow>
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h2>{props.bmiResult.toFixed(2)}</h2>
                  <h1>{props.bmiCriteria}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
        </IonRow>
    );
};
export default BmiResult;
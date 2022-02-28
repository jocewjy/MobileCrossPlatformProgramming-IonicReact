import { IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";
import './BmiResult.css';

const BmiResult: React.FC <{ bmiResult:number; bmiCriteria: string}>= props => {
  var cardColor =""
  if(props.bmiCriteria === "Normal"){
    cardColor = "success"
  }
  if(props.bmiCriteria === "Gemuk" || props.bmiCriteria === "Kurus"){
    cardColor = "warning"
  }
  if(props.bmiCriteria === "Obesitas"){
    cardColor = "danger"
  }

    return(
        <IonRow>
            <IonCol>
              <IonCard color={cardColor}>
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
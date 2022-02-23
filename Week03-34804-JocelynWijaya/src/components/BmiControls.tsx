import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import {refreshOutline, calculatorOutline} from 'ionicons/icons';
import { prependOnceListener } from "process";

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton id='calc-btn' onClick={props.onCalculate}>
              <IonIcon slot='start' icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton id='resetBtn' onClick={props.onReset}>
              <IonIcon slot='start' icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
    )
};

export default BmiControls;
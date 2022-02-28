import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import {refreshOutline, calculatorOutline} from 'ionicons/icons';

const Controls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
        <IonRow>
          <IonCol size="12" size-md="6" className="ion-text-center">
            <IonButton expand="block" color='success' onClick={props.onCalculate}>
              <IonIcon slot='start' icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol size="12" size-md="6" className="ion-text-center">
            <IonButton color='medium' fill='clear' onClick={props.onReset}>
              <IonIcon slot='start' icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
    )
};

export default Controls;
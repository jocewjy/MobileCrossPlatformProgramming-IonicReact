import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, 
  IonCol, 
  IonGrid,
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem,
  IonLabel, IonRow, IonTitle, IonToolbar, setupIonicReact, IonCardContent, IonCard} from '@ionic/react';
import {refreshOutline, calculatorOutline} from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [criteria, setCriteria] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    var bmiCriteria = "";

    if(!enteredWeight || !enteredHeight) return;

    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));

    if(bmi < 18.5){
      bmiCriteria = "Kurus";
    }
    if (bmi >= 18.5 && bmi <=24.9){
        bmiCriteria = "Normal";
    }
    if (bmi >= 25 && bmi <=29.9){
        bmiCriteria = "Gemuk";
    }
    if (bmi >= 30){
        bmiCriteria = "Obesitas";
    }
    setCriteria(bmiCriteria);

    console.log(bmi);
    setCalculatedBMI(bmi);
  };
  
  const resetInputs = () =>{
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  return(
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Tinggi Badan (cm)</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>Berat Badan (kg)</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton id='calc-btn' onClick={calculateBMI}>
              <IonIcon slot='start' icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton id='resetBtn' onClick={resetInputs}>
              <IonIcon slot='start' icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
        {calculatedBMI && criteria && (<IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>{calculatedBMI}</h2>
                <h1>{criteria}</h1>
              </IonCardContent>
            </IonCard>            
          </IonCol>
        </IonRow>)} 
      </IonGrid>   
    </IonApp>
  )
  
};

export default App;

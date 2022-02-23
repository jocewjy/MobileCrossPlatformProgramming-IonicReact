import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, 
  IonCol, 
  IonGrid,
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem,
  IonLabel, IonRow, IonTitle, IonToolbar, setupIonicReact, IonCardContent, IonCard, IonAlert } from '@ionic/react';
import {refreshOutline, calculatorOutline} from 'ionicons/icons';
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
import { useRef, useState } from 'react';

import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';
import BmiResult from './components/BmiResult';

setupIonicReact();

const App: React.FC = () => {
  const [error, setError] = useState<string>();

  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [criteria, setCriteria] = useState<string>();
  
  const [calcUnits, setCalcUnits] = useState<'cmkg'|'ftlbs'>('cmkg');

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    var bmiCriteria = "";
    
    
    if(!enteredWeight || !enteredHeight || +enteredHeight<=0 || +enteredWeight <=0){
      setError('Please enter a valid (non-negative) input number');
      return;
    }

    const weightConvFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConvFactor = calcUnits === 'ftlbs' ? 3.28 : 100;

    const weight = +enteredWeight / weightConvFactor;
    const height = +enteredHeight / heightConvFactor;

    const bmi = weight / (height * height);

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

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  }

  return(
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {text: 'Okay', handler: () => {setError('')}}
        ]}/>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
          {calculatedBMI && criteria && <BmiResult bmiResult={calculatedBMI} bmiCriteria={criteria}></BmiResult>} 
        </IonGrid>
      </IonApp>
    </>
  )
};

export default App;

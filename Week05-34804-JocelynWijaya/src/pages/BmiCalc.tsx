import { IonApp, IonButton, 
    IonCol, 
    IonGrid,
    IonHeader,
    IonInput, 
    IonItem,
    IonLabel, IonRow, IonTitle, IonToolbar, IonAlert, IonBackButton, IonContent } from '@ionic/react';

import { useRef, useState } from 'react';

import Controls from '../components/Controls';
import InputControl from '../components/InputControl';
import BmiResult from '../components/BmiResult';

const BmiCalc: React.FC = () => {
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
  
      console.log(heightConvFactor);
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
                <IonButton slot="start" fill='clear'>
                  <IonBackButton defaultHref="home"></IonBackButton>
                </IonButton>
                <IonTitle>BMI Calculator</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol size-sz='8' offset-sm='2' size-md='6' offset-md='3'>
                  <IonGrid className="ion-no-padding">
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
                    <Controls onCalculate={calculateBMI} onReset={resetInputs}/>
                    {calculatedBMI && criteria && <BmiResult bmiResult={calculatedBMI} bmiCriteria={criteria}></BmiResult>} 
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonApp>
      </>
    )
  };
  
  export default BmiCalc;
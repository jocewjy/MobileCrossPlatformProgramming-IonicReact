import { IonApp, IonButton, 
    IonCol, 
    IonGrid,
    IonHeader,
    IonInput, 
    IonItem,
    IonLabel, IonRow, IonTitle, IonToolbar, IonAlert, IonBackButton, IonRadioGroup, IonListHeader, IonList, IonRadio, IonCard, IonCardContent, IonContent } from '@ionic/react';

import { useRef, useState } from 'react';

import BmiControls from '../components/BmiControls';
import InputControl from '../components/InputControl';

const BmrCalc: React.FC = () => {
    const [error, setError] = useState<string>();
  
    const [calculatedBMR, setCalculatedBMR] = useState<number>();
    const [sedentary, setSedentary] = useState<Number>();
    const [ex3Times, setEx3Times] = useState<Number>();
    const [ex5Times, setEx5Times] = useState<Number>();
    const [exDaily, setExDaily] = useState<Number>();
    const [intense, setIntense] = useState<Number>();
    
    const [calcUnits, setCalcUnits] = useState<'cmkg'|'ftlbs'>('cmkg');
    const [sex, setSex] = useState<'male'|'female'>('male');
  
    const ageInputRef = useRef<HTMLIonInputElement>(null);
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
  
    const calculateBMR = () => {
      const enteredWeight = weightInputRef.current!.value;
      const enteredHeight = heightInputRef.current!.value;
      const age = ageInputRef.current!.value;

      var fact1, fact2, fact3, fact4;
      
      if(!enteredWeight || !enteredHeight || +enteredHeight<=0 || +enteredWeight <=0 || !age || +age<=0){
        setError('Please enter a valid (non-negative) input number');
        return;
      }
  
      const weightConvFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
      const heightConvFactor = calcUnits === 'ftlbs' ? 3.28 : 1;
  
      const weight = +enteredWeight / weightConvFactor;
      const height = +enteredHeight / heightConvFactor;

      if(sex === 'male'){
        fact1 = 66;
        fact2 = 13.7;
        fact3 = 5;
        fact4 = 6.8;
      } else {
        fact1 = 655;
        fact2 = 9.7;
        fact3 = 1.8;
        fact4 = 4.7;
      }
  
      const bmr = fact1 + (fact2 * weight) + (fact3 * height) - (fact4 * +age)
      
      var sedentary = bmr * 1.2;
      var threeTimes = bmr * 1.375;
      var fiveTimes = bmr * 1.55;
      var daily = bmr * 1.725;
      var intense = bmr * 1.9;

      setCalculatedBMR(bmr);

      setSedentary(sedentary);
      setEx3Times(threeTimes);
      setEx5Times(fiveTimes);
      setExDaily(daily);
      setIntense(intense);
    };
    
    const resetInputs = () =>{
      weightInputRef.current!.value = '';
      heightInputRef.current!.value = '';
      ageInputRef.current!.value = '';
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
              <IonTitle>BMR Calculator</IonTitle>
              <IonButton slot="start">
                  <IonBackButton defaultHref="home"></IonBackButton>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonGrid class="forecast_container">
            <IonRow>
              <IonCol>
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>Umur</IonLabel>
                  <IonInput ref={ageInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonRadioGroup value={sex} onIonChange={e=>setSex(e.detail.value)}>
                        <IonListHeader><IonLabel>Jenis Kelamin</IonLabel></IonListHeader>
                        <IonItem>
                            <IonLabel>Laki-laki</IonLabel>
                            <IonRadio slot='start' value="male"></IonRadio>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Perempuan</IonLabel>
                            <IonRadio slot='start' value="female"></IonRadio>
                        </IonItem>
                    </IonRadioGroup>
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
            <BmiControls onCalculate={calculateBMR} onReset={resetInputs}/>
            {calculatedBMR && sedentary && ex3Times && ex5Times && exDaily && intense &&
              <IonRow>
                  <IonCard>
                    <IonCardContent className="ion-text-center">
                      <h2>BMR = {calculatedBMR.toFixed(2)} kalori/hari</h2>
                      <h2>Kalori harian yang dibutuhkan berdasarkan tingkat aktivitas</h2>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2><b>Tingkat Aktivitas</b></h2></IonCol>
                        <IonCol><h2><b>Kalori</b></h2></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Sedentary: little or no excercise</h2></IonCol>
                        <IonCol><h2>{sedentary.toFixed(2)}</h2></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Exercise 1-3 times/week</h2></IonCol>
                        <IonCol><h2>{ex3Times.toFixed(2)}</h2></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Exercise 4-5 times/week</h2></IonCol>
                        <IonCol><h2>{ex5Times.toFixed(2)}</h2></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Daily exercise or intense exercise 4-5 times/week</h2></IonCol>
                        <IonCol><h2>{exDaily.toFixed(2)}</h2></IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Intense xercise 6-7 times/week</h2></IonCol>
                        <IonCol><h2>{intense.toFixed(2)}</h2></IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
              </IonRow>}             
          </IonGrid>
        </IonApp>
      </>
    )
};

export default BmrCalc;


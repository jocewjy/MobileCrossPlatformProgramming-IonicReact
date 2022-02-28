import { IonApp, IonButton, 
    IonCol, 
    IonGrid,
    IonHeader,
    IonInput, 
    IonItem,
    IonLabel, IonRow, IonTitle, IonToolbar, IonAlert, IonBackButton, IonRadioGroup, IonListHeader, IonList, IonRadio, IonCard, IonCardContent, IonContent } from '@ionic/react';

import { useRef, useState } from 'react';

import Controls from '../components/Controls';
import InputControl from '../components/InputControl';
import BmrResult from '../components/BmrResult';

const BmrCalc: React.FC = () => {
    const [error, setError] = useState<string>();
  
    const [calculatedBMR, setCalculatedBMR] = useState<number>();
    const [sedentary, setSedentary] = useState<number>();
    const [ex3Times, setEx3Times] = useState<number>();
    const [ex5Times, setEx5Times] = useState<number>();
    const [exDaily, setExDaily] = useState<number>();
    const [intense, setIntense] = useState<number>();
    
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
              <IonButton slot="start" fill='clear'>
                  <IonBackButton defaultHref="home"></IonBackButton>
              </IonButton>
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
                    <Controls onCalculate={calculateBMR} onReset={resetInputs}/>
                    {calculatedBMR && sedentary && ex3Times && ex5Times && exDaily && intense &&
                      <BmrResult bmrResult={calculatedBMR} sedentary={sedentary} ex3Times={ex3Times} ex5Times={ex5Times} exDaily={exDaily} intense={intense}></BmrResult>}
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonApp>
      </>
    )
};

export default BmrCalc;


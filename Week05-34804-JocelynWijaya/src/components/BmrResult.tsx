import { IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";
import './BmiResult.css';

const BmrResult: React.FC <{ bmrResult:number; sedentary:number; ex3Times:number; ex5Times:number; exDaily:number; intense:number;}>= props => {
    
    return(
        <IonRow>
            <IonCard>
                <IonCardContent className="ion-text-center">
                    <h2>BMR = {props.bmrResult.toFixed(2)} kalori/hari</h2>
                    <h2>Kalori harian yang dibutuhkan berdasarkan tingkat aktivitas</h2>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2><b>Tingkat Aktivitas</b></h2></IonCol>
                        <IonCol><h2><b>Kalori</b></h2></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Sedentary: little or no excercise</h2></IonCol>
                        <IonCol><h2>{props.sedentary.toFixed(2)}</h2></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Exercise 1-3 times/week</h2></IonCol>
                        <IonCol><h2>{props.ex3Times.toFixed(2)}</h2></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Exercise 4-5 times/week</h2></IonCol>
                        <IonCol><h2>{props.ex5Times.toFixed(2)}</h2></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Daily exercise or intense exercise 4-5 times/week</h2></IonCol>
                        <IonCol><h2>{props.exDaily.toFixed(2)}</h2></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-text-left" size='9'><h2>Intense xercise 6-7 times/week</h2></IonCol>
                        <IonCol><h2>{props.intense.toFixed(2)}</h2></IonCol>
                    </IonRow>
                </IonCardContent>
            </IonCard>
        </IonRow>
    );
};
export default BmrResult;
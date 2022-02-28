import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>00000034804 - Jocelyn Wijaya</h2>
        <IonButton expand='block' href='bmi'>BMI Calculator</IonButton>
        <IonButton expand='block' href='bmr'>BMR Calculator</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

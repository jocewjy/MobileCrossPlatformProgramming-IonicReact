import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";

export const MAIL_DATA =[
    {id: 'm1', subject: 'Magang MBKM sudah dimulai'},
    {id: 'm2', subject: 'Bimbingan Skripsi'},
    {id: 'm3', subject: 'Progress Laporan'}
]

const Mail: React.FC = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle> Ionic Mail </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            {MAIL_DATA.map(mail => (
                <IonCard key={mail.id}>
                    <IonCardContent className='ion-text-center'>
                        <h2>{mail.subject}</h2>
                        <IonButton routerLink={`/mail/${mail.id}`}>
                            View Mail
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            ))}
        </IonContent>
    </IonPage>

);

export default Mail;
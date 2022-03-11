import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { useRef } from "react";
import { ban, create, trashSharp } from "ionicons/icons";

export const FRIENDS_DATA = [
    { id: 'f1', name: 'John Thor', avatar: 'https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2021/09/10/3357968484.jpg' },
    { id: 'f2', name: 'John Ness', avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Hoaxed_photo_of_the_Loch_Ness_monster.jpg/230px-Hoaxed_photo_of_the_Loch_Ness_monster.jpg' },
    { id: 'f3', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1522787126632-aa89815837ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9lfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }
];

const Meet: React.FC = () => {
    const callFriendHandler = () => {
        console.log("Calling...");
    };
    
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    }

    const deleteFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...");
    }

    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Meet</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {FRIENDS_DATA.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon slot="icon-only" icon={ban}></IonIcon>
                                </IonItemOption>

                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                                </IonItemOption>
                            </IonItemOptions>
                            
                            <IonItem lines="full" button onClick={callFriendHandler}>
                                <IonThumbnail slot="start">
                                    <img src={friend.avatar} />
                                </IonThumbnail>

                                <IonLabel>
                                    {friend.name}
                                </IonLabel>
                            </IonItem>

                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon slot="icon-only" icon={create}></IonIcon>
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Meet;

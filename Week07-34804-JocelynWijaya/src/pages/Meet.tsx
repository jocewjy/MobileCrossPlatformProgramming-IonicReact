import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonThumbnail, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { ban, create, trashSharp, addOutline } from "ionicons/icons";
import { isPlatform } from "@ionic/core";

import FriendsContext from '../data/friend-context';

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
    
    const [toastMessage, setToastMessage] = useState('');

    const [selectedFriend, setSelectedFriend] = useState<{
		id: string;
		name: string;
		avatar: string;
	} | null>();
	const friendsContext = useContext(FriendsContext);
	const nameRef = useRef<HTMLIonInputElement>(null);

    //Add feature
    const [addFriend, setAddFriend] = useState(false);
    const startAddFriendHandler = () => {
        console.log("Adding friend...");
    }
    const cancelAddFriendHandler = () => {
		setAddFriend(false);
	};

    //Edit feature
    const [isEditing, setIsEditing] = useState(false);
    const startEditFriendHandler = (friend_id: String) => {
		slidingOptionsRef.current?.closeOpened();
		console.log('Editing...');

		const friend = friendsContext.friends.find(f => f.id === friend_id);
		setSelectedFriend(friend);
		setIsEditing(true);
	};
    const cancelEditFriendHandler = () => {
		setIsEditing(false);
	};

    //Block feature
    const [startBlocking, setStartBlocking] = useState(false);
    const startBlockFriendHandler = () => {
        setStartBlocking(true);
        slidingOptionsRef.current?.closeOpened();
    }
    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        setStartBlocking(false);

        setToastMessage('Blocked Friend!');
    }

    //Delete feature
    const [startDeleting, setStartDeleting] = useState(false);
    const startDeleteFriendHandler = (friend_id: String) => {
        setStartDeleting(true);
        slidingOptionsRef.current?.closeOpened();

        const friend = friendsContext.friends.find(f => f.id === friend_id);
		setSelectedFriend(friend);
    }
    const deleteFriendHandler = (friend_id: string) => {
        setStartDeleting(false);
        slidingOptionsRef.current?.closeOpened();

        friendsContext.deleteFriend(friend_id);

        setToastMessage('Deleted Friend!');
    }

    //Save changes feature
    const saveFriendHandler = () => {
		const enteredName = nameRef.current!.value;

		if (!enteredName) return;
		
        if (selectedFriend === null) {
			friendsContext.addFriend(enteredName.toString(), '');
		} else {
			friendsContext.updateFriend(
				selectedFriend!.id.toString(),
				enteredName!.toString(),
				selectedFriend!.avatar.toString()
			);
		}
		
        setIsEditing(false);
		setAddFriend(false);
	};

    return (
        <React.Fragment>
            <IonAlert isOpen={startDeleting}
                header="Are you sure?"
                message="Do you want to delete your friend? This cannot be undone."
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setStartDeleting(false) } },
                    { text: 'Yes', handler: () => { deleteFriendHandler(selectedFriend!.id.toString()); } }
                ]} />
            <IonAlert isOpen={startBlocking}
                header="Are you sure?"
                message="Do you want to block your friend? This cannot be undone."
                buttons={[
                    { text: 'No', role: 'cancel', handler: () => { setStartBlocking(false) } },
                    { text: 'Yes', handler: blockFriendHandler }
                ]} />
            <IonToast isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => { setToastMessage('') }} />
            <IonModal isOpen={addFriend}>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Add Friend</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonGrid>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Friend Name</IonLabel>
										<IonInput type='text' value={selectedFriend?.name} ref={nameRef}></IonInput>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonButton fill='clear' color='dark' onClick={cancelAddFriendHandler}> Cancel </IonButton>
								</IonCol>
								<IonCol>
									<IonButton color='secondary' expand='block' onClick={saveFriendHandler}> Save </IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonGrid>
				</IonContent>
			</IonModal>
            <IonModal isOpen={isEditing}>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Edit Friend</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonGrid>
							<IonRow>
								<IonCol>
									<IonItem>
										<IonLabel position='floating'>Friend Name</IonLabel>
										<IonInput type='text' value={selectedFriend?.name} ref={nameRef}></IonInput>
									</IonItem>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<IonButton fill='clear' color='dark' onClick={cancelEditFriendHandler}> Cancel </IonButton>
								</IonCol>
								<IonCol>
									<IonButton color='secondary' expand='block' onClick={saveFriendHandler}> Save </IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonGrid>
				</IonContent>
			</IonModal>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        {!isPlatform('android') && (
                            <IonButtons slot="end">
                                <IonButton onClick={startAddFriendHandler}>
                                    <IonIcon icon={addOutline} />
                                </IonButton>
                            </IonButtons>
                        )}
                        <IonTitle>Meet</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        {friendsContext.friends.map(friend => (
                            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                                <IonItemOptions side="start">
                                    <IonItemOption color="danger" onClick={startBlockFriendHandler}>
                                        <IonIcon slot="icon-only" icon={ban}></IonIcon>
                                    </IonItemOption>

                                    <IonItemOption color="warning" onClick={startDeleteFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>

                                <IonItem lines="full" button onClick={callFriendHandler}>
                                    <IonThumbnail slot="start">
                                        <img src={friend.avatar} />
                                    </IonThumbnail>
                                    <IonLabel> {friend.name} </IonLabel>
                                </IonItem>

                                <IonItemOptions side="end">
                                    <IonItemOption color="success" onClick={startEditFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={create}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        ))}
                    </IonList>
                    {isPlatform('android') && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                                <IonIcon icon={addOutline}></IonIcon>
                            </IonFabButton>
                        </IonFab>
                    )}
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default Meet;
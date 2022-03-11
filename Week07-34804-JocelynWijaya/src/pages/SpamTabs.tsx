import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { mailOutline, videocamOutline } from "ionicons/icons";

import Mail from "./Mail";
import Meet from "./Meet";
import Spam from "./Spam";

const SpamTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                <Route exact path="/tabs/mail" component={Mail}></Route>
                <Route exact path="/tabs/meet" component={Meet}></Route>
                <Route exact path="/tabs/spam" component={Spam}></Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="mail" href="/tabs/mail">
                    <IonIcon icon={mailOutline}></IonIcon>
                    <IonLabel>Mail</IonLabel>
                </IonTabButton>

                <IonTabButton tab="meet" href="/tabs/meet">
                    <IonIcon icon={videocamOutline}></IonIcon>
                    <IonLabel>Meet</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default SpamTabs;
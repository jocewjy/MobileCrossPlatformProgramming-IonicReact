import { IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect } from "react-router";
import { Route } from "react-router";
import { mailOutline, videocamOutline } from "ionicons/icons";

import Mail from "./Mail";
import Meet from "./Meet";

const MailTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path ="/tabs" to="/tabs/mail"></Redirect>
                <Route exact path="/tabs/mail" component={Mail}></Route>
                <Route exact path="/tabs/meet" component={Meet}></Route>            
            </IonRouterOutlet>
            
            <IonTabBar slot="bottom">
                <IonTabButton tab="mail" href="/tabs/mail">
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Mail</IonLabel>
                </IonTabButton>
                <IonTabButton tab="meet" href="/tabs/meet">
                    <IonIcon icon={videocamOutline} />
                    <IonLabel>Meet</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MailTabs;
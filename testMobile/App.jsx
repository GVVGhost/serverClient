import React, {SafeAreaView, ScrollView} from 'react-native';
import {GlobalStyles} from "styles/GlobalStyles";
import {CustomStatusBar} from "components/CustomStatusBar";
import {LargeText} from "components/texts/LargeText";

function App() {
    return (
        <SafeAreaView style={GlobalStyles.sectionContainer}>
            <CustomStatusBar/>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={GlobalStyles.list}>
                <LargeText text={"This is a large text"}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default App;

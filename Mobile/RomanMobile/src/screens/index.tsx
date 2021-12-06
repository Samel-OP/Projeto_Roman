import * as React from 'react';
// import { ScrollView } from 'react-native-gesture-handler';
// import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';
// import * as reactNative from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native'; 
import PickerModal from 'react-native-picker-modal-view';
import data from '../../temas.json'

export default class PickerModalListar extends React.Component<{}, { selectedItem: {} }> {
    state: { selectedItem: {}; };
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedItem: {}
        };
    }

    public render(): JSX.Element {
        const { selectedItem } = this.state;
        return (
            <View style={{
                width: 125,
                height: 100,
            }}>
                <PickerModal selectPlaceholderText={'Selecione...'}
                items={data}
                onSelected={this.onSelected.bind(this)}
                onClosed={this.onClosed.bind(this)}
                selected={selectedItem}
                onEndReached={() => console.log('Lista acabou...')}
                searchPlaceholderText={'Procurar...'}
                requireSelection={false} 
                showAlphabeticalIndex={false} 
                removeClippedSubviews={false} 
                disabled={false}>
                </PickerModal>
            </View>
        )
    }

    private onClosed(): void {
		console.log('Fechado');
	}

	private async onSelected(selected: any): void {
		await this.setState({ selectedItem: selected});
        console.warn(this.state.selectedItem.Id);
        AsyncStorage.setItem("select-Modal", JSON.stringify(this.state.selectedItem.Id));

		return selected;
	}
}

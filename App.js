import React, { useState, useEffect } from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	TextInput, 
	SafeAreaView,
} from 'react-native'

import api from './src/services/api'

export default function App() {

	const [zipcode, setZipcode] = useState('')
	const [state, setState] = useState('') //estate
	const [city, setCity] = useState('') //city
	const [validZipcode, setValidZipcode] = useState(false)
       
    const [street, setStreet] = useState(undefined)
    const [district, setDistrict] = useState('')


	useEffect(() => {
		(async() => {
			if(zipcode.length == 8){
				try{
					const response = await api.get(`/${zipcode}/json`)
					setValidZipcode(true) 
					setState(response.data.uf) //setando as informacoes que chegaram da api
					setCity(response.data.localidade)
					setStreet(response.data.logradouro)
					setDistrict(response.data.bairro)	
					// if(validZipcode === true){
					// 	Keyboard.dismiss()
					// }		
				}
				catch(error) {
					console.log('ERROR: ' + error)
				}	
			}
			else if(typeof (zipcode) == 'undefined'){
				console.warn('CEP erradasso')
			}
			else {
				console.log('CEP INVALIDO')
				setValidZipcode(false) 
				setStreet('')
				setDistrict('')
				setState('')
			}
			
		})()
	  })
	

	return (
		<SafeAreaView style={styles.container}>
			<View style={{alignItems: 'center'}}>
				<Text style={styles.text}>Digite o cep selecionado</Text>
				<TextInput 
					style={styles.input}
					placeholder="Ex 79003241"
					value={zipcode}
					onChangeText={ (texto) => setZipcode(texto) }
					keyboardType="numeric"
					
				/>
			</View>
		
			{ validZipcode && 
				<View style={styles.resultado}>
					<Text style={styles.itemText}>CEP: {zipcode}</Text>
					<Text style={styles.itemText}>Rua: {street}</Text>
					<Text style={styles.itemText}>Bairro: {district}</Text>
					<Text style={styles.itemText}>Cidade: {city}</Text>
					<Text style={styles.itemText}>Estado: {state}</Text>
				</View>
			}
			
		</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		marginTop: 25,
		marginBottom: 15,
		fontSize: 25,
		fontWeight: "bold",
	},
	input: {
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 5,
		width: '90%',
		padding: 10,
		fontSize: 18,
	},
	areaBtn: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: 15,
		justifyContent: "space-around",
	},
	botao: {
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		borderRadius: 5,	
	},
	botaoText: {
		fontSize: 22,
		color: '#fff',
	},
	resultado: {
		flex: 1,
		justifyContent: "center",
		alignItems: 'center'
	},
	itemText: {
		fontSize: 22,
	},	  
});

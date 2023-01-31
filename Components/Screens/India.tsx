import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
// import {StatusBar} from 

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function India({navigation}) {
    const [India, setIndia] = useState([])

    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        handledemp()
        

    }, [])


    const handledemp = async () => {
        // covidData.splice(0, covidData.length)
        console.log('esd')
        const data = await axios.get("https://www.mygov.in/sites/default/files/covid/covid_state_counts_ver1.json")
        const vacindata = await axios.get("https://www.mygov.in/sites/default/files/covid/vaccine/vaccine_counts_today.json")
        const todayVaccin=await axios.get('https://cdn-api.co-vin.in/api/v1/reports/getLiveVaccination')
        // cosnt 
        const tempvacin = vacindata.data.vacc_st_data;
        // console.log(vacindata.data.vacc_st_data);
        // const temp=[...covidData,data.data.covid_portal_url]
        const state = data.data["Name of State / UT"]
        const death = data.data["Death"]
        const total = data.data["Total Confirmed cases"]
        const active = data.data["Active"]
        const cured = data.data["Cured/Discharged/Migrated"]

        let a = 0
        let totalCases = 0
        let activeCases = 0
        let curedCases = 0
        let totaldeaths = 0
        let totalVacindata = 0
        for (const key in state) {
            let a = 0
            while (state[key] != tempvacin[a].covid_state_name) {
                a++
            }
            totalCases = totalCases + parseInt(total[key])
            activeCases = activeCases + parseInt(active[key])
            curedCases = curedCases + parseInt(cured[key])
            totalVacindata = totalVacindata + parseInt(tempvacin[a].total_doses)
            totaldeaths = totaldeaths + parseInt(death[key])
            // console.log(temp);
            // covidData.push(temp);
        }
        const temp = {
            // State: state[key],
            Total: totalCases,
            Death: totaldeaths,
            Active: activeCases,
            Cured: curedCases,
            CuRatio: (curedCases / totalCases* 100).toFixed(2),
            DeRatio: (totaldeaths / totalCases * 100).toFixed(2),
            Vaccin: tempvacin[a].total_doses,
            todayVaccin: todayVaccin.data.count,
            // todayVaccin.data.count
        }
        console.log("Data Feteched",temp);
        setIndia(temp);
    }


  return (
    <SafeAreaView style={{height:'100%'}}>

    <View style={styles.container}>
    <StatusBar style="dark" />
<View style={styles.header}>

      <Text style={{fontSize:25,fontWeight:'900',marginVertical:10,textAlign:'left'}}>India Covid-19 States</Text>
      <TouchableOpacity onPress={()=>{
        
          handledemp()
         
        }} >
      <Image style={styles.icon} source={require('./Icons/refresh.png')}/>

      </TouchableOpacity>
</View>
        <View style={[styles.TotalCases,{borderColor:'#806408',
 backgroundColor:'#f0cb51',}]}>

            <Text style={styles.DataText}>Total Confirmed Cases</Text>
            <Text style={styles.DataText}> {India["Total"]}</Text>
            <View style={[styles.line,{backgroundColor:'#9e7503',elevation:1}]}></View>
        </View>
        <View style={[styles.TotalCases,{borderColor:'#097c82',
 backgroundColor:'#11ecf7',}]}>

            <Text style={styles.DataText}>Active Cases</Text>
            <Text style={styles.DataText}> {India["Active"]}</Text>
            <View style={[styles.line,{backgroundColor:'#059299',elevation:1}]}></View>
        </View>

        <View style={[styles.TotalCases,{borderColor:'#098215',
backgroundColor:'#90f760',}]}>

            <Text style={styles.DataText}>Cured Cases</Text>
            <Text style={styles.DataText}> {India["Cured"]}</Text>
            <View style={[styles.line,{backgroundColor:'#287505',elevation:1}]}></View>
        </View>

        <View style={[styles.TotalCases,{borderColor:'#ed2a02',
backgroundColor:'#f05c3e',}]}>

            <Text style={styles.DataText}>Total Deaths</Text>
            <Text style={styles.DataText}> {India["Death"]}</Text>
            <View style={[styles.line,{backgroundColor:'#8c1a03',elevation:1}]}></View>
        </View>
        <View style={[styles.TotalCases,{borderColor:'#098215',
backgroundColor:'#6ff774',}]}>

            <Text style={styles.DataText}>Cure Ratio</Text>
            <Text style={styles.DataText}>{India["CuRatio"]} %</Text>
            <View style={[styles.line,{backgroundColor:'#05800a',elevation:1}]}></View>
        </View>
        <View style={[styles.TotalCases,{borderColor:'#bf1a08',
backgroundColor:'#e87b7b',}]}>

            <Text style={styles.DataText}>Death Radtio</Text>
            <Text style={styles.DataText}> {India["DeRatio"]} %</Text>
            <View style={[styles.line,{backgroundColor:'#c41f1f',elevation:1}]}></View>
        </View>
        <View style={[styles.TotalCases,{borderColor:'#820180',
backgroundColor:'#ed68eb',}]}>

            <Text style={styles.DataText}>Total Vacination</Text>
            <Text style={styles.DataText}> {India["Vaccin"]}</Text>
            <View style={[styles.line,{backgroundColor:'#6c1199',elevation:1}]}></View>
        </View>
        <View style={[styles.TotalCases,{borderColor:'#04b556',
backgroundColor:'#6cf5ac',}]}>

            <Text style={styles.DataText}>Today's Vaccination</Text>
            <Text style={styles.DataText}> {India["todayVaccin"]}</Text>
            <View style={[styles.line,{backgroundColor:'#119950',elevation:1}]}></View>
        </View>
    <View style={{width:'100%',alignItems:'flex-end', elevation:10,}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Home')
        }}>

        <Text style={{
            backgroundColor:'#f77a05',
            fontWeight: 'bold', fontSize: 19,
            paddingHorizontal:5,
            marginEnd:15,
            borderRadius:7,
            margin:10,
            paddingVertical:2,
            elevation:10,
        }}>StateWise Data▶</Text>

        </TouchableOpacity>
    </View>
        <View style={{position:'absolute',bottom:4}}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>

                    Made With ❤️ By Vikas Phulriya
                </Text>
            </View>
    </View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        // marginTop:StatusBar.currentHeight,
        // justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flex:1
    },
    DataText:{
        fontWeight:'900',
        fontSize:19.5,
    },
    TotalCases:{
        alignItems: 'center',
        borderRadius:15,
        width:"95%",
        borderWidth:1.5,
        marginVertical:5,
        elevation:5,
    },
    line:{
        // height:"8%",
        height:6,
        // backgroundColor:'#9e7503',
        width:'95%',
        marginTop:4,
        marginBottom:4,
        borderRadius:10,
        // opacity:0.5
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        // alignContent:'center',
        justifyContent: 'space-between',
        // borderWidth:1,
        paddingHorizontal:5,
        width:'95%'
    },
    icon:{
        height:30,
        width:30,
    }
})
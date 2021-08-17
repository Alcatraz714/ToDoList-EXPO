import AsyncStorage from '@react-native-async-storage/async-storage';
export async function Storetask(tasks){
    let arr =[]
    await AsyncStorage.getItem('TaskArray')
    .then(async(res)=>{
        arr=JSON.parse(res)
        // console.log(arr)
        arr.push(tasks)
        // console.log(arr)
        await AsyncStorage.setItem('TaskArray', JSON.stringify(arr))
    
    })
    .catch(e=>console.log(e))
}
export async function getTask(){
    await AsyncStorage.getAllKeys()
    .then(async (res) =>{
        if (res.length==0)
        {
            console.log("SettingDefaultValue")
            await AsyncStorage.setItem('TaskArray',JSON.stringify([]))

        }
        else {
            await AsyncStorage.getItem('TaskArray')
            .then(res=>{
                // console.log(res)
                let x=JSON.parse(res)
                console.log(res)
                console.log(x)
                return x;
              // value previously stored

            })
            .catch(e=> console.log(e))
            
        }
    } )
    .catch(e=>console.log(e))

}
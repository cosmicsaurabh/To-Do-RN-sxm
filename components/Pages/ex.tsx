import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const ex = () => {
    const [isloa]
    useEffect( async () =>{
        
        const data =  await getdata(page);
        setdata(data);
    },[page])
  return (
    <View>
      <Text>ex</Text>
    </View>
  )
}

export default ex
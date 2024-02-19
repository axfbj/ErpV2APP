import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import _ from 'lodash'
import JPush from 'jpush-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  setBtnStyle: {
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7',
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})

// class Button extends React.Component {
//   render() {
//     return (
//       <TouchableHighlight onPress={this.props.onPress} underlayColor="#e4083f" activeOpacity={0.5}>
//         <View style={styles.setBtnStyle}>
//           <Text style={styles.textStyle}>{this.props.title}</Text>
//         </View>
//       </TouchableHighlight>
//     )
//   }
// }

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
  }

  async componentDidMount() {
    const storeUserRecId = await AsyncStorage.getItem('userRecId')
    console.log('storeUserRecId', storeUserRecId)
    if (!storeUserRecId) {
      JPush.deleteAlias({ sequence: 20 })
    }

    JPush.init()

    JPush.setAlias({ sequence: 20, alias: storeUserRecId || '' })

    this.connectListener = (result) => {
      this.updateResults('connectListener', result)
      const extras = result.extras || {}
      const approvalFlag = _.has(extras, 'tableName') ? extras.tableName : ''
      const approvalRecId = _.has(extras, 'tableId') ? extras.tableId : ''
      this.updateResults('approvalFlag + approvalRecId', `${approvalFlag} : ${approvalRecId}`)
    }
    JPush.addConnectEventListener(this.connectListener)

    this.notificationListener = (result) => {
      this.updateResults('notificationListener', result)
    }
    JPush.addNotificationListener(this.notificationListener)

    this.localNotificationListener = (result) => {
      this.updateResults('localNotificationListener', result)
    }
    JPush.addLocalNotificationListener(this.localNotificationListener)

    this.tagAliasListener = (result) => {
      this.updateResults('tagAliasListener', result)
    }
    JPush.addTagAliasListener(this.tagAliasListener)

    this.mobileNumberListener = (result) => {
      this.updateResults('mobileNumberListener', result)
    }
    JPush.addMobileNumberListener(this.mobileNumberListener)
  }

  updateResults(event, result) {
    this.setState((prevState) => ({
      results: [...prevState.results, { event, result }],
    }))
  }

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.event}</Text>
      <Text>{JSON.stringify(item.result)}</Text>
    </View>
  )

  render() {
    return (
      <View style={{ ...styles.container, flex: 1 }}>
        <FlatList
          data={this.state.results}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* 
        <Button title="setLoggerEnable" onPress={() => JPush.setLoggerEnable(true)} />

        <Button
          title="getRegisterID"
          onPress={() => JPush.getRegistrationID((result) => this.updateResults('registerID', result))}
        /> */}

        {/* 其他按钮 */}
      </View>
    )
  }
}

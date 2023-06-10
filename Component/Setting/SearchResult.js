import {
    Text, View,
    Dimensions
} from "react-native"
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Setting/SearchScreen.styles';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';

const SearchResult = (route) => {
    const [index, setIndex] = React.useState(0);
    const [routes, setroutes] = useState([
        { key: 'post', title: 'Bài viết' },
        { key: 'user', title: 'Cá nhân' },
    ]);

    const PostTab = () => (
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );

    const UserTab = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const renderScene = SceneMap({
        post: PostTab,
        user: UserTab,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#000'} inactiveColor={'rgba(0, 0, 0, 0.5)'}
            labelStyle={{ fontSize: 17, fontWeight: '500' }}
            indicatorStyle={styles.indicatorTab}
            style={{ backgroundColor: 'white' }}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        </View>
    )
}

export default SearchResult;